import {
  BarChart3,
  BookOpen,
  Compass,
  FileText,
  FolderKanban,
  FolderOpen,
  Globe,
  Globe2,
  Mail,
  Settings,
  Share2,
  Siren,
  StickyNote,
  Trophy,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { ownerProfile } from '@/data/ownerProfile';

export interface AppDef {
  id: string;
  name: string;
  desc: string;
  icon: LucideIcon;
  tint: string;
  primary?: boolean;
}
export const APPS: AppDef[] = [
  {
    id: 'projects',
    name: 'Work',
    desc: 'Projects & case studies',
    icon: FolderKanban,
    tint: 'from-amber-500 to-orange-700',
    primary: true,
  },
  {
    id: 'journey',
    name: 'About',
    desc: 'Background & journey',
    icon: Compass,
    tint: 'from-violet-500 to-purple-700',
    primary: true,
  },
  {
    id: 'contact',
    name: 'Contact',
    desc: 'Hiring & project inquiries',
    icon: Mail,
    tint: 'from-blue-500 to-indigo-700',
    primary: true,
  },
  {
    id: 'results',
    name: 'Results',
    desc: 'Qualified project outcomes',
    icon: BarChart3,
    tint: 'from-emerald-500 to-teal-700',
    primary: true,
  },
  {
    id: 'proof',
    name: 'Proof',
    desc: 'Code, links & supplied evidence',
    icon: BookOpen,
    tint: 'from-rose-500 to-pink-700',
    primary: true,
  },
  {
    id: 'systems',
    name: 'Systems',
    desc: 'Stack & approach',
    icon: Workflow,
    tint: 'from-sky-500 to-blue-700',
  },
  {
    id: 'achievements',
    name: 'Achievements',
    desc: 'Leadership & public work',
    icon: Trophy,
    tint: 'from-yellow-500 to-amber-700',
  },
  {
    id: 'socials',
    name: 'Socials',
    desc: 'Professional links',
    icon: Share2,
    tint: 'from-cyan-500 to-sky-700',
  },
  {
    id: 'founder',
    name: 'Founder.txt',
    desc: 'A personal note',
    icon: FileText,
    tint: 'from-slate-400 to-slate-600',
  },
  {
    id: 'whiteboard',
    name: 'Whiteboard',
    desc: 'Local sticky notes',
    icon: StickyNote,
    tint: 'from-lime-500 to-green-700',
  },
  {
    id: 'browser',
    name: 'PawanNet',
    desc: 'Public project bookmarks',
    icon: Globe2,
    tint: 'from-teal-500 to-cyan-700',
  },
  {
    id: 'cases',
    name: 'Case Files',
    desc: 'Project explorer',
    icon: FolderOpen,
    tint: 'from-orange-500 to-amber-700',
  },
  {
    id: 'notes',
    name: 'Field Notes',
    desc: 'Published build references',
    icon: Globe,
    tint: 'from-fuchsia-500 to-violet-700',
  },
  {
    id: 'emergency',
    name: 'Emergency',
    desc: 'Urgent business inquiries',
    icon: Siren,
    tint: 'from-red-500 to-rose-700',
  },
  {
    id: 'settings',
    name: 'Settings',
    desc: 'Local preferences',
    icon: Settings,
    tint: 'from-slate-500 to-slate-700',
  },
];
export const APP_MAP: Record<string, AppDef> = Object.fromEntries(APPS.map((app) => [app.id, app]));
export interface SearchItem {
  key: string;
  id: string;
  label: string;
  hint: string;
  type: 'app' | 'case' | 'link';
}
export function searchItems(query: string): SearchItem[] {
  const all: SearchItem[] = [
    ...APPS.map((app) => ({
      key: `app:${app.id}`,
      type: 'app' as const,
      id: app.id,
      label: app.name,
      hint: app.desc,
    })),
    ...ownerProfile.projects.map((project) => ({
      key: `case:${project.id}`,
      type: 'case' as const,
      id: project.id,
      label: project.name,
      hint: project.category,
    })),
    {
      key: 'link:resume',
      type: 'link',
      id: '/resume',
      label: 'Resume',
      hint: 'Readable one-page resume',
    },
    {
      key: 'link:portfolio',
      type: 'link',
      id: '/',
      label: 'Portfolio home',
      hint: 'Quick reading view',
    },
  ];
  const q = query.trim().toLowerCase();
  return (
    q ? all.filter((item) => `${item.label} ${item.hint}`.toLowerCase().includes(q)) : all
  ).slice(0, 12);
}
