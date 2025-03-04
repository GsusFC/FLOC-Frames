'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { getRandomWord } from '@/lib/flag-system/dictionary';
import { letterToFlag } from '@/lib/flag-system/flagMap';
import FlagCanvas from './FlagCanvas';

export default function FlagGenerator() {
  const [word, setWord] = useState('');
  const [generatedWord, setGeneratedWord] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRandomWord, setIsRandomWord] = useState(false);
  const [maxLength, setMaxLength] = useState(6);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Handle random word generation
  const handleRandomWord = () => {
    setIsGenerating(true);
    // Get a word with the specified length
    const randomWord = getRandomWord(maxLength);
    setIsRandomWord(true);
    
    // Animate the generation process
    let i = 0;
    const interval = setInterval(() => {
      setGeneratedWord(randomWord.substring(0, i + 1));
      i++;
      if (i === randomWord.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 150);
  };
  
  // Handle user input with focus preservation
  const inputRef = useRef<HTMLInputElement>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Limit to max characters, only letters
    const value = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase().substring(0, maxLength);
    setWord(value);
    setGeneratedWord(value);
    setIsRandomWord(false); // Usuario ingresó texto manualmente
    
    // Preserva el foco del input después de la actualización
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  // Handle max length change
  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLength = parseInt(e.target.value);
    setMaxLength(newLength);
    // Actualizar también la palabra actual si excede el nuevo límite
    if (word.length > newLength) {
      const newWord = word.substring(0, newLength);
      setWord(newWord);
      setGeneratedWord(newWord);
    }
  };
  
  // Export the canvas as SVG
  const exportImage = () => {
    if (!generatedWord) return;
    
    // SVG dimensions
    const width = 1000;
    const height = 1000;
    
    // Create SVG content
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <!-- Black background -->
      <rect width="${width}" height="${height}" fill="black" />`;
      
    // Add the flags in the center
    const flagHeight = 80; // Using the same height as in FlagCanvas
    const totalWidth = generatedWord.length * flagHeight; // Assuming square flags for simplicity
    let xPosition = (width - totalWidth) / 2;
    
    // Add each flag
    for (let i = 0; i < generatedWord.length; i++) {
      const letter = generatedWord[i];
      const flag = letterToFlag(letter);
      
      if (flag) {
        // Use image reference to external SVG for each flag
        svgContent += `
        <image 
          x="${xPosition}" 
          y="${(height - flagHeight) / 2}" 
          width="${flagHeight}" 
          height="${flagHeight}" 
          href="${flag.flagPath}"
        />`;
        
        xPosition += flagHeight;
      }
    }
    
    // Add the word at the bottom if it's a random word
    if (isRandomWord) {
      svgContent += `
      <text 
        x="${width/2}" 
        y="${height - 20}" 
        font-family="Druk Text Wide Heavy, system-ui" 
        font-size="48" 
        font-weight="bold"
        text-anchor="middle" 
        fill="white" 
        letter-spacing="0.05em"
      >${generatedWord}</text>`;
    }
    
    // Add FLAG SYSTEM signature
    svgContent += `
      <text 
        x="${width - 10}" 
        y="${height - 10}" 
        font-family="monospace" 
        font-size="16" 
        text-anchor="end" 
        fill="#333333"
      >FLAG SYSTEM</text>
    </svg>`;
    
    // Create blob and download
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `flag-word-${generatedWord.toLowerCase()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Notify the user
    alert('Imagen SVG exportada con dimensiones 1000x1000px y fondo negro.');
  };

  const Controls = () => (
    <div className="w-full bg-black/50 backdrop-blur-sm rounded-lg p-6">
      <div className="flex flex-col gap-6">
        {/* Word Input */}
        <div className="w-full">
          <label className="block mb-2 text-sm font-mono text-white/60">CREAR PALABRA (MAX {maxLength} LETRAS)</label>
          <input 
            ref={inputRef}
            type="text" 
            className="w-full bg-black border border-white/20 rounded-md py-3 px-4 text-xl font-mono uppercase tracking-wider focus:border-[#00ff00] focus:outline-none" 
            placeholder="AAA..." 
            value={word}
            onChange={handleInputChange}
          />
        </div>
        
        {/* Random Generator */}
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={handleRandomWord}
            disabled={isGenerating}
            className="px-6 py-3 bg-[#00ff00] text-black font-mono uppercase tracking-wider disabled:opacity-50 hover:brightness-110 transition-all duration-300"
          >
            {isGenerating ? 'GENERANDO...' : 'PALABRA ALEATORIA'}
          </button>
          
          <button 
            disabled={!generatedWord} 
            onClick={exportImage}
            className="px-6 py-3 bg-white/10 border border-white/20 text-white font-mono uppercase tracking-wider disabled:opacity-30 hover:bg-white/20 transition-all duration-300"
          >
            EXPORTAR SVG
          </button>
        </div>
        
        {/* Length Controller */}
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
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      {/* Two-column layout for canvas and controls */}
      <div className="w-full max-w-8xl flex flex-col lg:flex-row gap-8 mb-8">
        {/* Left column: Canvas - Aseguramos relación 1:1 con aspect-square */}
        <div 
          className="w-full lg:w-2/3 flex justify-center"
          ref={canvasRef}
          style={{ maxWidth: "min(66.66%, -200px + 100vh)", opacity: 1, transform: "none" }}
        >
          <div className="w-full aspect-square">
            <FlagCanvas word={generatedWord} isRandom={isRandomWord} />
          </div>
        </div>
        
        {/* Right column: Controls */}
        <div className="w-full lg:w-1/3">
          <Controls />
        </div>
      </div>
    </div>
  );
}
