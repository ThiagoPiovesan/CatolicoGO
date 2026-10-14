export interface Saint {
  id: string;
  code: string; // QR code payload (e.g. "CATHOLICGO:CARLO_ACUTIS" or "carlo-acutis")
  name: string;
  title: string; // e.g. "Padroeiro da Internet"
  birthDate: string;
  deathDate: string;
  feastDay: string; // Dia litúrgico
  imageUrl: string;
  summary: string;
  biography: string;
  curiosities: string[];
  patronage: string;
  category: 'padroeiro' | 'martir' | 'doutor' | 'jovem' | 'virgem';
  accentColor: string; // Tailwind color class or hex for custom badge styling
  subtitle?: string; // e.g. "O PAI TERRENO DE JESUS"
  whoAmI?: string; // "QUEM SOU EU?"
  specialDates?: string; // "DATAS ESPECIAIS:"
  whatITeach?: string; // "O QUE EU ENSINO:"
}

export interface PlayerProfile {
  name: string;
  startedAt: string;
  discoveredSaintIds: string[];
}

export type ScreenState = 
  | { type: 'home' }
  | { type: 'main' }
  | { type: 'camera' }
  | { type: 'album' }
  | { type: 'saint_detail'; saintId: string; isNewDiscovery?: boolean }
  | { type: 'catechist' };
