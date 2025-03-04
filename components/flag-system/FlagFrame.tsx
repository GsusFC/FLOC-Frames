'use client';

import { useEffect, useState, useCallback } from "react";
import sdk from "@farcaster/frame-sdk";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { config } from "@/components/providers/WagmiProvider";
import { getRandomWord } from "@/lib/flag-system/dictionary";
import FlagGridV2 from "./FlagGridV2";

// Define FrameContext interface
interface FrameContext {
  fid?: number;
  url?: string;
  messageHash?: string;
  timestamp?: number;
  network?: number;
  buttonIndex?: number;
  inputText?: string;
  castId?: {
    fid: number;
    hash: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default function FlagFrame() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<FrameContext | undefined>();
  const [word, setWord] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#000000');

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();

  // Colores disponibles para el fondo
  const backgroundColors = [
    '#ff0000', // Rojo
    '#0000ff', // Azul
    '#00ff00', // Verde
    '#000000', // Negro
    '#ffffff', // Blanco
  ];

  // Inicializar el SDK y cargar el contexto
  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      sdk.actions.ready();
    };

    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  // Generar una palabra aleatoria
  const generateRandomWord = useCallback(() => {
    const randomWord = getRandomWord(6); // Limitar a 6 caracteres para el frame
    setWord(randomWord);
  }, []);

  // Cambiar el color de fondo
  const changeBackgroundColor = useCallback(() => {
    let newColor;
    do {
      const randomIndex = Math.floor(Math.random() * backgroundColors.length);
      newColor = backgroundColors[randomIndex];
    } while (newColor === backgroundColor && backgroundColors.length > 1);
    
    setBackgroundColor(newColor);
  }, [backgroundColor, backgroundColors]);

  // Abrir el visualizador completo en una nueva ventana
  const openFullVisualizer = useCallback(() => {
    sdk.actions.openUrl(`${window.location.origin}/flag-system-v2?word=${word}`);
  }, [word]);

  // Manejar la conexión/desconexión de wallet con manejo de errores
  const handleWalletConnection = useCallback(() => {
    try {
      if (isConnected) {
        disconnect();
      } else {
        // Intenta conectar con manejo de errores
        connect({ connector: config.connectors[0] });
      }
    } catch (error: unknown) {
      console.error("Error en la gestión de wallet:", error);
      alert("No se pudo interactuar con la wallet. Posiblemente no hay un proveedor disponible.");
    }
  }, [isConnected, connect, disconnect]);

  // Compartir la bandera generada como NFT (simulado)
  const shareAsNFT = useCallback(() => {
    // Aquí podríamos implementar una función para mintear como NFT
    // Por ahora, solo mostraremos un mensaje
    alert("¡Esta funcionalidad estaría disponible en la implementación completa!");
  }, []);

  // Determinar si el texto debe ser oscuro o claro según el color de fondo
  const isDarkText = backgroundColor === '#ffffff';

  if (!isSDKLoaded) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center p-2">
      <div className="mb-4 w-full">
        <h1 className="text-2xl font-bold text-center">Sistema de Banderas Náuticas</h1>
        
        {address && (
          <div className="text-center text-sm mt-2">
            Conectado: {address.substring(0, 6)}...{address.substring(address.length - 4)}
          </div>
        )}
      </div>

      {/* Área de visualización de banderas */}
      <div 
        className="w-full aspect-square relative flex items-center justify-center rounded-lg mb-4 overflow-hidden"
        style={{ 
          background: backgroundColor,
          maxWidth: "250px",
          maxHeight: "250px" 
        }}
      >
        {word ? (
          <FlagGridV2 text={word} />
        ) : (
          <div className="text-center p-4">
            <span className={`${isDarkText ? 'text-black' : 'text-white'} font-mono text-sm`}>
              Genera una palabra para ver las banderas
            </span>
          </div>
        )}
        
        {word && (
          <div className="absolute bottom-2 w-full text-center">
            <span className={`${isDarkText ? 'text-black' : 'text-white'} font-mono text-xl font-bold tracking-wider`}>
              {word}
            </span>
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col gap-2 w-full max-w-[250px]">
        <button
          onClick={generateRandomWord}
          className="px-4 py-2 bg-[#00ff00] text-black font-mono text-sm uppercase tracking-wider hover:brightness-110 transition-all duration-300"
        >
          Generar Palabra
        </button>
        
        <button
          onClick={changeBackgroundColor}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-mono text-sm uppercase tracking-wider transition-all duration-300"
        >
          Cambiar Fondo
        </button>
        
        <button
          onClick={openFullVisualizer}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white font-mono text-sm uppercase tracking-wider transition-all duration-300"
        >
          Ver Completo
        </button>
        
        <button
          onClick={handleWalletConnection}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white font-mono text-sm uppercase tracking-wider transition-all duration-300"
        >
          {isConnected ? "Desconectar Wallet" : "Conectar Wallet"}
        </button>
        
        {isConnected && (
          <button
            onClick={shareAsNFT}
            className="px-4 py-2 bg-pink-500 hover:bg-pink-400 text-white font-mono text-sm uppercase tracking-wider transition-all duration-300"
          >
            Compartir como NFT
          </button>
        )}
        
        {/* Mensaje informativo para entorno de desarrollo */}
        <div className="mt-4 text-xs text-gray-400 text-center">
          Nota: La funcionalidad completa de wallet requiere un proveedor web3 instalado.
          <br />
          En entorno de desarrollo, algunas características podrían no estar disponibles.
        </div>
      </div>
    </div>
  );
}
