'use client';

import Link from 'next/link';

import { Component, type ReactNode } from 'react';

export default class AppErrorBoundary extends Component<
  { children: ReactNode; name: string },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">This app could not load.</h2>
        <p className="text-[var(--secondary)]">
          The rest of the portfolio is still available. You can retry {this.props.name}, or read the
          conventional view.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="button-primary" onClick={() => this.setState({ failed: false })}>
            Retry app
          </button>
          <Link className="button-secondary" href="/work">
            Read the work
          </Link>
          <Link className="button-secondary" href="/contact">
            Contact Pawan
          </Link>
        </div>
      </div>
    );
  }
}
