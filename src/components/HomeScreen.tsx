import React, { useState } from 'react';
import { Sparkles, Play, ShieldAlert, Church } from 'lucide-react';
import { PlayerProfile } from '../types/saint';

interface HomeScreenProps {
  existingProfile: PlayerProfile | null;
  onStart: (name: string) => void;
  onContinue: () => void;
  onOpenCatechist: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  existingProfile,
  onStart,
  onContinue,
  onOpenCatechist,
}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, digite seu nome ou apelido!');
      return;
    }
    setError('');
    onStart(name.trim());
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-4 py-6 max-w-md mx-auto select-none">
      {/* Moldura / Card Principal de Entrada */}
      <div className="w-full bg-[#FFFDF7] rounded-[32px] border-4 border-[#CFAF88] shadow-2xl p-6 flex flex-col justify-between my-auto">
        
        {/* Header com Brasão Oficial da Igreja Menino Deus */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Brasão da Igreja Menino Deus"
              className="h-32 object-contain drop-shadow-[0_8px_20px_rgba(207,175,136,0.5)] transition-transform hover:scale-105"
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEDCC7] border-2 border-[#CBB08E] text-[#5C3B1E] text-[11px] font-black tracking-wide uppercase mb-1 shadow-sm">
            <span>✝</span> Igreja Menino Deus • RJ Centro
          </div>

          <h1 className="text-4xl font-black text-[#A66E28] tracking-tight uppercase drop-shadow-[0_2px_0_#FFF3D1] mt-1">
            CatholicGO
          </h1>
          <p className="text-[#70461E] text-xs mt-0.5 flex items-center gap-1 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            A Jornada dos Santos e Santas da Igreja
          </p>
        </div>

        {/* Card de Boas-Vindas ou Formulário */}
        <div className="my-6">
          {existingProfile ? (
            <div className="space-y-4 text-center">
              <div className="p-4 bg-[#F7ECE0] border-2 border-[#DEC9B0] rounded-2xl shadow-sm">
                <span className="text-[11px] text-[#8C531B] uppercase tracking-wider font-black block">
                  Jornada em Andamento
                </span>
                <h3 className="text-xl font-black text-[#4A2E16] mt-1">
                  Olá, {existingProfile.name}! 👋
                </h3>
                <p className="text-xs text-[#7A4F26] mt-1 font-medium">
                  Você já encontrou {existingProfile.discoveredSaintIds.length} santos no seu álbum.
                </p>
              </div>

              <button
                onClick={onContinue}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-[#4A2E16] font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-amber-900/15 border-2 border-[#DEC9B0] transition active:scale-95"
              >
                <Play className="w-5 h-5 fill-[#4A2E16]" />
                Continuar Jornada
              </button>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setName('');
                    onStart('Novo Explorador');
                  }}
                  className="text-xs text-[#8C531B] hover:text-[#5C3B1E] font-bold underline"
                >
                  Trocar de jogador ou reiniciar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="playerName" className="block text-xs font-black text-[#683F1A] uppercase tracking-wider mb-2">
                  Qual é o seu nome, explorador(a)?
                </label>
                <input
                  id="playerName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Gabriel, Maria..."
                  maxLength={24}
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#FDF9F3] border-2 border-[#D8BE9E] text-[#4A2E16] placeholder-[#9E7F60] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition shadow-inner"
                />
                {error && (
                  <p className="text-rose-600 text-xs mt-2 flex items-center gap-1 font-bold">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-[#4A2E16] font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-amber-900/15 border-2 border-[#DEC9B0] transition active:scale-95"
              >
                <Play className="w-5 h-5 fill-[#4A2E16]" />
                Começar Aventura!
              </button>
            </form>
          )}
        </div>

        {/* Rodapé: Painel do Catequista */}
        <div className="text-center pt-2">
          <button
            onClick={onOpenCatechist}
            className="text-xs text-[#5C3B1E] hover:text-[#4A2E16] font-bold py-2 px-4 rounded-xl bg-[#EEDCC7] hover:bg-[#E3CCB2] border-2 border-[#CBB08E] transition shadow-sm inline-flex items-center gap-1.5"
          >
            <Church className="w-3.5 h-3.5" />
            Área do Catequista (Gerar e Imprimir Códigos)
          </button>
        </div>
      </div>
    </div>
  );
};
