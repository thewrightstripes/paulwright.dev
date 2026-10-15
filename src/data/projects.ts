export interface Project {
  name: string;
  description: string;
  url: string;
  meta: string;
}

export const projects: Project[] = [
  {
    name: 'Marginota',
    description:
      'Learn a language by reading real articles. Tap any word to see what it means — no streaks, no shame, move at your own speed. Spanish, French, German, Italian, Portuguese, Dutch, Mandarin and more.',
    url: 'https://marginota.com',
    meta: 'Live · Web + Android · Language learning',
  },
  {
    name: 'PenteXR',
    description: 'Multiplayer Pente in virtual reality. Built with WebXR and Three.js.',
    url: 'https://pentexr.com',
    meta: 'Live · WebXR · Three.js',
  },
];
