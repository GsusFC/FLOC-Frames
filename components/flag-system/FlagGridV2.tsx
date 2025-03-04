'use client'

import { useRef, useEffect, useState } from 'react'
import { letterToFlag, hasFlag } from '@/lib/flag-system/flagMap'

interface FlagGridProps {
  text: string;
}

// Tipo para almacenar los contenidos SVG de banderas
interface SvgContent {
  [key: string]: string;
}

export default function FlagGridV2({ text }: FlagGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Estado para almacenar el contenido SVG de cada bandera
  const [svgContents, setSvgContents] = useState<SvgContent>({});
  
  // Cargar contenido SVG de banderas al inicio
  useEffect(() => {
    // Función para cargar contenido SVG de banderas
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

  // Elimina espacios y convierte a mayúsculas
  const cleanText = text.replace(/\s+/g, '').toUpperCase();
  
  // Función para calcular la estructura de la cuadrícula
  const calculateGrid = (length: number) => {
    // Para una sola letra, ocupa el espacio máximo
    if (length === 1) return { cols: 1, rows: 1, singleLetter: true };
    
    // Para dos letras, una fila
    if (length === 2) return { cols: 2, rows: 1, singleLetter: false };
    
    // Para palabras de longitud 3 o más
    const cols = 2;  // Siempre usamos 2 columnas
    const fullRows = Math.floor(length / 2);
    const hasOddItem = length % 2 !== 0;
    
    return { 
      cols, 
      rows: fullRows + (hasOddItem ? 1 : 0),
      hasOddItem,
      singleLetter: false
    };
  };

  const gridInfo = calculateGrid(cleanText.length);

  // Función para renderizar cada bandera con la estructura adecuada
  const renderFlags = () => {
    return cleanText.split('').map((char, index) => {
      const flagData = letterToFlag(char);
      const flagPath = flagData ? flagData.flagPath : null;
      
      // Determina si este elemento es el último en una longitud impar
      const isLastOddItem = gridInfo.hasOddItem && index === cleanText.length - 1;
      
      // Definir el tamaño de la bandera
      const flagSize = gridInfo.singleLetter ? 300 : 100;
      
      // Aplica estilos especiales al último elemento si es impar
      const itemStyle = isLastOddItem ? {
        gridColumn: '1 / 2',  // Alineación a la izquierda
        justifySelf: 'start',
      } : {};
      
      return (
        <div 
          key={index} 
          className="flag-item"
          style={itemStyle}
        >
          {flagPath ? (
            svgContents[char] ? (
              // Renderizar el SVG nativo si tenemos el contenido
              <div 
                className="native-svg-container"
                style={{ 
                  width: `${flagSize}px`,
                  height: `${flagSize}px`,
                  position: 'relative'
                }}
              >
              <svg 
                width={flagSize} 
                height={flagSize} 
                viewBox="0 0 1080 1080" 
                xmlns="http://www.w3.org/2000/svg"
                dangerouslySetInnerHTML={{ __html: svgContents[char] }}
              />
              </div>
            ) : (
              // Fallback a imagen si no tenemos el contenido SVG
              <img 
                src={flagPath} 
                alt={`Flag for ${char}`} 
                width={flagSize} 
                height={flagSize}
                style={{ display: 'block' }}
              />
            )
          ) : (
            // Placeholder para caracteres sin bandera
            <div 
              className="placeholder-flag"
              style={{ 
                width: `${flagSize}px`, 
                height: `${flagSize}px`,
                fontSize: gridInfo.singleLetter ? '4rem' : '2rem'
              }}
            >
              {char}
            </div>
          )}
        </div>
      );
    });
  };

  // Calculamos el ancho total del contenedor
  const flagSize = gridInfo.singleLetter ? 300 : 100;
  const containerWidth = gridInfo.cols * flagSize;

  return (
    <div ref={containerRef} className="flags-container mt-8">
      <div 
        className="flags-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridInfo.cols}, ${flagSize}px)`,
          width: `${containerWidth}px`,
          gap: 0,
          margin: '0 auto'
        }}
      >
        {renderFlags()}
      </div>
      
      <style jsx>{`
        .placeholder-flag {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #333;
          color: white;
        }
      `}</style>
    </div>
  );
}
