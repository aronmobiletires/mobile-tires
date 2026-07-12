'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Client as TwilioConversationClient, type Conversation, type Message } from '@twilio/conversations';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { Input } from '@/components/molecules/Input';

type TechnicianChatBoxProps = {
  conversationSid: string;
  identity: string;
  token: string;
};

type ChatMessage = {
  sid: string;
  author: string;
  body: string;
  timestamp: string;
  isMine: boolean;
};

function formatTime(value: Date | null): string {
  if (!value) return '';
  return value.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function mapMessage(msg: Message, identity: string): ChatMessage {
  return {
    sid: msg.sid,
    author: msg.author || 'technician',
    body: msg.body || '',
    timestamp: formatTime(msg.dateCreated),
    isMine: msg.author === identity,
  };
}

export function TechnicianChatBox({ conversationSid, identity, token }: TechnicianChatBoxProps) {
  const [client, setClient] = useState<TwilioConversationClient | null>(null);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      try {
        const twilioClient = await TwilioConversationClient.create(token);

        if (!mounted) return;

        setClient(twilioClient);

        const convo = await twilioClient.getConversationBySid(conversationSid);
        const initial = await convo.getMessages(50);

        if (!mounted) return;

        setConversation(convo);
        setMessages(initial.items.map((item) => mapMessage(item, identity)));

        const onMessageAdded = (msg: Message) => {
          setMessages((current) => {
            if (current.some((entry) => entry.sid === msg.sid)) {
              return current;
            }
            return [...current, mapMessage(msg, identity)];
          });
        };

        const refreshToken = async () => {
          try {
            const response = await fetch('/api/service-requests/token', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ identity }),
            });

            if (!response.ok) {
              throw new Error('Unable to refresh chat token.');
            }

            const data = (await response.json()) as { token?: string };
            if (!data.token) {
              throw new Error('Token refresh returned no token.');
            }

            await twilioClient.updateToken(data.token);
          } catch {
            setError('Connection expired. Refresh the page to resume chat.');
          }
        };

        convo.on('messageAdded', onMessageAdded);
        twilioClient.on('tokenAboutToExpire', refreshToken);
        twilioClient.on('tokenExpired', refreshToken);

        return () => {
          convo.off('messageAdded', onMessageAdded);
          twilioClient.off('tokenAboutToExpire', refreshToken);
          twilioClient.off('tokenExpired', refreshToken);
        };
      } catch {
        if (mounted) {
          setError('Could not start live chat. Please try again in a moment.');
        }
      }

      return undefined;
    }

    const cleanupPromise = bootstrap();

    return () => {
      mounted = false;
      Promise.resolve(cleanupPromise).then((cleanup) => cleanup?.());
      void client?.shutdown();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationSid, identity, token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const canSend = useMemo(() => draft.trim().length > 0 && Boolean(conversation) && !isSending, [draft, conversation, isSending]);

  async function handleSend() {
    if (!conversation || !draft.trim()) {
      return;
    }

    setError(null);
    setIsSending(true);

    try {
      await conversation.sendMessage(draft.trim());
      setDraft('');
    } catch {
      setError('Message could not be sent. Please retry.');
    } finally {
      setIsSending(false);
    }
  }

  return (
    <Card brackets padding={18} raised style={{ background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <div className="rr-eyebrow">Live chat</div>
        <h4 style={{ margin: '4px 0 0', fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--off-white)' }}>
          Chat with your technician
        </h4>
      </div>

      <div
        style={{
          minHeight: 220,
          maxHeight: 320,
          overflowY: 'auto',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-input)',
          padding: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {messages.map((message) => (
          <div
            key={message.sid}
            style={{
              alignSelf: message.isMine ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              borderRadius: '12px',
              padding: '10px 12px',
              background: message.isMine ? 'var(--signal-orange)' : 'var(--bg-raised)',
              color: message.isMine ? 'var(--text-on-accent)' : 'var(--off-white)',
              border: message.isMine ? 'none' : '1px solid var(--border-default)',
            }}
          >
            <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 3 }}>{message.author}</div>
            <div style={{ whiteSpace: 'pre-wrap' }}>{message.body}</div>
            <div style={{ marginTop: 6, fontSize: 11, opacity: 0.75 }}>{message.timestamp}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <p style={{ margin: 0, fontSize: 13, color: 'var(--signal-red)' }} role="alert">
          {error}
        </p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 10, alignItems: 'center' }}>
        <Input
          placeholder="Type your message"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              void handleSend();
            }
          }}
          aria-label="Message the technician"
        />
        <Button type="button" onClick={() => void handleSend()} disabled={!canSend}>
          Send
        </Button>
      </div>
    </Card>
  );
}
