export interface Project {
  name: string;
  description: string;
  url: string;
}

export const projects: Project[] = [
  {
    name: 'PenteXR',
    description: 'Multiplayer Pente in virtual reality. Built with WebXR and Three.js.',
    url: 'https://pentexr.com',
  },
  // Add more projects here
];
