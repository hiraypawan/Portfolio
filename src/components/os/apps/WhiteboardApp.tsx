'use client';

import { useEffect, useId, useState } from 'react';
import { loadNotes, NOTE_COLORS, saveNotes, type Sticky } from '@/lib/whiteboard';

export default function WhiteboardApp() {
  const id = useId();
  const [notes, setNotes] = useState<Sticky[]>([]);
  const [ready, setReady] = useState(false);
  const [stored, setStored] = useState(true);
  const [draft, setDraft] = useState('');
  const [color, setColor] = useState(NOTE_COLORS[0].value);
  const [editing, setEditing] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  useEffect(() => {
    setNotes(loadNotes());
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) setStored(saveNotes(notes));
  }, [notes, ready]);
  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--secondary)]">
        Local notes on this device. Pawan cannot see them. Use Contact to send a message.
      </p>
      {!stored && (
        <p role="status" className="notice">
          Browser storage is unavailable. Notes will last only for this session.
        </p>
      )}
      <form
        className="space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (!draft.trim()) return;
          if (editing)
            setNotes((current) =>
              current.map((note) =>
                note.id === editing ? { ...note, text: draft.trim(), color } : note,
              ),
            );
          else
            setNotes((current) => [
              ...current.slice(-11),
              { id: crypto.randomUUID(), text: draft.trim(), color },
            ]);
          setEditing(null);
          setDraft('');
        }}
      >
        <label htmlFor={`${id}-draft`} className="field-label">
          {editing ? 'Edit sticky note' : 'New sticky note'}
        </label>
        <textarea
          id={`${id}-draft`}
          className="form-input"
          required
          maxLength={280}
          rows={2}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Something worth remembering…"
        />
        <div className="flex flex-wrap gap-2" role="group" aria-label="Note color">
          {NOTE_COLORS.map((item) => (
            <button
              type="button"
              key={item.value}
              aria-label={`${item.name} note color`}
              aria-pressed={color === item.value}
              onClick={() => setColor(item.value)}
              className={`flex h-11 w-11 items-center justify-center rounded-full ${color === item.value ? 'ring-2 ring-white' : ''}`}
            >
              <span
                className="h-8 w-8 rounded-full"
                style={{ background: item.value }}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="button-primary" disabled={!ready} type="submit">
            {editing ? 'Save note' : 'Add sticky'}
          </button>
          {editing && (
            <button
              type="button"
              className="button-secondary"
              onClick={() => {
                setEditing(null);
                setDraft('');
              }}
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>
      <div className="grid gap-3 sm:grid-cols-2">
        {notes.map((note) => (
          <article
            key={note.id}
            className="rounded-xl p-4 text-[#1a1a1a]"
            style={{ background: note.color }}
          >
            <p className="whitespace-pre-wrap break-words">{note.text}</p>
            <div className="mt-3 flex gap-2">
              <button
                className="min-h-11 rounded-lg px-3 text-sm underline hover:bg-black/5"
                onClick={() => {
                  setEditing(note.id);
                  setDraft(note.text);
                  setColor(note.color);
                }}
              >
                Edit<span className="sr-only"> note: {note.text.slice(0, 30)}</span>
              </button>
              <button
                className="min-h-11 rounded-lg px-3 text-sm underline hover:bg-black/5"
                onClick={() => {
                  setNotes((current) => current.filter((item) => item.id !== note.id));
                  if (editing === note.id) {
                    setEditing(null);
                    setDraft('');
                  }
                }}
              >
                Delete<span className="sr-only"> note: {note.text.slice(0, 30)}</span>
              </button>
            </div>
          </article>
        ))}
      </div>
      {ready && notes.length === 0 && (
        <p className="text-sm text-[var(--muted)]">No notes yet. Add one above.</p>
      )}
      {notes.length > 0 &&
        (confirmClear ? (
          <div className="notice">
            <p>Delete all local notes? This cannot be undone.</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <button
                className="button-primary"
                onClick={() => {
                  setNotes([]);
                  setEditing(null);
                  setDraft('');
                  setConfirmClear(false);
                }}
              >
                Delete all notes
              </button>
              <button className="button-secondary" onClick={() => setConfirmClear(false)}>
                Keep notes
              </button>
            </div>
          </div>
        ) : (
          <button className="button-secondary" onClick={() => setConfirmClear(true)}>
            Clear board…
          </button>
        ))}
    </div>
  );
}
