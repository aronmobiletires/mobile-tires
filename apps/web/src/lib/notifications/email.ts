import nodemailer from 'nodemailer';

type ServiceRequestEmailPayload = {
  name: string;
  phone: string;
  service: string;
  location: string;
  isOnFreeway: boolean;
  vehicle?: string;
  tireSize?: string;
  notes?: string;
};

function readRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function readOptionalEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

function buildMessageText(data: ServiceRequestEmailPayload): string {
  const lines = [
    'New technician request',
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Service: ${data.service}`,
    `Location: ${data.location}`,
    `On freeway: ${data.isOnFreeway ? 'Yes' : 'No'}`,
  ];

  if (data.vehicle) lines.push(`Vehicle: ${data.vehicle}`);
  if (data.tireSize) lines.push(`Tire size: ${data.tireSize}`);
  if (data.notes) lines.push(`Notes: ${data.notes}`);

  return lines.join('\n');
}

function buildMessageHtml(data: ServiceRequestEmailPayload): string {
  const sections = [
    `<p><strong>Name:</strong> ${data.name}</p>`,
    `<p><strong>Phone:</strong> ${data.phone}</p>`,
    `<p><strong>Service:</strong> ${data.service}</p>`,
    `<p><strong>Location:</strong> ${data.location}</p>`,
    `<p><strong>On freeway:</strong> ${data.isOnFreeway ? 'Yes' : 'No'}</p>`,
  ];

  if (data.vehicle) sections.push(`<p><strong>Vehicle:</strong> ${data.vehicle}</p>`);
  if (data.tireSize) sections.push(`<p><strong>Tire size:</strong> ${data.tireSize}</p>`);
  if (data.notes) sections.push(`<p><strong>Notes:</strong> ${data.notes}</p>`);

  return `<h2>New technician request</h2>${sections.join('')}`;
}

async function sendWithResend(data: ServiceRequestEmailPayload) {
  const apiKey = readRequiredEnv('RESEND_API_KEY');
  const from = readRequiredEnv('REQUEST_ALERT_EMAIL_FROM');
  const to = readRequiredEnv('REQUEST_ALERT_EMAIL_TO');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New mobile tire request: ${data.service}`,
      html: buildMessageHtml(data),
      text: buildMessageText(data),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend request failed: ${body || response.statusText}`);
  }
}

async function sendWithSmtp(data: ServiceRequestEmailPayload) {
  const host = readRequiredEnv('SMTP_HOST');
  const port = Number(readOptionalEnv('SMTP_PORT') || '587');
  const user = readRequiredEnv('SMTP_USER');
  const pass = readRequiredEnv('SMTP_PASS');
  const from = readRequiredEnv('REQUEST_ALERT_EMAIL_FROM');
  const to = readRequiredEnv('REQUEST_ALERT_EMAIL_TO');
  const secure = readOptionalEnv('SMTP_SECURE') === 'true';

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to,
    subject: `New mobile tire request: ${data.service}`,
    text: buildMessageText(data),
    html: buildMessageHtml(data),
  });
}

export async function sendServiceRequestEmail(data: ServiceRequestEmailPayload) {
  if (readOptionalEnv('RESEND_API_KEY')) {
    await sendWithResend(data);
    return;
  }

  await sendWithSmtp(data);
}
