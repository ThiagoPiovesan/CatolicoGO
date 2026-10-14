import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, MapPin, BookOpen, Sparkles } from 'lucide-react';
import { Saint } from '../types/saint';

interface SaintDetailScreenProps {
  saint: Saint;
  isNewDiscovery?: boolean;
  onBackToMain: () => void;
  onGoToAlbum: () => void;
}

export const SaintDetailScreen: React.FC<SaintDetailScreenProps> = ({
  saint,
  isNewDiscovery = false,
  onBackToMain,
  onGoToAlbum,
}) => {
  useEffect(() => {
    if (isNewDiscovery) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#f472b6', '#60a5fa', '#34d399'],
      });
    }
  }, [isNewDiscovery]);

  // Fallbacks amigáveis para campos caso algum não esteja preenchido
  const whoAmIText =
    saint.whoAmI ||
    saint.summary ||
    `Sou ${saint.name}, exemplo de fidelidade e amor a Deus.`;

  const curiositiesText =
    saint.curiosities && saint.curiosities.length > 0
      ? saint.curiosities.slice(0, 2).join(' ')
      : 'Vivi minha vida fazendo o bem para todos ao meu redor.';

  const specialDatesText =
    saint.specialDates ||
    `Minha festa principal é ${saint.feastDay}. Padroeiro(a) de: ${saint.patronage}.`;

  const whatITeachText =
    saint.whatITeach ||
    `Amar a Deus com todo o coração e praticar a caridade nas pequenas coisas.`;

  const subtitleText =
    saint.subtitle || saint.title.toUpperCase();

  return (
    <div className="min-h-screen bg-[#E5CDB2] text-[#4A2E16] font-sans flex flex-col justify-between p-2 sm:p-4 select-none">
      {/* Moldura externa de artesanato lúdico */}
      <div className="relative w-full max-w-md mx-auto bg-[#FFFDF7] rounded-[32px] border-4 border-[#CFAF88] shadow-2xl p-4 sm:p-5 flex flex-col justify-between min-h-[92vh] overflow-hidden">
        
        {/* Cabeçalho do Card */}
        <div>
          {/* Botão de voltar */}
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={onBackToMain}
              className="w-10 h-10 rounded-2xl bg-[#EEDCC7] hover:bg-[#E3CCB2] border-2 border-[#CBB08E] flex items-center justify-center text-[#5C3B1E] shadow-sm transition active:scale-90"
              title="Voltar"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {isNewDiscovery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-[#8C531B] text-[11px] font-black uppercase tracking-wider animate-bounce shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Novo Santo Descoberto!
              </span>
            )}
            <div className="w-10" />
          </div>

          {/* Nome e Título no estilo ilustrado */}
          <div className="text-center mt-1 mb-3">
            <h1 className="text-3xl sm:text-4xl font-black text-[#A66E28] tracking-tight uppercase drop-shadow-[0_2px_0_#FFF3D1]">
              {saint.name}
            </h1>
            <p className="text-xs sm:text-sm font-extrabold text-[#70461E] uppercase tracking-wider mt-0.5">
              {subtitleText}
            </p>
          </div>

          {/* Ilustração do Santo com auréola luminosa */}
          <div className="relative flex items-center justify-center my-2">
            {/* Halo celestial */}
            <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-amber-200 via-yellow-100 to-amber-300 opacity-70 blur-md animate-pulse"></div>
            
            <div className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-full p-2 bg-gradient-to-b from-[#F3E2B8] to-[#DFC289] border-4 border-[#C8A265] shadow-xl overflow-hidden flex items-center justify-center">
              <img
                src={saint.imageUrl}
                alt={saint.name}
                className="w-full h-full object-cover object-center rounded-full transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80';
                }}
              />
            </div>
          </div>
        </div>

        {/* Grid 2x2 de Cartões de História Lúdica */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
          {/* 1. Quem sou eu? */}
          <div className="bg-white/95 rounded-2xl border-2 border-[#E5D5BF] p-3 shadow-sm hover:shadow transition">
            <div className="flex items-center gap-1.5 mb-1 text-[11px] font-black text-[#683F1A] uppercase tracking-wide">
              <span>❓</span>
              <span>QUEM SOU EU?</span>
            </div>
            <p className="text-[11px] leading-snug text-[#4A2E16] font-medium">
              {whoAmIText}
            </p>
          </div>

          {/* 2. Curiosidades */}
          <div className="bg-white/95 rounded-2xl border-2 border-[#E5D5BF] p-3 shadow-sm hover:shadow transition">
            <div className="flex items-center gap-1.5 mb-1 text-[11px] font-black text-[#683F1A] uppercase tracking-wide">
              <span>⭐</span>
              <span>CURIOSIDADES:</span>
            </div>
            <p className="text-[11px] leading-snug text-[#4A2E16] font-medium">
              {curiositiesText}
            </p>
          </div>

          {/* 3. Datas Especiais */}
          <div className="bg-white/95 rounded-2xl border-2 border-[#E5D5BF] p-3 shadow-sm hover:shadow transition">
            <div className="flex items-center gap-1.5 mb-1 text-[11px] font-black text-[#683F1A] uppercase tracking-wide">
              <span>📅</span>
              <span>DATAS ESPECIAIS:</span>
            </div>
            <p className="text-[11px] leading-snug text-[#4A2E16] font-medium">
              {specialDatesText}
            </p>
          </div>

          {/* 4. O que eu ensino */}
          <div className="bg-white/95 rounded-2xl border-2 border-[#E5D5BF] p-3 shadow-sm hover:shadow transition">
            <div className="flex items-center gap-1.5 mb-1 text-[11px] font-black text-[#683F1A] uppercase tracking-wide">
              <span>✝</span>
              <span>O QUE EU ENSINO:</span>
            </div>
            <p className="text-[11px] leading-snug text-[#4A2E16] font-medium">
              {whatITeachText}
            </p>
          </div>
        </div>

        {/* Ações Inferiores */}
        <div className="space-y-3 mt-1">
          {/* Botão de Coletado / Salvar no Álbum */}
          <button
            onClick={onGoToAlbum}
            className="relative w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-[#E9D5FF] via-[#FED7AA] to-[#BBF7D0] border-4 border-white shadow-lg shadow-amber-900/10 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-2 text-slate-900"
          >
            <span className="text-sm sm:text-base font-black tracking-wide uppercase text-[#542B0A] flex items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-amber-600" />
              {isNewDiscovery ? 'COLETADO! SALVAR NO ÁLBUM!' : 'VER NO MEU ÁLBUM!'}
              <span className="text-xl">📦</span>
            </span>
          </button>

          {/* Barra de Navegação no estilo de botões de madeira/artesanato */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={onBackToMain}
              className="py-2.5 px-4 rounded-2xl bg-[#EEDCC7] hover:bg-[#E3CCB2] border-2 border-[#CBB08E] font-extrabold text-xs text-[#5C3B1E] flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition"
            >
              <MapPin className="w-4 h-4 stroke-[2.5]" />
              MAPA
            </button>

            <button
              onClick={onGoToAlbum}
              className="py-2.5 px-4 rounded-2xl bg-[#EEDCC7] hover:bg-[#E3CCB2] border-2 border-[#CBB08E] font-extrabold text-xs text-[#5C3B1E] flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition"
            >
              <BookOpen className="w-4 h-4 stroke-[2.5]" />
              ÁLBUM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
