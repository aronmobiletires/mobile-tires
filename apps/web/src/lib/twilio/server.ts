import twilio from 'twilio';

export type TwilioServerConfig = {
  accountSid: string;
  authToken: string;
  conversationsServiceSid: string;
  apiKeySid: string;
  apiKeySecret: string;
  smsFromNumber: string;
  technicianNumber: string;
};

function readRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getTwilioServerConfig(): TwilioServerConfig {
  return {
    accountSid: readRequiredEnv('TWILIO_ACCOUNT_SID'),
    authToken: readRequiredEnv('TWILIO_AUTH_TOKEN'),
    conversationsServiceSid: readRequiredEnv('TWILIO_CONVERSATIONS_SERVICE_SID'),
    apiKeySid: readRequiredEnv('TWILIO_API_KEY_SID'),
    apiKeySecret: readRequiredEnv('TWILIO_API_KEY_SECRET'),
    smsFromNumber: readRequiredEnv('TWILIO_SMS_FROM_NUMBER'),
    technicianNumber: readRequiredEnv('TWILIO_TECHNICIAN_TO_NUMBER'),
  };
}

export function getTwilioClient() {
  const { accountSid, authToken } = getTwilioServerConfig();
  return twilio(accountSid, authToken);
}

export function normalizePhoneNumber(rawValue: string): string | null {
  const trimmed = rawValue.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith('+')) {
    const digitsOnly = trimmed.replace(/[^\d+]/g, '');
    if (/^\+\d{10,15}$/.test(digitsOnly)) {
      return digitsOnly;
    }
    return null;
  }

  const digits = trimmed.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }

  return null;
}

export function createCustomerIdentity(phoneE164: string): string {
  const suffix = Math.random().toString(36).slice(2, 8);
  const compactPhone = phoneE164.replace(/[^\d]/g, '');
  return `customer_${compactPhone}_${suffix}`;
}

export function createConversationToken(identity: string, ttlSeconds = 60 * 60): string {
  const config = getTwilioServerConfig();
  const AccessToken = twilio.jwt.AccessToken;
  const ChatGrant = AccessToken.ChatGrant;

  const token = new AccessToken(config.accountSid, config.apiKeySid, config.apiKeySecret, {
    identity,
    ttl: ttlSeconds,
  });

  token.addGrant(
    new ChatGrant({
      serviceSid: config.conversationsServiceSid,
    }),
  );

  return token.toJwt();
}
