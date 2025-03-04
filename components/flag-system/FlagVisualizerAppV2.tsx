'use client';

import React, { useState, useRef, useEffect } from 'react';
import { getRandomWord } from '@/lib/flag-system/dictionary';
import { letterToFlag } from '@/lib/flag-system/flagMap';
import FlagGridV2 from './FlagGridV2';


// Componente personalizado para mostrar las banderas en el canvas usando FlagGridV2
const FlagDisplayV2 = ({ word, backgroundColor }: { word: string, backgroundColor: string }) => {
  // Determinar si el texto debe ser oscuro o claro según el color de fondo
  const isDarkText = backgroundColor === '#ffffff'; // Solo usamos texto oscuro con fondo blanco
  if (!word) {
    return (
      <div className="jsx-9109bf176d795fa9 text-center p-8">
        <span className="jsx-9109bf176d795fa9 text-white/60 font-mono text-xl block">
          Ingresa o genera una palabra para visualizar las banderas
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <FlagGridV2 text={word} />
      
      {/* Palabra en el borde inferior */}
      <div className="absolute bottom-4 w-full text-center">
        <span className={`${isDarkText ? 'text-black' : 'text-white'} font-mono text-4xl font-bold tracking-wider`}>
          {word}
        </span>
      </div>
    </div>
  );
};

// Tipo para almacenar los contenidos SVG de banderas
interface SvgContent {
  [key: string]: string;
}

export default function FlagVisualizerAppV2() {
  const [word, setWord] = useState('');
  const [maxLength, setMaxLength] = useState(6);
  const [isGenerating, setIsGenerating] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#000000'); // Color inicial: negro
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Objeto para almacenar el contenido SVG de cada bandera
  const [svgContents, setSvgContents] = useState<SvgContent>({});
  
  // Cargar contenido SVG de banderas al inicio
  useEffect(() => {
    // Esta función se ejecutará en el cliente
    const loadSvgContents = async () => {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const loadedContents: SvgContent = {};
      
      for (const letter of alphabet) {
        const flagData = letterToFlag(letter);
        if (flagData && flagData.flagPath) {
          try {
            const response = await fetch(flagData.flagPath);
            const svgText = await response.text();
            
            // Extraer el contenido dentro del tag svg 
            const contentMatch = svgText.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
            const content = contentMatch ? contentMatch[1] : '';
            
            loadedContents[letter] = content;
          } catch (error) {
            console.error(`Error loading SVG for ${letter}:`, error);
          }
        }
      }
      
      setSvgContents(loadedContents);
    };
    
    loadSvgContents();
  }, []);
  
  // Colores disponibles para el fondo
  const backgroundColors = [
    '#ff0000', // Rojo
    '#0000ff', // Azul
    '#00ff00', // Verde
    '#000000', // Negro
    '#ffffff', // Blanco
  ];
  
  // Manejar entrada del usuario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Limitar a máximo de caracteres, solo letras
    const value = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase().substring(0, maxLength);
    setWord(value);
  };

  // Manejar generación de palabra aleatoria
  const handleRandomWord = () => {
    setIsGenerating(true);
    // Obtener palabra con la longitud especificada
    const randomWord = getRandomWord(maxLength);
    
    // Animar el proceso de generación
    let i = 0;
    const interval = setInterval(() => {
      setWord(randomWord.substring(0, i + 1));
      i++;
      if (i === randomWord.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 150);
  };

  // Manejar cambio de longitud máxima
  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLength = parseInt(e.target.value);
    setMaxLength(newLength);
    // Actualizar también la palabra actual si excede el nuevo límite
    if (word.length > newLength) {
      setWord(word.substring(0, newLength));
    }
  };
  
  // Manejar cambio aleatorio de color de fondo
  const handleRandomBackgroundColor = () => {
    // Seleccionar un color aleatorio diferente al actual
    let newColor;
    do {
      const randomIndex = Math.floor(Math.random() * backgroundColors.length);
      newColor = backgroundColors[randomIndex];
    } while (newColor === backgroundColor && backgroundColors.length > 1);
    
    setBackgroundColor(newColor);
  };
  
  // Exportar como SVG con elementos SVG nativos
  const handleExport = () => {
    if (!word) return;
    
    // Dimensiones del SVG
    const width = 1000;
    const height = 1000;
    
    // Crear contenido SVG - con la nueva disposición de grid para V2
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <!-- Fondo con el color actual -->
      <rect width="${width}" height="${height}" fill="${backgroundColor}" />`;
      
    // Calcular la distribución en grid basada en la cantidad de letras
    const calculateGrid = (length: number) => {
      if (length <= 2) return { cols: length, rows: 1 };
      const cols = 2;
      const fullRows = Math.floor(length / 2);
      const hasOddItem = length % 2 !== 0;
      return { cols, rows: fullRows + (hasOddItem ? 1 : 0), hasOddItem };
    };
    
    const grid = calculateGrid(word.length);
    
    // Tamaño de cada bandera
    const flagSize = 100;
    
    // Calcular el espacio total que ocupará la cuadrícula
    const gridWidth = grid.cols * flagSize;
    const gridHeight = grid.rows * flagSize;
    
    // Posición inicial (centrado)
    const startX = (width - gridWidth) / 2;
    const startY = (height - gridHeight) / 2;
    
    // Añadir cada bandera como elementos SVG nativos
    word.split('').forEach((letter, index) => {
      // Calcular la posición en la cuadrícula
      const isLastOddItem = grid.hasOddItem && index === word.length - 1;
      
      let row, col;
      if (isLastOddItem) {
        // La última letra en palabras con longitud impar va centrada en la última fila
        row = grid.rows - 1;
        col = 0;
      } else {
        row = Math.floor(index / grid.cols);
        col = index % grid.cols;
      }
      
      let x = startX + col * flagSize;
      const y = startY + row * flagSize;
      
      // Alinear la última letra a la izquierda para impar
      if (isLastOddItem) {
        x = startX;
      }
      
      // Obtener el contenido SVG para esta letra
      const svgContent4Letter = svgContents[letter];
      
      if (svgContent4Letter) {
        // Crear un grupo (<g>) para esta bandera con la transformación adecuada
        // Cambiamos scale(1/10) para ajustar el viewBox de 1080x1080
        svgContent += `
        <g transform="translate(${x}, ${y}) scale(${flagSize/1080})">
          ${svgContent4Letter}
        </g>`;
      } else {
        // Fallback si no tenemos el contenido SVG
        const flagData = letterToFlag(letter);
        const flagPath = flagData ? flagData.flagPath : '';
        
        if (flagPath) {
          svgContent += `
          <image 
            x="${x}" 
            y="${y}" 
            width="${flagSize}" 
            height="${flagSize}" 
            href="${flagPath}"
          />`;
        }
      }
    });
    
    // Añadir el texto de la palabra alineado al centro en el borde inferior
    // Con color adaptado al fondo
    const textColor = backgroundColor === '#ffffff' ? '#000000' : '#ffffff';
    svgContent += `
    <text 
      x="${width/2}" 
      y="${height - 20}" 
      font-family="monospace" 
      font-size="48" 
      font-weight="bold"
      text-anchor="middle" 
      fill="${textColor}" 
      letter-spacing="0.1em"
    >${word}</text>`;
    
    // Añadir marca FLAG SYSTEM V2
    svgContent += `
      <text 
        x="${width - 20}" 
        y="${height - 10}" 
        font-family="monospace" 
        font-size="12" 
        text-anchor="end" 
        fill="#333333"
      >FLAG SYSTEM V2</text>
    </svg>`;
    
    // Crear blob y descargar
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `flag-word-v2-${word.toLowerCase()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-8xl flex flex-col lg:flex-row gap-8 mb-8 text-white">
      {/* Área de visualización de banderas */}
      <div className="w-full lg:w-2/3 flex justify-center" style={{maxWidth: "min(66.66%, -200px + 100vh)", opacity: 1, transform: "none"}}>
        <div className="w-full aspect-square">
          <div className="flex justify-center w-full relative">
            <div 
              style={{
                width:"1000px", 
                height:"1000px", 
                background: backgroundColor, 
                position:"relative", 
                display:"flex", 
                justifyContent:"center", 
                alignItems:"center", 
                maxWidth:"100%", 
                border:"1px solid #333", 
                borderRadius:"8px", 
                overflow:"hidden", 
                boxShadow:"0 4px 30px rgba(0, 0, 0, 0.5)"
              }} 
              className="jsx-9109bf176d795fa9"
            >
              <FlagDisplayV2 word={word} backgroundColor={backgroundColor} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Panel de controles */}
      <div className="w-full lg:w-1/3">
        <div className="w-full bg-black/50 backdrop-blur-sm rounded-lg p-6">
          <div className="flex flex-col gap-6">
            {/* Entrada de texto */}
            <div className="w-full">
              <label className="block mb-2 text-sm font-mono text-white/60">CREAR PALABRA (MAX {maxLength} LETRAS)</label>
              <input
                type="text"
                className="w-full bg-black border border-white/20 rounded-md py-3 px-4 text-xl font-mono uppercase tracking-wider focus:border-[#00ff00] focus:outline-none"
                placeholder="AAA..."
                value={word}
                onChange={handleInputChange}
              />
            </div>
            
            {/* Botones de acción */}
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={handleRandomWord}
                disabled={isGenerating}
                className="px-6 py-3 bg-[#00ff00] text-black font-mono uppercase tracking-wider disabled:opacity-50 hover:brightness-110 transition-all duration-300"
              >
                {isGenerating ? 'GENERANDO...' : 'PALABRA ALEATORIA'}
              </button>
              
              <button
                disabled={!word}
                onClick={handleExport}
                className="px-6 py-3 bg-white/10 border border-white/20 text-white font-mono uppercase tracking-wider disabled:opacity-30 hover:bg-white/20 transition-all duration-300"
              >
                EXPORTAR SVG
              </button>
              
              <button
                onClick={handleRandomBackgroundColor}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-mono uppercase tracking-wider transition-all duration-300"
              >
                CAMBIAR FONDO
              </button>
            </div>
            
            {/* Control de longitud */}
            <div className="w-full border-t border-white/10 pt-4">
              <label className="block mb-2 text-sm font-mono text-white/60">LONGITUD MÁXIMA DE PALABRA</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="2"
                  max="10"
                  className="w-full accent-[#00ff00]"
                  value={maxLength}
                  onChange={handleLengthChange}
                />
                <span className="font-druk text-xl text-white">{maxLength}</span>
              </div>
            </div>
            
            {/* Características de la versión V2 */}
            <div className="w-full border-t border-white/10 pt-4">
              <h3 className="block mb-2 text-sm font-mono text-white/60">CARACTERÍSTICAS DE LA VERSIÓN V2</h3>
              <ul className="text-sm text-gray-400 list-disc pl-4 space-y-1">
                <li>Organización responsive en grid</li>
                <li>2 letras: 1 fila</li>
                <li>3 letras: 2 arriba, 1 centrada abajo</li>
                <li>4 letras: cuadrícula 2×2</li>
                <li>5+ letras: distribución optimizada</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
