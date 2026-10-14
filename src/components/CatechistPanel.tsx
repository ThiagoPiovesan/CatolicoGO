import React, { useState } from 'react';
import { ArrowLeft, Printer, Plus, X, Sparkles, Church } from 'lucide-react';
import { Saint } from '../types/saint';
import { getAllSaints, addCustomSaint } from '../services/storage';

interface CatechistPanelProps {
  onBack: () => void;
}

export const CatechistPanel: React.FC<CatechistPanelProps> = ({ onBack }) => {
  const [saints, setSaints] = useState<Saint[]>(getAllSaints());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state para cadastrar novo santo
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [feastDay, setFeastDay] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [patronage, setPatronage] = useState('');
  const [biography, setBiography] = useState('');
  const [curiosity1, setCuriosity1] = useState('');
  const [curiosity2, setCuriosity2] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handlePrint = () => {
    window.print();
  };

  const handleCreateSaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Gera ID e código amigáveis (ex: "sao-tarcisio")
    const generatedId = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const newSaint: Saint = {
      id: generatedId,
      code: generatedId,
      name: name.trim(),
      title: title.trim() || 'Servo de Deus',
      subtitle: title.trim().toUpperCase() || 'AMIGO DE DEUS',
      feastDay: feastDay.trim() || 'Durante o ano',
      birthDate: birthDate.trim() || 'Desconhecido',
      deathDate: deathDate.trim() || 'Desconhecido',
      patronage: patronage.trim() || 'Geral',
      category: 'padroeiro',
      accentColor: 'from-amber-500 to-yellow-600',
      summary: title.trim() || name.trim(),
      whoAmI: `Sou ${name.trim()}, exemplo de fé e amor a Jesus!`,
      specialDates: `Festa litúrgica em ${feastDay.trim() || 'dia especial'}.`,
      whatITeach: `Amar a Deus e fazer o bem a todas as pessoas.`,
      biography: biography.trim() || 'Biografia do Santo a ser preenchida.',
      imageUrl:
        imageUrl.trim() ||
        '/imagesSaints/SaoJose.jpeg',
      curiosities: [curiosity1.trim(), curiosity2.trim()].filter(Boolean),
    };

    const updated = addCustomSaint(newSaint);
    setSaints(updated);
    setIsModalOpen(false);

    // Limpa campos
    setName('');
    setTitle('');
    setFeastDay('');
    setBirthDate('');
    setDeathDate('');
    setPatronage('');
    setBiography('');
    setCuriosity1('');
    setCuriosity2('');
    setImageUrl('');
  };

  return (
    <div className="min-h-screen px-4 py-6 max-w-2xl mx-auto pb-16 select-none">
      {/* Top Header (escondido na impressão) */}
      <div className="print:hidden flex items-center justify-between mb-5 gap-2">
        <button
          onClick={onBack}
          className="px-3.5 py-2 rounded-2xl bg-[#EEDCC7] hover:bg-[#E3CCB2] border-2 border-[#CBB08E] text-[#5C3B1E] font-black transition active:scale-95 flex items-center gap-1.5 text-xs shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          Voltar ao Jogo
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-2 rounded-2xl bg-[#EEDCC7] hover:bg-[#E3CCB2] border-2 border-[#CBB08E] text-[#5C3B1E] font-black transition active:scale-95 flex items-center gap-1.5 text-xs shadow-sm"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Novo Santo
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-[#4A2E16] font-black transition active:scale-95 flex items-center gap-1.5 text-xs shadow-md border-2 border-[#DEC9B0]"
          >
            <Printer className="w-4 h-4 stroke-[2.5]" />
            Imprimir Cartões
          </button>
        </div>
      </div>

      {/* Cabeçalho da Paróquia (escondido na impressão) */}
      <div className="print:hidden bg-[#FFFDF7] border-4 border-[#CFAF88] rounded-3xl p-4 mb-6 shadow-lg flex items-center gap-4">
        <img
          src="/logo.png"
          alt="Brasão Igreja Menino Deus"
          className="h-16 object-contain drop-shadow"
        />
        <div>
          <span className="text-[11px] font-black text-[#A66E28] uppercase tracking-wide flex items-center gap-1">
            <Church className="w-3.5 h-3.5" /> Igreja Menino Deus • RJ Centro
          </span>
          <h2 className="text-base font-black text-[#4A2E16]">
            Painel do Catequista
          </h2>
          <p className="text-xs text-[#7A4F26] mt-0.5 font-bold">
            Gerencie e imprima os cartões com QR Code para espalhar pela paróquia.
          </p>
        </div>
      </div>

      {/* Grid de Cartões para Impressão */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:grid-cols-2 print:gap-6 print:text-black">
        {saints.map((saint) => {
          const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
            saint.code
          )}&margin=10`;

          return (
            <div
              key={saint.id}
              className="bg-white text-slate-900 border-2 border-dashed border-[#C8A265] rounded-3xl p-4 flex flex-col items-center text-center shadow-md print:shadow-none print:break-inside-avoid print:border-black"
            >
              {/* Header do Cartão com Brasão Oficial da Igreja */}
              <div className="flex items-center gap-2 mb-1">
                <img
                  src="/logo.png"
                  alt="Brasão"
                  className="h-9 object-contain"
                />
                <div className="text-left leading-tight">
                  <span className="text-[10px] uppercase tracking-wider font-black text-[#8C531B] print:text-black block">
                    Igreja Menino Deus • RJ
                  </span>
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block">
                    CatholicGO - Encontre o Santo
                  </span>
                </div>
              </div>

              <div className="w-full border-t border-[#DEC9B0] my-1"></div>

              <h3 className="text-base font-black text-[#4A2E16] mt-1 mb-1 print:text-black">
                {saint.name}
              </h3>

              {/* QR Code */}
              <div className="bg-white p-2 rounded-2xl border border-slate-200 my-1 shadow-sm">
                <img
                  src={qrUrl}
                  alt={`QR Code de ${saint.name}`}
                  className="w-36 h-36 object-contain mx-auto"
                  loading="lazy"
                />
              </div>

              <p className="text-[11px] text-[#7A4F26] font-bold italic mb-1 print:text-slate-800">
                "{saint.title}"
              </p>

              <div className="text-[10px] text-[#5C3B1E] font-mono bg-[#F7ECE0] px-2.5 py-0.5 rounded-full border border-[#DEC9B0]">
                Código: {saint.code}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de Cadastro de Novo Santo */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#2B1B10]/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FFFDF7] border-4 border-[#CFAF88] rounded-3xl p-6 max-w-lg w-full shadow-2xl relative my-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-[#A66E28] flex items-center gap-2 uppercase">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Cadastrar Novo Santo(a)
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-[#EEDCC7] border border-[#CBB08E] flex items-center justify-center text-[#5C3B1E] hover:bg-[#E3CCB2]"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            <form onSubmit={handleCreateSaint} className="space-y-3 text-xs">
              <div>
                <label className="block font-black text-[#683F1A] uppercase tracking-wide mb-1">
                  Nome do Santo(a) *
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: São Bento, Santa Rita..."
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FDF9F3] border-2 border-[#D8BE9E] text-[#4A2E16] font-bold focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-black text-[#683F1A] uppercase tracking-wide mb-1">
                    Título / Epíteto
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Pai dos Monges"
                    className="w-full px-3 py-2 rounded-xl bg-[#FDF9F3] border-2 border-[#D8BE9E] text-[#4A2E16] font-bold focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-black text-[#683F1A] uppercase tracking-wide mb-1">
                    Festa Litúrgica
                  </label>
                  <input
                    type="text"
                    value={feastDay}
                    onChange={(e) => setFeastDay(e.target.value)}
                    placeholder="Ex: 11 de Julho"
                    className="w-full px-3 py-2 rounded-xl bg-[#FDF9F3] border-2 border-[#D8BE9E] text-[#4A2E16] font-bold focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-black text-[#683F1A] uppercase tracking-wide mb-1">
                    Nascimento
                  </label>
                  <input
                    type="text"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    placeholder="Ex: 480 d.C."
                    className="w-full px-3 py-2 rounded-xl bg-[#FDF9F3] border-2 border-[#D8BE9E] text-[#4A2E16] font-bold focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-black text-[#683F1A] uppercase tracking-wide mb-1">
                    Falecimento
                  </label>
                  <input
                    type="text"
                    value={deathDate}
                    onChange={(e) => setDeathDate(e.target.value)}
                    placeholder="Ex: 547 d.C."
                    className="w-full px-3 py-2 rounded-xl bg-[#FDF9F3] border-2 border-[#D8BE9E] text-[#4A2E16] font-bold focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-black text-[#683F1A] uppercase tracking-wide mb-1">
                  Padroeiro(a) de:
                </label>
                <input
                  type="text"
                  value={patronage}
                  onChange={(e) => setPatronage(e.target.value)}
                  placeholder="Ex: Estudantes, Europa, proteção contra o mal"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FDF9F3] border-2 border-[#D8BE9E] text-[#4A2E16] font-bold focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-black text-[#683F1A] uppercase tracking-wide mb-1">
                  História e Vida
                </label>
                <textarea
                  rows={3}
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                  placeholder="Breve história sobre o santo para as crianças..."
                  className="w-full px-3 py-2 rounded-xl bg-[#FDF9F3] border-2 border-[#D8BE9E] text-[#4A2E16] font-bold focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-black text-[#683F1A] uppercase tracking-wide mb-1">
                    Curiosidade 1
                  </label>
                  <input
                    type="text"
                    value={curiosity1}
                    onChange={(e) => setCuriosity1(e.target.value)}
                    placeholder="Ex: Tinha um corvo amigo"
                    className="w-full px-3 py-2 rounded-xl bg-[#FDF9F3] border-2 border-[#D8BE9E] text-[#4A2E16] font-bold focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-black text-[#683F1A] uppercase tracking-wide mb-1">
                    Curiosidade 2
                  </label>
                  <input
                    type="text"
                    value={curiosity2}
                    onChange={(e) => setCuriosity2(e.target.value)}
                    placeholder="Ex: Criou a Regra Beneditina"
                    className="w-full px-3 py-2 rounded-xl bg-[#FDF9F3] border-2 border-[#D8BE9E] text-[#4A2E16] font-bold focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-black text-[#683F1A] uppercase tracking-wide mb-1">
                  URL da Imagem ou caminho (/imagesSaints/arquivo.jpg)
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="/imagesSaints/saoBento.jpg ou https://..."
                  className="w-full px-3 py-2 rounded-xl bg-[#FDF9F3] border-2 border-[#D8BE9E] text-[#4A2E16] font-bold focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-2xl bg-[#EEDCC7] text-[#5C3B1E] font-black border border-[#CBB08E]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 text-[#4A2E16] font-black shadow-md border-2 border-[#DEC9B0]"
                >
                  Salvar Santo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
