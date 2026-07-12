import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import {
  createConversationToken,
  createCustomerIdentity,
  getTwilioClient,
  getTwilioServerConfig,
  normalizePhoneNumber,
} from '@/lib/twilio/server';
import { sendServiceRequestEmail } from '@/lib/notifications/email';

export const runtime = 'nodejs';

type RequestBody = {
  name?: string;
  phone?: string;
  service?: string;
  notes?: string;
  location?: string;
  isOnFreeway?: boolean;
  vehicle?: string;
  tireSize?: string;
};

function badRequest(message: string) {
  return NextResponse.json({ message }, { status: 400 });
}

function buildDispatchMessage(data: {
  name: string;
  phone: string;
  service: string;
  location: string;
  isOnFreeway: boolean;
  vehicle?: string;
  tireSize?: string;
  notes?: string;
}) {
  const lines = [
    'New RoadReady request',
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Service: ${data.service}`,
    `Location: ${data.location}`,
    `On freeway: ${data.isOnFreeway ? 'Yes' : 'No'}`,
  ];

  if (data.vehicle) lines.push(`Vehicle: ${data.vehicle}`);
  if (data.tireSize) lines.push(`Tire size: ${data.tireSize}`);
  if (data.notes) lines.push(`Notes: ${data.notes}`);

  lines.push('Reply by SMS to continue with customer in live chat.');

  return lines.join('\n');
}

function getCommunicationMode(): 'email' | 'sms' {
  const mode = process.env.COMMUNICATION_MODE?.trim().toLowerCase();
  return mode === 'sms' ? 'sms' : 'email';
}

export async function POST(request: Request) {
  let body: RequestBody;

  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return badRequest('Invalid JSON payload.');
  }

  const name = body.name?.trim();
  const rawPhone = body.phone?.trim();
  const service = body.service?.trim();
  const notes = body.notes?.trim();
  const location = body.location?.trim() || 'Location pending';
  const isOnFreeway = body.isOnFreeway === true;
  const vehicle = body.vehicle?.trim();
  const tireSize = body.tireSize?.trim();

  if (!name) return badRequest('Name is required.');
  if (!rawPhone) return badRequest('Phone number is required.');
  if (!service) return badRequest('Service type is required.');

  const normalizedPhone = normalizePhoneNumber(rawPhone);
  if (!normalizedPhone) {
    return badRequest('Please enter a valid phone number.');
  }

  const mode = getCommunicationMode();

  try {
    if (mode === 'email') {
      await sendServiceRequestEmail({
        name,
        phone: normalizedPhone,
        service,
        location,
        isOnFreeway,
        vehicle,
        tireSize,
        notes,
      });

      return NextResponse.json({
        mode: 'email',
        requestId: randomUUID(),
      });
    }

    const config = getTwilioServerConfig();
    const client = getTwilioClient();
    const identity = createCustomerIdentity(normalizedPhone);

    const conversation = await client.conversations.v1
      .services(config.conversationsServiceSid)
      .conversations.create({
        friendlyName: `RoadReady ${name} ${new Date().toISOString()}`,
        attributes: JSON.stringify({
          requestId: randomUUID(),
          customerName: name,
          customerPhone: normalizedPhone,
          service,
          location,
          isOnFreeway,
          vehicle: vehicle ?? null,
          tireSize: tireSize ?? null,
        }),
      });

    await client.conversations.v1
      .services(config.conversationsServiceSid)
      .conversations(conversation.sid)
      .participants.create({
        identity,
        attributes: JSON.stringify({
          role: 'customer',
          name,
          phone: normalizedPhone,
        }),
      });

    await client.conversations.v1
      .services(config.conversationsServiceSid)
      .conversations(conversation.sid)
      .participants.create({
        'messagingBinding.address': config.technicianNumber,
        'messagingBinding.proxyAddress': config.smsFromNumber,
        attributes: JSON.stringify({
          role: 'technician',
        }),
      });

    const dispatchMessage = buildDispatchMessage({
      name,
      phone: normalizedPhone,
      service,
      location,
      isOnFreeway,
      vehicle,
      tireSize,
      notes,
    });

    await client.conversations.v1
      .services(config.conversationsServiceSid)
      .conversations(conversation.sid)
      .messages.create({
        author: 'dispatch',
        body: dispatchMessage,
      });

    const token = createConversationToken(identity);

    return NextResponse.json({
      mode: 'sms',
      conversationSid: conversation.sid,
      identity,
      token,
      expiresInSeconds: 3600,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to start conversation.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
