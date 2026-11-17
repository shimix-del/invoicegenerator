import { TemplateDefinition } from '../types/invoice';

export const TEMPLATES: TemplateDefinition[] = [
  // --- 3 Free Tier Templates ---
  {
    id: 'classic-minimal',
    name: 'Classic Minimal',
    description: 'Clean, typography-focused layout with plenty of whitespace. Perfect for freelancers.',
    isPro: false,
    category: 'minimal',
    defaultAccent: '#2563eb', // Blue 600
    tags: ['Clean', 'High Contrast', 'Popular'],
  },
  {
    id: 'modern-clean',
    name: 'Modern Clean',
    description: 'Crisp borders, subtle colored badges, and structured line item cards.',
    isPro: false,
    category: 'modern',
    defaultAccent: '#0d9488', // Teal 600
    tags: ['Modern', 'Balanced', 'Easy Reading'],
  },
  {
    id: 'bold-accent',
    name: 'Bold Accent',
    description: 'Prominent header banner with high-impact total display. Looks striking.',
    isPro: false,
    category: 'bold',
    defaultAccent: '#4f46e5', // Indigo 600
    tags: ['Vibrant', 'Professional', 'Bold'],
  },

  // --- 13 Pro Tier Templates ---
  {
    id: 'corporate-slate',
    name: 'Corporate Slate',
    description: 'Traditional enterprise design with structured company block and dual-column summary.',
    isPro: true,
    category: 'corporate',
    previewBadge: 'PRO',
    defaultAccent: '#334155', // Slate 700
    tags: ['B2B', 'Corporate', 'Formal'],
  },
  {
    id: 'creative-studio',
    name: 'Creative Studio',
    description: 'Playful yet disciplined layout tailored for designers, illustrators, and agency teams.',
    isPro: true,
    category: 'creative',
    previewBadge: 'PRO',
    defaultAccent: '#e11d48', // Rose 600
    tags: ['Agencies', 'Designers', 'Stylish'],
  },
  {
    id: 'dark-header',
    name: 'Dark Header Luxe',
    description: 'Premium dark charcoal top section contrasting with a bright, ultra-crisp itemized body.',
    isPro: true,
    category: 'bold',
    previewBadge: 'PRO',
    defaultAccent: '#0f172a', // Slate 900
    tags: ['Sleek', 'Executive', 'High End'],
  },
  {
    id: 'tech-developer',
    name: 'Tech & Dev Monospace',
    description: 'Code-inspired terminal badges, monospace numbers, and precise layout for software devs.',
    isPro: true,
    category: 'modern',
    previewBadge: 'PRO',
    defaultAccent: '#059669', // Emerald 600
    tags: ['Developers', 'IT Consultants', 'Tech'],
  },
  {
    id: 'swiss-grid',
    name: 'Swiss International',
    description: 'Strict typographic hierarchy, sharp dividing lines, and timeless modernist aesthetic.',
    isPro: true,
    category: 'minimal',
    previewBadge: 'PRO',
    defaultAccent: '#dc2626', // Red 600
    tags: ['Architectural', 'Minimalist', 'Timeless'],
  },
  {
    id: 'compact-slip',
    name: 'Compact Slip',
    description: 'Space-efficient receipt-style layout designed to fit complex invoices onto one page.',
    isPro: true,
    category: 'classic',
    previewBadge: 'PRO',
    defaultAccent: '#475569', // Slate 600
    tags: ['Single Page', 'Dense', 'Efficient'],
  },
  {
    id: 'executive-serif',
    name: 'Executive Editorial',
    description: 'Sophisticated serif headlines and warm paper tones suited for legal and boutique advisory.',
    isPro: true,
    category: 'classic',
    previewBadge: 'PRO',
    defaultAccent: '#78350f', // Amber 900
    tags: ['Legal', 'Consulting', 'Editorial'],
  },
  {
    id: 'split-gradient',
    name: 'Aura Gradient',
    description: 'Vibrant modern header gradient, rounded chips, and contemporary SaaS styling.',
    isPro: true,
    category: 'creative',
    previewBadge: 'PRO',
    defaultAccent: '#7c3aed', // Violet 600
    tags: ['Startups', 'Creators', 'Vibrant'],
  },
  {
    id: 'consultant-pro',
    name: 'Consultant Signature',
    description: 'Emphasizes project milestones, hourly breakdown, and highlighted payment instructions.',
    isPro: true,
    category: 'corporate',
    previewBadge: 'PRO',
    defaultAccent: '#0284c7', // Sky 600
    tags: ['Consultants', 'Hourly', 'Trusted'],
  },
  {
    id: 'neon-edge',
    name: 'Neon Cyber',
    description: 'High-tech dark accents with electric highlight borders and sharp geometric details.',
    isPro: true,
    category: 'bold',
    previewBadge: 'PRO',
    defaultAccent: '#10b981', // Emerald 500
    tags: ['Futuristic', 'Crypto / Web3', 'Bold'],
  },
  {
    id: 'nordic-frost',
    name: 'Nordic Calm',
    description: 'Gentle muted tones, soft rounded borders, and spacious breathable typography.',
    isPro: true,
    category: 'minimal',
    previewBadge: 'PRO',
    defaultAccent: '#64748b', // Slate 500
    tags: ['Scandinavian', 'Calm', 'Soft'],
  },
  {
    id: 'arch-blueprint',
    name: 'Blueprint Technical',
    description: 'Technical grid markings, precise boxed totals, and engineering-inspired structure.',
    isPro: true,
    category: 'modern',
    previewBadge: 'PRO',
    defaultAccent: '#1d4ed8', // Blue 700
    tags: ['Engineers', 'Contractors', 'Precision'],
  },
  {
    id: 'formal-legal',
    name: 'Formal Legal & Tax',
    description: 'Comprehensive compliance framing with formal tax registration blocks and notarized feel.',
    isPro: true,
    category: 'corporate',
    previewBadge: 'PRO',
    defaultAccent: '#1e293b', // Slate 800
    tags: ['Compliant', 'Taxes', 'Formal'],
  },
];

export const ACCENT_COLORS = [
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Blue', value: '#2563eb' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Rose', value: '#e11d48' },
  { name: 'Violet', value: '#7c3aed' },
  { name: 'Amber', value: '#d97706' },
  { name: 'Slate', value: '#334155' },
  { name: 'Black', value: '#0f172a' },
];

export const FONT_OPTIONS = [
  { name: 'Plus Jakarta Sans (Modern Clean)', value: "'Plus Jakarta Sans', sans-serif" },
  { name: 'Inter (Neutral Grotesque)', value: "'Inter', sans-serif" },
  { name: 'Playfair Display (Editorial Serif)', value: "'Playfair Display', serif" },
  { name: 'Space Grotesk (Tech Geometric)', value: "'Space Grotesk', sans-serif" },
  { name: 'JetBrains Mono (Developer)', value: "'JetBrains Mono', monospace" },
];
