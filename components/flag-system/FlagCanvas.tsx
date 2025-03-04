'use client';

import React from 'react';
import Image from 'next/image';
import { letterToFlag } from '@/lib/flag-system/flagMap';

interface FlagCanvasProps {
  word: string;
  isRandom?: boolean;
}

export default function FlagCanvas({ word, isRandom = false }: FlagCanvasProps) {
  // Canvas siempre a 1000x1000px con fondo negro
  const canvasSize = 1000;
  // Altura fija de 80px para las banderas como especificado
  const flagHeight = 80;
  
  return (
    <div className="flex justify-center w-full relative">
      {/* Contenedor principal de 1000x1000px */}
      <div 
        style={{ 
          width: canvasSize, 
          height: canvasSize, /* Canvas perfectamente cuadrado */
          backgroundColor: 'black',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '100%',
          border: '1px solid #333',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Si hay palabra, muestra las banderas náuticas */}
        {word.length > 0 ? (
          <>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'row',
              justifyContent: 'center', 
              alignItems: 'center',
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 0, /* Elimina cualquier espacio entre elementos inline */
              lineHeight: 0, /* Elimina cualquier espacio vertical */
            }}>
              {/* Renderiza las banderas */}
              {word.split('').map((letter, index) => {
                const flag = letterToFlag(letter);
                
                if (!flag) return null;
                
                return (
                  <div 
                    key={`${letter}-${index}`}
                    style={{ 
                      height: flagHeight,
                      display: 'inline-block',
                      margin: 0,
                      padding: 0,
                      animation: `fadeIn 0.3s ease-in-out ${index * 0.1}s forwards`,
                      opacity: 0,
                      fontSize: 0,
                      lineHeight: 0
                    }}
                  >
                    <img
                      src={flag.flagPath}
                      alt={`Bandera ${flag.name}`}
                      height={flagHeight}
                      style={{ 
                        height: `${flagHeight}px`,
                        margin: 0,
                        padding: 0,
                        display: 'block'
                      }}
                    />
                  </div>
                );
              })}
            </div>
            
            {/* Mostrar la palabra cuando es generada aleatoriamente - perfectamente centrada en el borde inferior */}
            {isRandom && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  width: '100%', /* Ocupa todo el ancho */
                  display: 'flex',
                  justifyContent: 'center', /* Centra horizontalmente con flexbox */
                  alignItems: 'center',
                  animation: 'fadeIn 0.5s ease-in-out forwards',
                  animationDelay: `${word.length * 0.1 + 0.2}s`,
                  opacity: 0,
                  padding: 0,
                  margin: 0
                }}
              >
                <span
                  style={{
                    fontFamily: '"Druk Text Wide Heavy", system-ui',
                    fontSize: '48px',
                    fontWeight: 'bold',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'white',
                    textShadow: '0 0 10px rgba(255,255,255,0.3)',
                    display: 'inline-block', /* Para aplicar el centrado correctamente */
                    textAlign: 'center'
                  }}
                >
                  {word}
                </span>
              </div>
            )}
          </>
        ) : (
          /* Si no hay palabra, muestra un mensaje */
          <div className="text-center p-8">
            <span className="text-white/60 font-mono text-xl block">
              Ingresa o genera una palabra para visualizar las banderas
            </span>
          </div>
        )}

        {/* Estilo para la animación fadeIn */}
        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
}
