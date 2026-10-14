import { PlayerProfile, Saint } from '../types/saint';
import { SAINTS_DATA } from '../data/saints';

const STORAGE_KEY = 'catholicgo_profile_v1';
const CUSTOM_SAINTS_KEY = 'catholicgo_custom_saints_v1';

export function getCustomSaints(): Saint[] {
  try {
    const raw = localStorage.getItem(CUSTOM_SAINTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Saint[];
  } catch (error) {
    console.error('Erro ao ler santos customizados:', error);
    return [];
  }
}

export function getAllSaints(): Saint[] {
  const custom = getCustomSaints();
  // Evita duplicatas se algum santo customizado tiver mesmo id
  const customIds = new Set(custom.map(s => s.id));
  const base = SAINTS_DATA.filter(s => !customIds.has(s.id));
  return [...base, ...custom];
}

export function addCustomSaint(newSaint: Saint): Saint[] {
  const custom = getCustomSaints();
  const filtered = custom.filter(s => s.id !== newSaint.id);
  const updated = [...filtered, newSaint];
  localStorage.setItem(CUSTOM_SAINTS_KEY, JSON.stringify(updated));
  return getAllSaints();
}

export function getPlayerProfile(): PlayerProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PlayerProfile;
  } catch (error) {
    console.error('Erro ao ler perfil do localStorage:', error);
    return null;
  }
}

export function savePlayerProfile(name: string): PlayerProfile {
  const existing = getPlayerProfile();
  const profile: PlayerProfile = {
    name: name.trim(),
    startedAt: existing?.startedAt || new Date().toISOString(),
    discoveredSaintIds: existing?.discoveredSaintIds || []
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  return profile;
}

export function unlockSaint(saintId: string): { profile: PlayerProfile; isNew: boolean } {
  const current = getPlayerProfile() || {
    name: 'Explorador',
    startedAt: new Date().toISOString(),
    discoveredSaintIds: []
  };

  const isNew = !current.discoveredSaintIds.includes(saintId);
  if (isNew) {
    current.discoveredSaintIds = [...current.discoveredSaintIds, saintId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  }

  return { profile: current, isNew };
}

export function resetGame(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Normaliza o texto lido no QR Code e encontra o santo correspondente
 */
export function resolveSaintFromQr(qrText: string): Saint | undefined {
  const clean = qrText.trim().toLowerCase();
  const saints = getAllSaints();
  
  // Tenta bater direto com ID ou code
  return saints.find(s => {
    return (
      s.id.toLowerCase() === clean ||
      s.code.toLowerCase() === clean ||
      clean.includes(s.id.toLowerCase()) ||
      clean.includes(s.code.toLowerCase())
    );
  });
}

