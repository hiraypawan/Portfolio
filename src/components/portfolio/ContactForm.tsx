'use client';

import { useId, useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { ownerProfile } from '@/data/ownerProfile';
import { briefBody, briefMailto, copyText, EMPTY_BRIEF, type ContactBrief } from '@/lib/contact';

export default function ContactForm() {
  const prefix = useId();
  const [form, setForm] = useState<ContactBrief>({ ...EMPTY_BRIEF });
  const [prepared, setPrepared] = useState(false);
  const [feedback, setFeedback] = useState('');
  const update = (field: keyof ContactBrief, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));
  const copy = async (text: string, label: string) => {
    const success = await copyText(text);
    setFeedback(
      success ? `${label} copied.` : 'Clipboard unavailable. Select and copy the text manually.',
    );
  };
  return (
    <div className="contact-form-shell">
      <div className="flex flex-wrap gap-3">
        <a className="button-primary" href={ownerProfile.conversion.bookingUrl}>
          <Mail size={16} aria-hidden="true" /> Request a call{' '}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <button
          className="button-secondary requires-js"
          type="button"
          onClick={() => void copy(ownerProfile.conversion.email, 'Email')}
        >
          <Copy size={15} aria-hidden="true" /> Copy email
        </button>
      </div>
      <p className="mt-4 break-all text-[15px] text-[var(--secondary)]">
        <a className="text-link" href={`mailto:${ownerProfile.conversion.email}`}>
          {ownerProfile.conversion.email}
        </a>
      </p>
      <p className="mt-2 text-sm text-[var(--muted)]">
        This prepares a draft in your email app. Nothing is submitted to a server.
      </p>
      <p role="status" className="mt-2 min-h-5 text-sm text-[var(--accent)]">
        {feedback}
      </p>
      <noscript>
        <p className="notice mt-4">
          The draft builder needs JavaScript. You can always email Pawan directly using the link
          above.
        </p>
        <style>{'.requires-js, .contact-builder { display: none !important; }'}</style>
      </noscript>
      <div className="contact-builder">
        {prepared ? (
          <div className="mt-5 space-y-4">
            <p className="flex items-start gap-2 text-[var(--accent)]">
              <Check size={19} aria-hidden="true" /> Your brief is ready — it has not been sent.
            </p>
            <p className="text-sm leading-relaxed text-[var(--secondary)]">
              If your email app did not open, copy the brief and send it manually. You can still
              edit everything.
            </p>
            <label htmlFor={`${prefix}-preview`} className="field-label">
              Your email draft
            </label>
            <textarea
              id={`${prefix}-preview`}
              readOnly
              value={briefBody(form)}
              rows={10}
              className="form-input font-mono text-sm"
            />
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="button-primary"
                onClick={() => void copy(briefBody(form), 'Brief')}
              >
                <Copy size={15} aria-hidden="true" /> Copy brief
              </button>
              <a
                className="button-secondary"
                href={briefMailto(ownerProfile.conversion.email, form)}
              >
                Open email app <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <button type="button" className="button-secondary" onClick={() => setPrepared(false)}>
                Edit brief
              </button>
            </div>
          </div>
        ) : (
          <form
            className="mt-5 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              setPrepared(true);
              setFeedback('');
              window.location.href = briefMailto(ownerProfile.conversion.email, form);
            }}
          >
            <fieldset>
              <legend className="field-label">What brings you here?</legend>
              <div className="inquiry-options">
                {(
                  [
                    { value: 'hiring', label: 'Hiring / a role' },
                    { value: 'project', label: 'A project' },
                  ] as const
                ).map((kind) => (
                  <label key={kind.value} className={form.kind === kind.value ? 'selected' : ''}>
                    <input
                      type="radio"
                      name={`${prefix}-kind`}
                      value={kind.value}
                      checked={form.kind === kind.value}
                      onChange={() => update('kind', kind.value)}
                    />
                    {kind.label}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${prefix}-name`} className="field-label">
                  Your name <span>(required)</span>
                </label>
                <input
                  id={`${prefix}-name`}
                  name="name"
                  required
                  autoComplete="name"
                  maxLength={100}
                  value={form.name}
                  onChange={(event) => update('name', event.target.value)}
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor={`${prefix}-email`} className="field-label">
                  Email <span>(required)</span>
                </label>
                <input
                  id={`${prefix}-email`}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  maxLength={254}
                  value={form.email}
                  onChange={(event) => update('email', event.target.value)}
                  className="form-input"
                />
              </div>
            </div>
            <div>
              <label htmlFor={`${prefix}-build`} className="field-label">
                {form.kind === 'hiring' ? 'Role / team' : 'What would you like to build?'}{' '}
                <span>(optional)</span>
              </label>
              <input
                id={`${prefix}-build`}
                name="build"
                maxLength={140}
                placeholder={
                  form.kind === 'hiring'
                    ? 'e.g. Junior developer at your team'
                    : 'e.g. An AI-powered web app'
                }
                value={form.build}
                onChange={(event) => update('build', event.target.value)}
                className="form-input"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {form.kind === 'project' && (
                <div>
                  <label htmlFor={`${prefix}-budget`} className="field-label">
                    Budget / range <span>(optional)</span>
                  </label>
                  <input
                    id={`${prefix}-budget`}
                    name="budget"
                    maxLength={100}
                    placeholder="Happy to discuss"
                    value={form.budget}
                    onChange={(event) => update('budget', event.target.value)}
                    className="form-input"
                  />
                </div>
              )}
              <div>
                <label htmlFor={`${prefix}-timeline`} className="field-label">
                  Timeline <span>(optional)</span>
                </label>
                <input
                  id={`${prefix}-timeline`}
                  name="timeline"
                  maxLength={100}
                  placeholder="e.g. Next month"
                  value={form.timeline}
                  onChange={(event) => update('timeline', event.target.value)}
                  className="form-input"
                />
              </div>
            </div>
            <div>
              <label htmlFor={`${prefix}-message`} className="field-label">
                Context & what success looks like <span>(required)</span>
              </label>
              <textarea
                id={`${prefix}-message`}
                name="message"
                required
                maxLength={1800}
                rows={5}
                value={form.message}
                onChange={(event) => update('message', event.target.value)}
                className="form-input"
              />
            </div>
            <button className="button-primary w-full justify-center" type="submit">
              Prepare email brief <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
