import { describe, expect, it } from 'vitest';
import { briefBody, briefMailto, EMPTY_BRIEF } from '@/lib/contact';
import { desktopReducer, INITIAL_DESKTOP, clampPosition, windowWidth } from '@/lib/os-state';
import { normalizeSettings, resolvedWallpaper } from '@/lib/feedback';
import { normalizeNotes } from '@/lib/whiteboard';
import { featuredProjects, hasPublicUrl, ownerProfile, publicMetrics } from '@/data/ownerProfile';
import { searchItems } from '@/components/os/app-registry';
import { serializeJsonLd } from '@/lib/seo';

describe('contact drafts', () => {
  it('encodes every reserved character and preserves Unicode and line breaks', () => {
    const form = {
      ...EMPTY_BRIEF,
      kind: 'project' as const,
      name: 'A & B #1',
      email: 'person+tag@example.com',
      build: 'AI & automation?',
      budget: '₹20k–₹30k / 50%',
      timeline: 'A+B',
      message: 'Hello & welcome\nSecond # line',
    };
    const url = new URL(briefMailto('owner@example.com', form));
    expect([...url.searchParams.keys()]).toEqual(['subject', 'body']);
    expect(url.searchParams.get('body')).toBe(briefBody(form));
    expect(url.searchParams.get('body')).toContain('₹20k–₹30k / 50%');
    expect(url.searchParams.get('subject')).toContain('AI & automation?');
  });
  it('does not request a budget for hiring inquiries', () => {
    expect(briefBody({ ...EMPTY_BRIEF, budget: 'Private budget' })).not.toContain('Budget:');
  });
  it('labels unspecified optional information without implying a sent message', () => {
    expect(briefBody(EMPTY_BRIEF)).toContain('Timeline: To discuss');
  });
});

describe('desktop state', () => {
  it('selects the highest visible window after minimizing the active window', () => {
    let state = desktopReducer(INITIAL_DESKTOP, { type: 'open', id: 'projects', title: 'Work' });
    state = desktopReducer(state, { type: 'open', id: 'contact', title: 'Contact' });
    state = desktopReducer(state, { type: 'minimize', id: 'contact' });
    expect(state.activeId).toBe('projects');
    expect(state.windows).toHaveLength(2);
    expect(state.windows.find((win) => win.id === 'contact')?.minimized).toBe(true);
  });
  it('restores an existing window rather than duplicating it', () => {
    let state = desktopReducer(INITIAL_DESKTOP, { type: 'open', id: 'contact', title: 'Contact' });
    state = desktopReducer(state, { type: 'minimize', id: 'contact' });
    state = desktopReducer(state, { type: 'open', id: 'contact', title: 'Contact' });
    expect(state.windows).toHaveLength(1);
    expect(state.activeId).toBe('contact');
    expect(state.windows[0].minimized).toBe(false);
  });
  it('allocates unique stacking order for sequential opens and supports close/restore', () => {
    let state = INITIAL_DESKTOP;
    for (const id of ['projects', 'contact', 'case:onebrain'])
      state = desktopReducer(state, { type: 'open', id, title: id });
    expect(new Set(state.windows.map((win) => win.z)).size).toBe(3);
    state = desktopReducer(state, { type: 'close', id: 'case:onebrain' });
    expect(state.activeId).toBe('contact');
    state = desktopReducer(state, { type: 'toggle-max', id: 'contact' });
    expect(state.windows.find((win) => win.id === 'contact')?.maximized).toBe(true);
  });
  it('does not stack a focused window repeatedly when focus bubbles', () => {
    const state = desktopReducer(INITIAL_DESKTOP, { type: 'open', id: 'projects', title: 'Work' });
    expect(desktopReducer(state, { type: 'focus', id: 'projects' })).toBe(state);
  });
  it('keeps a floating window inside a tablet / short-screen viewport', () => {
    const viewport = { width: 800, height: 500 };
    const position = clampPosition({ x: 9999, y: 9999 }, viewport);
    expect(position.x + windowWidth(viewport)).toBeLessThanOrEqual(viewport.width - 12);
    expect(position.y).toBeLessThanOrEqual(260);
  });
});

describe('validated browser storage', () => {
  it('handles null, arrays, unknown accents and invalid theme values', () => {
    expect(normalizeSettings(null).wallpaper).toBe('auto');
    expect(
      normalizeSettings({ accentId: 'bad', wallpaper: 'broken', sounds: 'yes' }).accentId,
    ).toBe('violet');
    expect(normalizeSettings({ sounds: 'yes' }).sounds).toBe(false);
  });
  it('keeps valid manual preferences and resolves the automatic time windows', () => {
    expect(normalizeSettings({ wallpaper: 'day', motion: 'calm' }).wallpaper).toBe('day');
    expect(resolvedWallpaper('auto', 12)).toBe('day');
    expect(resolvedWallpaper('auto', 18)).toBe('night');
    expect(resolvedWallpaper('auto', 23)).toBe('dark');
    expect(resolvedWallpaper('day', 23)).toBe('day');
  });
  it('rejects malformed notes, migrates numeric IDs and bounds text / colors / duplicates', () => {
    expect(normalizeNotes({ text: 'not an array' })).toEqual([]);
    const notes = normalizeNotes([
      { id: 1, text: 'x'.repeat(500), color: 'url(unsafe)' },
      { id: 1, text: 'duplicate' },
      null,
      { id: 'bad', text: 3 },
    ]);
    expect(notes).toHaveLength(1);
    expect(notes[0].id).toBe('1');
    expect(notes[0].text).toHaveLength(280);
    expect(notes[0].color).toBe('#fef08a');
  });
  it('caps the board at twelve notes', () => {
    expect(
      normalizeNotes(Array.from({ length: 20 }, (_, id) => ({ id, text: String(id) }))),
    ).toHaveLength(12);
  });
});

describe('public content invariants', () => {
  it('never publishes private or illustrative metrics', () => {
    const metric = { ...ownerProfile.metrics[0] };
    expect(
      publicMetrics([
        { ...metric, public: false },
        { ...metric, status: 'private' },
        { ...metric, status: 'illustrative' },
      ]),
    ).toEqual([]);
  });
  it('uses unique project IDs, valid featured evidence, and three aligned resume projects', () => {
    expect(new Set(ownerProfile.projects.map((project) => project.id)).size).toBe(
      ownerProfile.projects.length,
    );
    expect(featuredProjects).toHaveLength(3);
    expect(ownerProfile.resume.projectIds).toEqual(featuredProjects.map((project) => project.id));
    for (const project of featuredProjects) expect(hasPublicUrl(project.url)).toBe(true);
  });
  it('makes search action IDs unique', () => {
    const items = searchItems('');
    expect(new Set(items.map((item) => item.key)).size).toBe(items.length);
  });
  it('keeps Presidency dates consistent and omits unsupported totals', () => {
    expect(JSON.stringify(ownerProfile.journey)).not.toContain('Became President');
    expect(ownerProfile.resume.leadership.dates).toBe('Aug 2024 — Mar 2026');
    expect(JSON.stringify(ownerProfile)).not.toContain('50+');
  });
  it('escapes JSON-LD so future owner copy cannot close the script element', () => {
    expect(serializeJsonLd({ text: '</script>' })).not.toContain('</script>');
  });
});
