'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { Icon } from '@/components/atoms/Icon';
import { FieldLabel } from '@/components/molecules/FieldLabel';
import { Input } from '@/components/molecules/Input';
import { LocationButton } from '@/components/molecules/LocationButton';
import { PhotoUpload } from '@/components/molecules/PhotoUpload';
import { Select } from '@/components/molecules/Select';
import { StatusPill } from '@/components/molecules/StatusPill';
import { Textarea } from '@/components/molecules/Textarea';
import { TireSizeDiagram } from '@/components/molecules/TireSizeDiagram';
import { TechnicianChatBox } from './TechnicianChatBox';

type ChatSession = {
  conversationSid: string;
  identity: string;
  token: string;
};

type InitResponse = {
  mode?: 'email' | 'sms';
  message?: string;
  conversationSid?: string;
  identity?: string;
  token?: string;
};

const ROADSIDE_ASSISTANCE_SERVICE = 'Roadside assistance (jump / fuel)';

/* RoadReady landing — intake form wired to a local service-request API that
  boots a Twilio conversation. After submit, the customer sees a live chat
  box while the technician receives SMS in the same thread. */
export function QuoteForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isOnFreeway, setIsOnFreeway] = useState<boolean | null>(null);
  const [vehicle, setVehicle] = useState('');
  const [tireSize, setTireSize] = useState('');
  const [notes, setNotes] = useState('');
  const [located, setLocated] = useState(false);
  const [service, setService] = useState('');
  const [showSizeHelp, setShowSizeHelp] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [deliveryMode, setDeliveryMode] = useState<'email' | 'sms'>('email');
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    service?: string;
    isOnFreeway?: string;
    vehicle?: string;
    tireSize?: string;
  }>({});
  const successRef = useRef<HTMLDivElement>(null);

  // Phase 4 deposit rule: ETA > 35 min OR after-hours → $70 deposit.
  const etaMin = 24;
  const afterHours = false;
  const depositApplies = etaMin > 35 || afterHours;
  const requiresTireDetails = Boolean(service) && service !== ROADSIDE_ASSISTANCE_SERVICE;

  function validate() {
    const next: typeof errors = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!phone.trim()) next.phone = 'Phone number is required';
    if (!service) next.service = 'Select a service type';
    if (isOnFreeway === null) next.isOnFreeway = 'Select whether you are on the freeway';
    if (!vehicle.trim()) next.vehicle = 'Vehicle type is required';
    if (requiresTireDetails && !tireSize.trim()) next.tireSize = 'Tire size is required for this service';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitError(null);
    setSubmitting(true);

    try {
      const response = await fetch('/api/service-requests/init', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          service,
          notes,
          location: address,
          isOnFreeway: isOnFreeway === true,
          vehicle,
          tireSize,
        }),
      });

      const payload = (await response.json()) as InitResponse;

      if (!response.ok) {
        throw new Error(payload.message || 'Unable to submit request.');
      }

      const mode = payload.mode === 'sms' ? 'sms' : 'email';
      setDeliveryMode(mode);

      if (mode === 'sms') {
        if (!payload.conversationSid || !payload.identity || !payload.token) {
          throw new Error('Unable to start technician chat.');
        }

        setChatSession({
          conversationSid: payload.conversationSid,
          identity: payload.identity,
          token: payload.token,
        });
      } else {
        setChatSession(null);
      }

      setSubmitted(true);

      // Focus the success announcement after React re-renders
      setTimeout(() => successRef.current?.focus(), 50);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to submit request.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <Card brackets padding={28} raised style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* aria-live so screen readers announce the state change */}
        <div
          ref={successRef}
          role="status"
          aria-live="polite"
          tabIndex={-1}
          style={{ outline: 'none', display: 'flex', flexDirection: 'column', gap: 18 }}
        >
          <StatusPill status="success" icon="check-circle">
            Request received
          </StatusPill>
          <div>
            <h3
              style={{
                margin: '0 0 6px',
                fontFamily: 'var(--font-display)',
                fontSize: 26,
                color: 'var(--off-white)',
              }}
            >
              A tech is being dispatched
            </h3>
            <p style={{ margin: 0, color: 'var(--steel-300)', fontSize: 15 }}>
              {deliveryMode === 'sms'
                ? 'We\'ve got your location. You\'ll get an SMS with your technician\'s name and a live ETA.'
                : 'We\'ve received your request and sent it to the Medinas Tires team by email. They\'ll reach out shortly.'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div
              style={{
                flex: 1,
                background: 'var(--bg-input)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
              }}
            >
              <div className="rr-eyebrow" style={{ color: 'var(--steel-300)' }}>
                Est. arrival
              </div>
              <div
                className="rr-numeric"
                style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--signal-orange)' }}
              >
                {etaMin} min
              </div>
            </div>
            <div
              style={{
                flex: 1,
                background: 'var(--bg-input)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
              }}
            >
              <div className="rr-eyebrow" style={{ color: 'var(--steel-300)' }}>
                Deposit
              </div>
              <div
                className="rr-numeric"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 30,
                  color: 'var(--caution-yellow)',
                }}
              >
                $70
              </div>
            </div>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: 'var(--steel-300)',
              display: 'flex',
              gap: 8,
              alignItems: 'flex-start',
            }}
          >
            <span style={{ color: 'var(--signal-green)', flex: 'none', marginTop: 1 }}>
              <Icon name="check" size={16} strokeWidth={2.5} />
            </span>
            The deposit only applies for longer ETAs or after-hours service. If it applies, it goes toward your total.
          </p>
        </div>
        {deliveryMode === 'sms' && chatSession ? (
          <TechnicianChatBox
            conversationSid={chatSession.conversationSid}
            identity={chatSession.identity}
            token={chatSession.token}
          />
        ) : (
          <p style={{ margin: 0, fontSize: 13, color: 'var(--steel-300)' }}>
            Live chat is off for now. A team member will contact you directly.
          </p>
        )}

        <Button
          variant="secondary"
          fullWidth
          onClick={() => {
            setSubmitted(false);
            setChatSession(null);
            setDeliveryMode('email');
          }}
        >
          Start another request
        </Button>
      </Card>
    );
  }

  return (
    <Card brackets padding={26} raised style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ marginBottom: 16 }}>
        <div className="rr-eyebrow">Get a technician</div>
        <h2
          style={{ margin: '4px 0 0', fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--off-white)' }}
        >
          Request service
        </h2>
      </div>

      <form onSubmit={(e) => void handleSubmit(e)} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="rr-form-2col">
          <div>
            <FieldLabel htmlFor="qf-name">Name</FieldLabel>
            <Input
              id="qf-name"
              placeholder="Your name"
              aria-required="true"
              aria-describedby={errors.name ? 'qf-name-err' : undefined}
              invalid={Boolean(errors.name)}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <span id="qf-name-err" role="alert" style={{ fontSize: 13, color: 'var(--signal-red)', marginTop: 4, display: 'block' }}>
                {errors.name}
              </span>
            )}
          </div>
          <div>
            <FieldLabel htmlFor="qf-phone">Phone</FieldLabel>
            <Input
              id="qf-phone"
              placeholder="(555) 000-0000"
              icon="phone"
              numeric
              inputMode="tel"
              aria-required="true"
              aria-describedby={errors.phone ? 'qf-phone-err' : undefined}
              invalid={Boolean(errors.phone)}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && (
              <span id="qf-phone-err" role="alert" style={{ fontSize: 13, color: 'var(--signal-red)', marginTop: 4, display: 'block' }}>
                {errors.phone}
              </span>
            )}
          </div>
        </div>

        <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
          <legend
            style={{
              display: 'block',
              marginBottom: 6,
              fontFamily: 'var(--font-condensed)',
              fontWeight: 700,
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--steel-300)',
            }}
          >
            Location
          </legend>
          <LocationButton
            located={located}
            address="I-10 E near Hacienda Blvd · La Puente, CA"
            onClick={() => setLocated(!located)}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '10px 0' }}>
            <span style={{ height: 1, flex: 1, background: 'var(--border-default)' }} />
            <span
              style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--steel-500)',
              }}
            >
              or type your location
            </span>
            <span style={{ height: 1, flex: 1, background: 'var(--border-default)' }} />
          </div>
          <Input
            id="qf-address"
            placeholder="Street, city or nearest exit"
            icon="map-pin"
            aria-label="Street address or nearest exit"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div
            role="group"
            aria-labelledby="qf-freeway-label"
            aria-describedby={errors.isOnFreeway ? 'qf-freeway-err' : undefined}
            style={{
              marginTop: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div
              id="qf-freeway-label"
              style={{
                color: 'var(--off-white)',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Are you on the freeway right now?
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button
                type="button"
                aria-pressed={isOnFreeway === true}
                onClick={() => setIsOnFreeway(true)}
                style={{
                  height: 48,
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${isOnFreeway === true ? 'var(--signal-orange)' : 'var(--border-default)'}`,
                  background: isOnFreeway === true ? 'rgba(255, 90, 31, 0.14)' : 'var(--bg-input)',
                  color: 'var(--off-white)',
                  fontFamily: 'var(--font-condensed)',
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Yes
              </button>
              <button
                type="button"
                aria-pressed={isOnFreeway === false}
                onClick={() => setIsOnFreeway(false)}
                style={{
                  height: 48,
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${isOnFreeway === false ? 'var(--signal-orange)' : 'var(--border-default)'}`,
                  background: isOnFreeway === false ? 'rgba(255, 90, 31, 0.14)' : 'var(--bg-input)',
                  color: 'var(--off-white)',
                  fontFamily: 'var(--font-condensed)',
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                No
              </button>
            </div>
            {errors.isOnFreeway && (
              <span id="qf-freeway-err" role="alert" style={{ fontSize: 13, color: 'var(--signal-red)' }}>
                {errors.isOnFreeway}
              </span>
            )}
          </div>
        </fieldset>

        <div className="rr-form-2col">
          <div>
            <FieldLabel htmlFor="qf-vehicle">
              Vehicle type
            </FieldLabel>
            <Input
              id="qf-vehicle"
              placeholder="Make / model"
              aria-required="true"
              aria-describedby={errors.vehicle ? 'qf-vehicle-err' : undefined}
              invalid={Boolean(errors.vehicle)}
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
            />
            {errors.vehicle && (
              <span id="qf-vehicle-err" role="alert" style={{ fontSize: 13, color: 'var(--signal-red)', marginTop: 4, display: 'block' }}>
                {errors.vehicle}
              </span>
            )}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
              <FieldLabel
                htmlFor="qf-tiresize"
                optional={!requiresTireDetails}
                hint={requiresTireDetails ? 'Required for tire service' : 'If you know it'}
              >
                Tire size
              </FieldLabel>
              <button
                type="button"
                aria-expanded={showSizeHelp}
                aria-controls="qf-tiresize-help"
                aria-label={showSizeHelp ? 'Hide where to find your tire size' : 'Where do I find my tire size?'}
                onClick={() => setShowSizeHelp((v) => !v)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 'none',
                  width: 22,
                  height: 22,
                  marginBottom: 8,
                  padding: 0,
                  background: 'none',
                  border: '1px solid var(--border-default)',
                  borderRadius: '50%',
                  color: 'var(--steel-300)',
                  cursor: 'pointer',
                }}
              >
                <Icon name="info" size={13} />
              </button>
            </div>
            <Input
              id="qf-tiresize"
              placeholder="225/65R17"
              numeric
              aria-required={requiresTireDetails || undefined}
              aria-describedby={errors.tireSize ? 'qf-tiresize-err' : undefined}
              invalid={Boolean(errors.tireSize)}
              value={tireSize}
              onChange={(e) => setTireSize(e.target.value)}
            />
            {errors.tireSize && (
              <span id="qf-tiresize-err" role="alert" style={{ fontSize: 13, color: 'var(--signal-red)', marginTop: 4, display: 'block' }}>
                {errors.tireSize}
              </span>
            )}
            {showSizeHelp && (
              <div id="qf-tiresize-help" style={{ marginTop: 10 }}>
                <Card padding={14} style={{ background: 'var(--bg-input)' }}>
                  <p style={{ margin: '0 0 10px', fontSize: 12, color: 'var(--steel-300)', lineHeight: 1.4 }}>
                    Find the size on your tire sidewall. It will look like this:
                  </p>
                  <TireSizeDiagram compact />
                </Card>
              </div>
            )}
          </div>
        </div>

        <div>
          <FieldLabel htmlFor="qf-service">Service type</FieldLabel>
          <Select
            id="qf-service"
            placeholder="Choose a service"
            aria-required="true"
            aria-describedby={errors.service ? 'qf-service-err' : undefined}
            invalid={Boolean(errors.service)}
            value={service}
            onChange={(e) => setService(e.target.value)}
            options={[
              'Flat repair',
              'Tire replacement / mount',
              'Brakes',
              'Alignments',
              'Roadside assistance (jump / fuel)',
              'Fleet / commercial',
            ]}
          />
          {errors.service && (
            <span id="qf-service-err" role="alert" style={{ fontSize: 13, color: 'var(--signal-red)', marginTop: 4, display: 'block' }}>
              {errors.service}
            </span>
          )}
        </div>

        <div>
          <FieldLabel htmlFor="qf-notes" optional hint="Anything that helps us find or help you faster">
            Notes
          </FieldLabel>
          <Textarea
            id="qf-notes"
            rows={2}
            placeholder="Gate code, nearest exit, parking details, or anything else we should know"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div>
          <PhotoUpload />
        </div>

        {submitError && (
          <p role="alert" style={{ margin: 0, fontSize: 13, color: 'var(--signal-red)' }}>
            {submitError}
          </p>
        )}

        <Button type="submit" variant="primary" size="lg" fullWidth iconRight="arrow-right" disabled={submitting}>
          Request a technician
        </Button>

        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: 'var(--steel-300)',
            lineHeight: 1.45,
            display: 'flex',
            gap: 8,
            alignItems: 'flex-start',
          }}
        >
          <span style={{ color: 'var(--caution-yellow)', flex: 'none', marginTop: 1 }}>
            <Icon name="alert-triangle" size={16} />
          </span>
          Most requests get a response in under 35 minutes. A{' '}
          <span className="rr-numeric" style={{ color: 'var(--caution-yellow)' }}>
            &nbsp;$70&nbsp;
          </span>{' '}
          deposit may apply for longer ETAs or after-hours service. If it applies, it goes toward your total.
        </p>
      </form>
    </Card>
  );
}
