export const WHITEBOARD_KEY = 'personal-os-whiteboard-v2';
export const NOTE_COLORS = [
  { value: '#fef08a', name: 'Yellow' },
  { value: '#bbf7d0', name: 'Mint' },
  { value: '#bae6fd', name: 'Sky' },
  { value: '#fecdd3', name: 'Rose' },
  { value: '#e9d5ff', name: 'Lavender' },
];
export interface Sticky {
  id: string;
  text: string;
  color: string;
}
export function normalizeNotes(value: unknown): Sticky[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  return value.slice(-12).flatMap((item): Sticky[] => {
    if (!item || typeof item !== 'object' || typeof item.text !== 'string' || !item.text.trim())
      return [];
    if (typeof item.id !== 'string' && typeof item.id !== 'number') return [];
    const id = String(item.id).slice(0, 100);
    if (seen.has(id)) return [];
    seen.add(id);
    return [
      {
        id,
        text: item.text.slice(0, 280),
        color: NOTE_COLORS.some((color) => color.value === item.color)
          ? item.color
          : NOTE_COLORS[0].value,
      },
    ];
  });
}
export function loadNotes(): Sticky[] {
  try {
    return normalizeNotes(
      JSON.parse(
        localStorage.getItem(WHITEBOARD_KEY) ??
          localStorage.getItem('personal-os-whiteboard-v1') ??
          '[]',
      ),
    );
  } catch {
    return [];
  }
}
export function saveNotes(notes: Sticky[]): boolean {
  try {
    localStorage.setItem(WHITEBOARD_KEY, JSON.stringify(normalizeNotes(notes)));
    return true;
  } catch {
    return false;
  }
}
