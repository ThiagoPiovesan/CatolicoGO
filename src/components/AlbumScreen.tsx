import React, { useState } from 'react';
import { ArrowLeft, Camera, HelpCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { Saint } from '../types/saint';
import { getAllSaints } from '../services/storage';

interface AlbumScreenProps {
  discoveredIds: string[];
  onSelectSaint: (saint: Saint) => void;
  onOpenScanner: () => void;
  onBackToMain: () => void;
}

export const AlbumScreen: React.FC<AlbumScreenProps> = ({
  discoveredIds,
  onSelectSaint,
  onOpenScanner,
  onBackToMain,
}) => {
  const [filter, setFilter] = useState<'all' | 'discovered' | 'locked'>('all');
  const allSaints = getAllSaints();

  const total = allSaints.length;
  const count = discoveredIds.length;

  const filteredSaints = allSaints.filter((saint) => {
    const isDiscovered = discoveredIds.includes(saint.id);
    if (filter === 'discovered') return isDiscovered;
    if (filter === 'locked') return !isDiscovered;
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen px-4 py-6 max-w-md mx-auto pb-12 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBackToMain}
          className="w-10 h-10 rounded-2xl bg-[#EEDCC7] hover:bg-[#E3CCB2] border-2 border-[#CBB08E] flex items-center justify-center text-[#5C3B1E] shadow-sm transition active:scale-90"
          title="Início"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="text-center">
          <h2 className="text-xl font-black text-[#A66E28] tracking-tight uppercase drop-shadow-[0_1px_0_#FFF3D1]">
            Álbum Sagrado
          </h2>
          <span className="text-xs font-black text-[#7A4F26]">
            {count} de {total} descobertos
          </span>
        </div>

        <button
          onClick={onOpenScanner}
          className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-[#4A2E16] font-black transition active:scale-95 flex items-center gap-1.5 text-xs shadow-md border-2 border-[#DEC9B0]"
        >
          <Camera className="w-4 h-4 stroke-[2.5]" />
          Escanear
        </button>
      </div>

      {/* Abas de Filtro Estilo Artesanal */}
      <div className="flex bg-[#EEDCC7] p-1.5 rounded-2xl border-2 border-[#CBB08E] mb-5 text-xs font-black shadow-inner">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-2 rounded-xl transition ${
            filter === 'all'
              ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-[#4A2E16] shadow-sm'
              : 'text-[#7A4F26] hover:text-[#4A2E16]'
          }`}
        >
          Todos ({total})
        </button>
        <button
          onClick={() => setFilter('discovered')}
          className={`flex-1 py-2 rounded-xl transition ${
            filter === 'discovered'
              ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-[#4A2E16] shadow-sm'
              : 'text-[#7A4F26] hover:text-[#4A2E16]'
          }`}
        >
          Coletados ({count})
        </button>
        <button
          onClick={() => setFilter('locked')}
          className={`flex-1 py-2 rounded-xl transition ${
            filter === 'locked'
              ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-[#4A2E16] shadow-sm'
              : 'text-[#7A4F26] hover:text-[#4A2E16]'
          }`}
        >
          Faltam ({total - count})
        </button>
      </div>

      {/* Grid de Cards (Estilo Álbum de Figurinhas Ilustrado) */}
      <div className="grid grid-cols-2 gap-3.5">
        {filteredSaints.map((saint, index) => {
          const isDiscovered = discoveredIds.includes(saint.id);

          if (isDiscovered) {
            return (
              <div
                key={saint.id}
                onClick={() => onSelectSaint(saint)}
                className="group relative cursor-pointer bg-[#FFFDF7] hover:bg-white border-4 border-[#C8A265] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-200 transform hover:-translate-y-1 active:scale-95 flex flex-col"
              >
                {/* Número da Figurinha */}
                <div className="absolute top-2 left-2 z-10 bg-[#EEDCC7]/90 backdrop-blur px-2.5 py-0.5 rounded-full text-[10px] font-black text-[#5C3B1E] border border-[#CBB08E]">
                  #{String(index + 1).padStart(2, '0')}
                </div>

                <div className="absolute top-2 right-2 z-10">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                </div>

                {/* Imagem do Santo */}
                <div className="relative h-36 w-full bg-[#FAF3E6] overflow-hidden p-2 flex items-center justify-center">
                  <img
                    src={saint.imageUrl}
                    alt={saint.name}
                    className="w-full h-full object-cover object-top rounded-2xl transition duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Detalhes do Card */}
                <div className="p-3 bg-[#FFFDF7] flex-1 flex flex-col justify-between border-t border-[#DEC9B0]">
                  <div>
                    <h3 className="text-xs font-black text-[#4A2E16] line-clamp-1">
                      {saint.name}
                    </h3>
                    <p className="text-[10px] text-[#A66E28] font-bold line-clamp-1 mt-0.5">
                      {saint.title}
                    </p>
                  </div>
                  <span className="text-[10px] text-[#7A4F26] font-bold mt-2 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Toque para abrir!
                  </span>
                </div>
              </div>
            );
          }

          // Card Silhueta / Não Descoberto
          return (
            <div
              key={saint.id}
              className="relative bg-[#F4E6D4]/80 border-2 border-dashed border-[#CFAF88] rounded-3xl p-4 flex flex-col items-center justify-center text-center h-48 shadow-inner"
            >
              <div className="absolute top-2 left-2 bg-[#EEDCC7] px-2 py-0.5 rounded-full text-[10px] font-black text-[#7A4F26] border border-[#D5BEA1]">
                #{String(index + 1).padStart(2, '0')}
              </div>

              <div className="w-16 h-16 rounded-full bg-[#E8D4BE] border-2 border-[#D5BEA1] flex items-center justify-center mb-2 shadow-sm">
                <HelpCircle className="w-8 h-8 text-[#A67E5B] animate-pulse" />
              </div>

              <span className="text-sm font-black text-[#8C6847]">
                ???
              </span>
              <span className="text-[10px] font-bold text-[#A88563] mt-0.5">
                Ainda não encontrado
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
