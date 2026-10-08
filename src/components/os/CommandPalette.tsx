'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { searchItems, type SearchItem } from './app-registry';
import { useDialogFocus } from './hooks';

export default function CommandPalette({
  close,
  select,
}: {
  close: () => void;
  select: (item: SearchItem) => void;
}) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const results = useMemo(() => searchItems(query), [query]);
  useDialogFocus(ref, true, true);
  useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [selected, results]);
  return (
    <div
      className="os-dialog-backdrop fixed inset-0 z-[6000] flex items-start justify-center overflow-y-auto px-4 pb-8 pt-[max(7vh,24px)]"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        tabIndex={-1}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/25 bg-[#141620] shadow-2xl"
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.stopPropagation();
            event.preventDefault();
            close();
          }
        }}
      >
        <div className="flex items-center justify-between gap-4 px-5 pt-3">
          <h2 id={`${id}-title`} className="text-sm font-semibold">
            Search workspace
          </h2>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-xl hover:bg-white/10"
            aria-label="Close search"
            onClick={close}
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>
        <div className="flex items-center gap-3 border-b border-white/15 px-5">
          <Search size={19} aria-hidden="true" />
          <input
            data-autofocus
            role="combobox"
            aria-label="Search apps and projects"
            aria-expanded="true"
            aria-autocomplete="list"
            aria-controls={`${id}-results`}
            aria-activedescendant={results[selected] ? `${id}-option-${selected}` : undefined}
            autoComplete="off"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelected(0);
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                setSelected((current) => (results.length ? (current + 1) % results.length : 0));
              } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                setSelected((current) =>
                  results.length ? (current - 1 + results.length) % results.length : 0,
                );
              } else if (event.key === 'Enter' && results[selected]) {
                event.preventDefault();
                select(results[selected]);
              }
            }}
            placeholder="Work, OneBrain, Contact…"
            className="min-h-16 min-w-0 flex-1 bg-transparent text-base text-white placeholder:text-[#a4a9bc]"
          />
        </div>
        <ul
          ref={list}
          id={`${id}-results`}
          role="listbox"
          aria-label="Search results"
          className="max-h-[50dvh] overflow-y-auto p-2"
        >
          {results.map((item, index) => (
            <li
              key={item.key}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={selected === index}
              onClick={() => select(item)}
              onPointerMove={() => setSelected(index)}
              className={`flex min-h-14 cursor-pointer items-center justify-between gap-3 rounded-lg px-4 py-3 ${selected === index ? 'bg-white/10' : ''}`}
            >
              <span className="text-sm font-semibold">{item.label}</span>
              <span className="max-w-[50%] text-right text-xs text-[var(--muted)]">
                {item.hint}
              </span>
            </li>
          ))}
        </ul>
        {results.length === 0 && (
          <p role="status" className="px-5 py-5 text-sm text-[var(--secondary)]">
            No matches. Try “Work” or “Contact”.
          </p>
        )}
        <p className="border-t border-white/15 px-5 py-3 font-mono text-[11px] text-[var(--muted)]">
          ↑ ↓ navigate · Enter opens · Escape closes search
        </p>
      </div>
    </div>
  );
}
