import React from 'react';
import { Camera, BookOpen, Sparkles, Award, QrCode, RotateCcw } from 'lucide-react';
import { PlayerProfile } from '../types/saint';
import { getAllSaints } from '../services/storage';

interface MainScreenProps {
  profile: PlayerProfile;
  onOpenScanner: () => void;
  onOpenAlbum: () => void;
  onOpenCatechist: () => void;
  onReset: () => void;
}

export const MainScreen: React.FC<MainScreenProps> = ({
  profile,
  onOpenScanner,
  onOpenAlbum,
  onOpenCatechist,
  onReset,
}) => {
  const totalSaints = getAllSaints().length;
  const discoveredCount = profile.discoveredSaintIds.length;
  const progressPercent = Math.round((discoveredCount / totalSaints) * 100);

  return (
    <div className="flex flex-col justify-between min-h-screen px-4 py-6 max-w-md mx-auto select-none">
      {/* Top Header com Brasão Menino Deus */}
      <header className="flex items-center justify-between bg-[#FFFDF7] border-4 border-[#CFAF88] rounded-3xl px-4 py-3 shadow-lg">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Brasão"
            className="h-11 object-contain drop-shadow"
          />
          <div>
            <span className="text-[10px] font-black text-[#A66E28] uppercase tracking-wider block">
              Igreja Menino Deus
            </span>
            <h2 className="text-base font-black text-[#4A2E16] leading-tight">
              {profile.name}
            </h2>
          </div>
        </div>

        <button
          onClick={onReset}
          title="Reiniciar jornada"
          className="p-2.5 rounded-2xl bg-[#EEDCC7] hover:bg-[#E3CCB2] border-2 border-[#CBB08E] text-[#5C3B1E] transition active:scale-95"
        >
          <RotateCcw className="w-4 h-4 stroke-[2.5]" />
        </button>
      </header>

      {/* Radar Central da Missão Lúdica */}
      <div className="my-auto py-4 flex flex-col items-center text-center">
        {/* Medalha / Círculo com efeito celestial */}
        <div className="relative w-64 h-64 flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-[#D8BE9E]/40 animate-ping opacity-30"></div>
          <div className="absolute inset-4 rounded-full border-2 border-[#CFAF88]/60"></div>
          <div className="absolute inset-10 rounded-full border-2 border-dashed border-[#A66E28]/40 animate-spin-slow"></div>
          
          <div className="relative z-10 flex flex-col items-center justify-center w-44 h-44 rounded-full bg-gradient-to-b from-[#FFFDF7] via-[#FDF6EA] to-[#EEDCC7] border-4 border-[#C8A265] shadow-2xl p-4">
            <Award className="w-9 h-9 text-[#A66E28] mb-1" />
            <div className="text-4xl font-black text-[#A66E28] tracking-tight">
              {discoveredCount}<span className="text-lg text-[#7A4F26] font-bold">/{totalSaints}</span>
            </div>
            <span className="text-[10px] text-[#70461E] uppercase tracking-widest font-black mt-1">
              Descobertos
            </span>
          </div>
        </div>

        {/* Card da Barra de Progresso */}
        <div className="w-full bg-[#FFFDF7] border-4 border-[#CFAF88] rounded-3xl p-4 shadow-lg">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-[#683F1A] font-black flex items-center gap-1.5 uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Progresso do Álbum
            </span>
            <span className="font-black text-[#A66E28] text-sm">{progressPercent}%</span>
          </div>

          <div className="w-full bg-[#EEDCC7] rounded-full h-3.5 overflow-hidden p-0.5 border border-[#DEC9B0]">
            <div
              className="bg-gradient-to-r from-amber-400 to-yellow-400 h-full rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <p className="text-xs text-[#7A4F26] mt-2.5 font-bold text-center">
            {discoveredCount === totalSaints
              ? '🎉 Parabéns! Você completou toda a coleção dos Santos!'
              : 'Explore a igreja e aponte a câmera para os QR Codes!'}
          </p>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="grid grid-cols-2 gap-3 mb-2">
        <button
          onClick={onOpenScanner}
          className="flex flex-col items-center justify-center py-4 px-3 rounded-3xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-[#4A2E16] font-black border-2 border-[#DEC9B0] shadow-lg shadow-amber-900/15 transition active:scale-95"
        >
          <Camera className="w-7 h-7 mb-1 stroke-[2.5]" />
          <span className="text-base">Escanear QR</span>
        </button>

        <button
          onClick={onOpenAlbum}
          className="flex flex-col items-center justify-center py-4 px-3 rounded-3xl bg-[#FFFDF7] hover:bg-[#F7ECE0] border-4 border-[#CFAF88] text-[#4A2E16] font-black shadow-lg transition active:scale-95"
        >
          <BookOpen className="w-7 h-7 mb-1 text-[#A66E28] stroke-[2.5]" />
          <span className="text-base">Ver Álbum</span>
        </button>
      </div>

      {/* Rodapé: Painel do Catequista */}
      <button
        onClick={onOpenCatechist}
        className="text-xs text-[#7A4F26] hover:text-[#4A2E16] font-black text-center py-1.5 flex items-center justify-center gap-1.5"
      >
        <QrCode className="w-4 h-4 text-[#A66E28]" />
        Painel do Catequista / Imprimir Códigos
      </button>
    </div>
  );
};
