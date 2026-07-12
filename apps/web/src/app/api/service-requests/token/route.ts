import { NextResponse } from 'next/server';
import { createConversationToken } from '@/lib/twilio/server';

export const runtime = 'nodejs';

type RequestBody = {
  identity?: string;
};

function badRequest(message: string) {
  return NextResponse.json({ message }, { status: 400 });
}

export async function POST(request: Request) {
  let body: RequestBody;

  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return badRequest('Invalid JSON payload.');
  }

  const identity = body.identity?.trim();

  if (!identity) {
    return badRequest('Identity is required.');
  }

  if (!identity.startsWith('customer_')) {
    return badRequest('Invalid identity format.');
  }

  try {
    const token = createConversationToken(identity);
    return NextResponse.json({ token, expiresInSeconds: 3600 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to issue token.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
