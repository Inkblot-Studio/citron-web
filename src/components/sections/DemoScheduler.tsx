'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Leave a number, or book a time.
 *
 * Asking someone to pick a slot before they have spoken to anyone is a lot of
 * commitment for a first step, and most people bounce off a calendar. So the
 * default is the smallest thing that still lets us call back — a name and a
 * phone number — and the calendar is there for the people who would rather
 * choose the moment themselves.
 */

type Mode = 'callback' | 'booking';

const DAY_COUNT = 4;
const TIMES = ['9:00', '10:30', '13:00', '14:30', '16:00'];

function nextWeekdays(count: number): { label: string; date: string }[] {
  const days: { label: string; date: string }[] = [];
  const cursor = new Date();
  while (days.length < count) {
    cursor.setDate(cursor.getDate() + 1);
    const weekday = cursor.getDay();
    if (weekday === 0 || weekday === 6) continue;
    days.push({
      label: cursor.toLocaleDateString('en-GB', { weekday: 'short' }),
      date: String(cursor.getDate()),
    });
  }
  return days;
}

export function DemoScheduler() {
  const [mode, setMode] = useState<Mode>('callback');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [days, setDays] = useState<{ label: string; date: string }[] | null>(null);
  const [day, setDay] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const firstField = useRef<HTMLInputElement>(null);

  // Dates are worked out on the client so the markup can stay static.
  useEffect(() => setDays(nextWeekdays(DAY_COUNT)), []);

  const ready =
    firstName.trim() !== '' &&
    lastName.trim() !== '' &&
    phone.trim().length >= 6 &&
    (mode === 'callback' || time !== null);

  if (sent) {
    return (
      <div className="cw-inq cw-inq--done" role="status">
        <h3 className="cw-inq__title">Thank you — we have it.</h3>
        <p className="cw-inq__lede">
          {mode === 'callback'
            ? `We will call ${firstName} on ${phone}, usually the same working day.`
            : `We will call ${firstName} on ${phone} at ${time}. If anything changes, that number reaches us too.`}
        </p>
      </div>
    );
  }

  return (
    <form
      className="cw-inq"
      onSubmit={(event) => {
        event.preventDefault();
        if (ready) setSent(true);
      }}
    >
      <div className="cw-inq__modes" role="group" aria-label="How to reach you">
        <button
          type="button"
          className="cw-inq__mode"
          aria-pressed={mode === 'callback'}
          onClick={() => {
            setMode('callback');
            firstField.current?.focus();
          }}
        >
          Ask us to call
        </button>
        <button
          type="button"
          className="cw-inq__mode"
          aria-pressed={mode === 'booking'}
          onClick={() => setMode('booking')}
        >
          Pick a time
        </button>
      </div>

      <p className="cw-inq__lede">
        {mode === 'callback'
          ? 'Leave a name and a number. We call back, usually the same working day — no calendar, no form to fill in twice.'
          : 'Choose when suits, and we will call then.'}
      </p>

      <div className="cw-inq__row">
        <label className="cw-field">
          <span className="cw-field__label">First name</span>
          <input
            ref={firstField}
            className="cw-field__input"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            autoComplete="given-name"
            required
          />
        </label>
        <label className="cw-field">
          <span className="cw-field__label">Last name</span>
          <input
            className="cw-field__input"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            autoComplete="family-name"
            required
          />
        </label>
      </div>

      <label className="cw-field">
        <span className="cw-field__label">Phone</span>
        <input
          className="cw-field__input"
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          autoComplete="tel"
          placeholder="+359"
          required
        />
      </label>

      {mode === 'booking' ? (
        <>
          <fieldset className="cw-inq__pick">
            <legend className="cw-field__label">Day</legend>
            <div className="cw-inq__options">
              {(days ?? []).map((entry, index) => (
                <button
                  key={entry.date}
                  type="button"
                  className="cw-inq__option"
                  aria-pressed={index === day}
                  onClick={() => setDay(index)}
                >
                  <span className="cw-inq__weekday">{entry.label}</span>
                  <span className="cw-inq__date">{entry.date}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="cw-inq__pick">
            <legend className="cw-field__label">Time</legend>
            <div className="cw-inq__options">
              {TIMES.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className="cw-inq__option"
                  aria-pressed={slot === time}
                  onClick={() => setTime(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </fieldset>
        </>
      ) : null}

      <button type="submit" className="cw-btn cw-btn--primary cw-inq__submit" disabled={!ready}>
        {mode === 'callback' ? 'Send my number' : 'Book the call'}
      </button>

      <p className="cw-inq__note">
        We use the number to call you about this and nothing else.
      </p>
    </form>
  );
}
