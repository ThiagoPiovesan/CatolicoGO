import { useState, useEffect } from 'react';
import { ScreenState, Saint, PlayerProfile } from './types/saint';
import {
  getPlayerProfile,
  savePlayerProfile,
  unlockSaint,
  resolveSaintFromQr,
  resetGame,
} from './services/storage';

import { HomeScreen } from './components/HomeScreen';
import { MainScreen } from './components/MainScreen';
import { CameraScreen } from './components/CameraScreen';
import { AlbumScreen } from './components/AlbumScreen';
import { SaintDetailScreen } from './components/SaintDetailScreen';
import { CatechistPanel } from './components/CatechistPanel';

export function App() {
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [screen, setScreen] = useState<ScreenState>({ type: 'home' });
  const [activeSaint, setActiveSaint] = useState<Saint | null>(null);
  const [isNewDiscovery, setIsNewDiscovery] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  useEffect(() => {
    const saved = getPlayerProfile();
    if (saved) {
      setProfile(saved);
      // Se já houver perfil salvo, abre a tela principal diretamente
      setScreen({ type: 'main' });
    }
  }, []);

  const handleStartGame = (name: string) => {
    const newProfile = savePlayerProfile(name);
    setProfile(newProfile);
    setScreen({ type: 'main' });
  };

  const handleContinue = () => {
    setScreen({ type: 'main' });
  };

  const handleScanSuccess = (decodedText: string) => {
    const foundSaint = resolveSaintFromQr(decodedText);

    if (foundSaint) {
      const { profile: updatedProfile, isNew } = unlockSaint(foundSaint.id);
      setProfile(updatedProfile);
      setActiveSaint(foundSaint);
      setIsNewDiscovery(isNew);
      setScreen({ type: 'saint_detail', saintId: foundSaint.id, isNewDiscovery: isNew });
    } else {
      setScanMessage(`Código "${decodedText}" não reconhecido como Santo.`);
      setTimeout(() => setScanMessage(null), 4000);
    }
  };

  const handleSelectSaintFromAlbum = (saint: Saint) => {
    setActiveSaint(saint);
    setIsNewDiscovery(false);
    setScreen({ type: 'saint_detail', saintId: saint.id, isNewDiscovery: false });
  };

  const handleResetGame = () => {
    if (window.confirm('Deseja realmente reiniciar o jogo e apagar o progresso do álbum?')) {
      resetGame();
      setProfile(null);
      setActiveSaint(null);
      setScreen({ type: 'home' });
    }
  };

  return (
    <div className="min-h-screen bg-[#E5CDB2] text-[#4A2E16] flex flex-col font-sans select-none">
      {/* Toast de notificação para erros de leitura */}
      {scanMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-rose-600 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 max-w-sm">
          <span>⚠️ {scanMessage}</span>
        </div>
      )}

      {/* Roteamento de telas */}
      {screen.type === 'home' && (
        <HomeScreen
          existingProfile={profile}
          onStart={handleStartGame}
          onContinue={handleContinue}
          onOpenCatechist={() => setScreen({ type: 'catechist' })}
        />
      )}

      {screen.type === 'main' && profile && (
        <MainScreen
          profile={profile}
          onOpenScanner={() => setScreen({ type: 'camera' })}
          onOpenAlbum={() => setScreen({ type: 'album' })}
          onOpenCatechist={() => setScreen({ type: 'catechist' })}
          onReset={handleResetGame}
        />
      )}

      {screen.type === 'camera' && (
        <CameraScreen
          onScanSuccess={handleScanSuccess}
          onBack={() => setScreen({ type: 'main' })}
        />
      )}

      {screen.type === 'album' && profile && (
        <AlbumScreen
          discoveredIds={profile.discoveredSaintIds}
          onSelectSaint={handleSelectSaintFromAlbum}
          onOpenScanner={() => setScreen({ type: 'camera' })}
          onBackToMain={() => setScreen({ type: 'main' })}
        />
      )}

      {screen.type === 'saint_detail' && activeSaint && (
        <SaintDetailScreen
          saint={activeSaint}
          isNewDiscovery={isNewDiscovery}
          onBackToMain={() => setScreen({ type: 'main' })}
          onGoToAlbum={() => setScreen({ type: 'album' })}
        />
      )}

      {screen.type === 'catechist' && (
        <CatechistPanel
          onBack={() => setScreen(profile ? { type: 'main' } : { type: 'home' })}
        />
      )}
    </div>
  );
}
export default App;
