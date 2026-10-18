export interface Project {
  name: string;
  description: string;
  url: string;
  meta: string;
  status: string;
  tags: string[];
  depth: string;
}

export const projects: Project[] = [
  {
    name: 'Marginota',
    description:
      'Learn a language by reading real articles. Tap any word to see what it means — no streaks, no shame, move at your own speed. Spanish, French, German, Italian, Portuguese, Dutch, Mandarin and more.',
    url: 'https://marginota.com',
    meta: 'Live · Web + Android · Language learning',
    status: 'Live',
    tags: ['Web', 'Android', 'Language learning'],
    depth: 'Z +0.00',
  },
  {
    name: 'PenteXR',
    description: 'Multiplayer Pente in virtual reality. Built with WebXR and Three.js.',
    url: 'https://pentexr.com',
    meta: 'Live · WebXR · Three.js',
    status: 'Live',
    tags: ['WebXR', 'Three.js', 'Multiplayer'],
    depth: 'Z −1.20',
  },
];
