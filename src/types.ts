export interface Article {
  id: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  imageUrl: string;
  firstLetter: string;
  intro: string;
  sections: {
    type: 'paragraph' | 'heading' | 'bento' | 'quote';
    content: string;
    subcontent?: any; // for bento or structured details
  }[];
}

export interface StickyNote {
  id: string;
  text: string;
  color: 'yellow' | 'amber' | 'slate';
  createdAt: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export interface CryptoRate {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

export interface ContributorCard {
  id: string;
  name: string;
  role: string;
  email: string;
  avatarUrl: string;
  socials: {
    githubUrl?: string;
    twitterUrl?: string;
  };
}

export const MAIN_ARTICLE_ID = 'future-minimalism';

export const MOCK_ARTICLES: Article[] = [
  {
    id: MAIN_ARTICLE_ID,
    title: 'The Future of Minimalism in UI Design',
    date: 'Mar 15, 2024',
    category: 'DESIGN',
    readTime: '4 min read',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF5EB_9rRnwy5lcjtCgJkPFOQ0xxPYOxh3Q_qWibiWPkRFcA__J-rPgrcsbCx5igzV9fqJkvfLRHbW3dC-whpAl2LlitsocqdZmNnfWFP0Bta0efXXHhy3-qAtR0lfQC5mhMua0bExPCv_C3iL5vJRNhTau_1TB5XadICGUX8E1ylowBgt4gDNQ3QCe7zeP15260eP_51E_UXlX7dUo6Bzw7IiwrRYFjaaX-2_TbXb6Ro6cO8h_g4m8DAIHfgIt968cgatP0_gToRS',
    firstLetter: 'A',
    intro: 'As digital interfaces become increasingly complex, the shift toward technical minimalism is no longer just an aesthetic choice—it is a functional necessity. Developers and power users today demand precision, prioritizing information density over decorative elements.',
    sections: [
      {
        type: 'heading',
        content: 'The Rise of High-Contrast Noir',
      },
      {
        type: 'paragraph',
        content: 'Minimalism in 2024 is defined by "High-Contrast Noir." It’s an approach that leverages deep blacks and crisp whites to create hierarchy without the noise of traditional drop shadows or saturated colors. By using tonal layering—shifting from a #09090B base to a #18111B container—designers can communicate depth with surgical precision.',
      },
      {
        type: 'bento',
        content: 'Key Noir Characteristics',
        subcontent: [
          {
            title: 'Tonal Layering',
            description: 'Defining depth through grayscale shifts rather than soft shadows.',
            icon: 'layers',
          },
          {
            title: 'Data Density',
            description: 'Optimizing UI layouts for rapid information parsing and utility.',
            icon: 'data_object',
          },
        ],
      },
      {
        type: 'heading',
        content: 'The Logic of Hairline Dividers',
      },
      {
        type: 'paragraph',
        content: 'When you strip away the color, the structure must be flawless. We use 1px hairline borders to create a "blueprint" feel. This visual language is inherently developer-focused; it mirrors the logic of code—clean, nested, and predictable. The result is a UI that feels professional, reliable, and laser-focused.',
      },
      {
        type: 'quote',
        content: 'Precision is the only luxury in an age of digital noise.',
      },
      {
        type: 'paragraph',
        content: 'In conclusion, the future of UI design isn\'t found in adding more, but in mastering the void. By focusing on typography, micro-borders, and high-contrast accessibility, we create environments that foster deep work and minimize cognitive load.',
      },
    ],
  },
  {
    id: 'surgical-typography',
    title: 'Surgical Typography: Leading the Human Eye',
    date: 'Apr 02, 2024',
    category: 'TYPOGRAPHY',
    readTime: '5 min read',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF5EB_9rRnwy5lcjtCgJkPFOQ0xxPYOxh3Q_qWibiWPkRFcA__J-rPgrcsbCx5igzV9fqJkvfLRHbW3dC-whpAl2LlitsocqdZmNnfWFP0Bta0efXXHhy3-qAtR0lfQC5mhMua0bExPCv_C3iL5vJRNhTau_1TB5XadICGUX8E1ylowBgt4gDNQ3QCe7zeP15260eP_51E_UXlX7dUo6Bzw7IiwrRYFjaaX-2_TbXb6Ro6cO8h_g4m8DAIHfgIt968cgatP0_gToRS', // Fallback or search online
    firstLetter: 'T',
    intro: 'Typography is not mere style; it is structural communication. By configuring fine tracking, proportional leading, and deliberate visual scales, developers create layouts that naturally guide user priority.',
    sections: [
      {
        type: 'heading',
        content: 'The Hierarchy of Weight & Tracking',
      },
      {
        type: 'paragraph',
        content: 'Often, design systems rely excessively on massive font sizes to denote headers. A more surgical approach utilizes Hanken Grotesk or Geist Mono in normal sizing but with tight tracker offsets and strong line weights. This maintains density while elevating distinctiveness.',
      },
      {
        type: 'quote',
        content: 'Bad tracking is digital friction. Tighten your letter-spacing and let clarity reign.',
      },
    ],
  },
  {
    id: 'offline-first-sync',
    title: 'Designing Zero-Latency Offline-First Sync Engines',
    date: 'Jun 11, 2024',
    category: 'SYSTEMS',
    readTime: '8 min read',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF5EB_9rRnwy5lcjtCgJkPFOQ0xxPYOxh3Q_qWibiWPkRFcA__J-rPgrcsbCx5igzV9fqJkvfLRHbW3dC-whpAl2LlitsocqdZmNnfWFP0Bta0efXXHhy3-qAtR0lfQC5mhMua0bExPCv_C3iL5vJRNhTau_1TB5XadICGUX8E1ylowBgt4gDNQ3QCe7zeP15260eP_51E_UXlX7dUo6Bzw7IiwrRYFjaaX-2_TbXb6Ro6cO8h_g4m8DAIHfgIt968cgatP0_gToRS',
    firstLetter: 'L',
    intro: 'Latency is a design flaw. An application built with perfect local databases and smart queue listeners ensures instant interactive feedback, updating background assets only when a connection becomes reliable.',
    sections: [
      {
        type: 'heading',
        content: 'Optimistic UI State Engines',
      },
      {
        type: 'paragraph',
        content: 'By rendering the target state locally before API answers, the user interacts with zero perceived latency. An elegant local database layer logs mutations, retrying sync triggers automatically upon back-online connection listeners.',
      },
    ],
  },
];

export const INITIAL_NOTES: StickyNote[] = [
  {
    id: 'note-1',
    text: 'Refactor standard HSL borders to sharp 1px hairline boundaries.',
    color: 'yellow',
    createdAt: 'Mar 15, 2026',
  },
  {
    id: 'note-2',
    text: 'Audit contrasts of container surfaces shifting from #09090B to #18181B.',
    color: 'amber',
    createdAt: 'Mar 16, 2026',
  },
];

export const INITIAL_GUESTBOOK: GuestbookEntry[] = [
  {
    id: 'g-1',
    name: 'Linus D.',
    message: 'Extremely clean layout. The hairline dividers give it a real terminal blueprint feel! Keep it up.',
    createdAt: 'Jun 14, 2026, 08:15 AM',
  },
  {
    id: 'g-2',
    name: 'Ada L.',
    message: 'Love the high-contrast tonal layering approach. Finally a UI that focuses purely on clean data.',
    createdAt: 'Jun 14, 2026, 08:30 AM',
  },
];

export const INITIAL_CRYPTO: CryptoRate[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 68420.5, change24h: 3.54 },
  { symbol: 'ETH', name: 'Ethereum', price: 3485.2, change24h: -1.25 },
  { symbol: 'INR', name: 'USD to INR', price: 83.56, change24h: 0.12 },
  { symbol: 'GAS', name: 'Ethereum Gas (Gwei)', price: 21.0, change24h: -12.45 },
];

export const CONTRIBUTORS: ContributorCard[] = [
  {
    id: 'c-1',
    name: 'Aaron Dev',
    role: 'Lead Architect',
    email: 'aaron@terminal.log',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200',
    socials: { githubUrl: 'https://github.com', twitterUrl: 'https://twitter.com' },
  },
  {
    id: 'c-2',
    name: 'Sarah Noir',
    role: 'Visual Designer',
    email: 'sarah@terminal.log',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
    socials: { githubUrl: 'https://github.com' },
  },
  {
    id: 'c-3',
    name: 'Devon Code',
    role: 'Systems Engineer',
    email: 'devon@terminal.log',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    socials: { githubUrl: 'https://github.com', twitterUrl: 'https://twitter.com' },
  },
];
