import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Camera, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { getAllSaints } from '../services/storage';
import { DEV_MODE } from '../config';

interface CameraScreenProps {
  onScanSuccess: (decodedText: string) => void;
  onBack: () => void;
}

export const CameraScreen: React.FC<CameraScreenProps> = ({
  onScanSuccess,
  onBack,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [testCode, setTestCode] = useState('');
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const startScanner = async () => {
    setCameraError(null);
    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode('qr-reader-container');
      }

      await scannerRef.current.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          stopScanner();
          onScanSuccess(decodedText);
        },
        () => {
          // Ignora leituras parciais
        }
      );
      setIsScanning(true);
    } catch (err: any) {
      console.warn('Erro ao inicializar câmera:', err);
      setCameraError(
        DEV_MODE
          ? 'Não foi possível acessar a câmera. Verifique se deu permissão ou use o modo simulação abaixo.'
          : 'Não foi possível acessar a câmera. Verifique se concedeu permissão nas configurações do navegador.'
      );
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      try {
        await scannerRef.current.stop();
      } catch (err) {
        console.error('Erro ao parar scanner:', err);
      }
    }
    setIsScanning(false);
  };

  useEffect(() => {
    startScanner();
    return () => {
      stopScanner();
    };
  }, []);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (testCode.trim()) {
      stopScanner();
      onScanSuccess(testCode.trim());
    }
  };

  return (
    <div className="min-h-screen bg-[#E5CDB2] text-[#4A2E16] font-sans flex flex-col justify-between p-2 sm:p-4 select-none">
      <div className="w-full max-w-md mx-auto bg-[#FFFDF7] rounded-[32px] border-4 border-[#CFAF88] shadow-2xl p-4 sm:p-5 flex flex-col justify-between min-h-[92vh]">
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => {
                stopScanner();
                onBack();
              }}
              className="w-10 h-10 rounded-2xl bg-[#EEDCC7] hover:bg-[#E3CCB2] border-2 border-[#CBB08E] flex items-center justify-center text-[#5C3B1E] shadow-sm transition active:scale-90"
              title="Voltar ao mapa"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            <h2 className="text-xl font-black text-[#A66E28] tracking-tight uppercase flex items-center gap-2 drop-shadow-[0_1px_0_#FFF3D1]">
              <Camera className="w-5 h-5 text-amber-600" />
              Lente do Explorador
            </h2>

            <div className="w-10" />
          </div>

          <p className="text-xs text-center text-[#7A4F26] font-semibold mb-3">
            Aponte para o QR Code espalhado pela igreja para capturar!
          </p>
        </div>

        {/* Viewfinder da Câmera */}
        <div className="relative w-full aspect-square bg-[#1E1711] rounded-3xl overflow-hidden border-4 border-[#C8A265] shadow-xl flex items-center justify-center my-auto">
          {/* Contêiner da biblioteca Html5Qrcode */}
          <div id="qr-reader-container" className="w-full h-full object-cover"></div>

          {/* Retículo do visor animado */}
          {isScanning && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-56 h-56 border-2 border-amber-300 rounded-2xl relative animate-pulse">
                <div className="absolute -top-2 -left-2 w-7 h-7 border-t-4 border-l-4 border-amber-400 rounded-tl-xl"></div>
                <div className="absolute -top-2 -right-2 w-7 h-7 border-t-4 border-r-4 border-amber-400 rounded-tr-xl"></div>
                <div className="absolute -bottom-2 -left-2 w-7 h-7 border-b-4 border-l-4 border-amber-400 rounded-bl-xl"></div>
                <div className="absolute -bottom-2 -right-2 w-7 h-7 border-b-4 border-r-4 border-amber-400 rounded-br-xl"></div>
              </div>
            </div>
          )}

          {/* Estado sem câmera ativa */}
          {!isScanning && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#2B1B10]/90 backdrop-blur-sm z-10 text-white">
              {cameraError ? (
                <>
                  <AlertCircle className="w-12 h-12 text-amber-400 mb-2" />
                  <p className="text-xs text-amber-200 mb-4 leading-relaxed font-medium">
                    {cameraError}
                  </p>
                  <button
                    onClick={startScanner}
                    className="px-4 py-2.5 rounded-2xl bg-[#EEDCC7] text-[#5C3B1E] border-2 border-[#CBB08E] font-black text-xs flex items-center gap-1.5 shadow"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Tentar Novamente
                  </button>
                </>
              ) : (
                <button
                  onClick={startScanner}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-[#4A2E16] font-black text-sm flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition"
                >
                  <Camera className="w-5 h-5" />
                  Ativar Câmera
                </button>
              )}
            </div>
          )}
        </div>

        {/* Modo Simulação / Teste Rápido (Apenas com DEV_MODE ativo) */}
        {DEV_MODE && (
          <div className="mt-4 bg-[#F7ECE0] border-2 border-[#DEC9B0] rounded-2xl p-3 shadow-sm">
            <span className="text-[11px] font-black text-[#7A4F26] uppercase tracking-wider block mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Simulador de Captura (Teste Rápido)
            </span>
            <form onSubmit={handleManualSubmit} className="flex gap-2">
              <select
                value={testCode}
                onChange={(e) => setTestCode(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-[#D5BEA1] text-[#4A2E16] font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Selecione um Santo para coletar...</option>
                {getAllSaints().map((saint) => (
                  <option key={saint.id} value={saint.code}>
                    {saint.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                disabled={!testCode}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs flex items-center gap-1 shadow disabled:opacity-40 active:scale-95 transition"
              >
                Coletar 📦
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
