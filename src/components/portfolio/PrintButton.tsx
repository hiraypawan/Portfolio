'use client';

import { Printer } from 'lucide-react';
export default function PrintButton() {
  return (
    <button className="button-secondary requires-js" type="button" onClick={() => window.print()}>
      <Printer size={16} aria-hidden="true" /> Print resume
    </button>
  );
}
