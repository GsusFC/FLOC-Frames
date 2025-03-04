'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Importar FlagFrame de forma dinámica para evitar problemas con SSR
const FlagFrame = dynamic(() => import("@/components/flag-system/FlagFrame"), {
  ssr: false,
});

export default function FrameExamplesPage() {
  const [showHtml, setShowHtml] = useState(false);
  const [testUrl, setTestUrl] = useState('');
  const searchParams = useSearchParams();
  const activeWord = searchParams.get('word') || 'FRAME';

  const hostUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const frameUrl = `${hostUrl}/frames`;
  
  // Ejemplo de HTML para incrustar
  const embedHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sistema de Banderas Náuticas - Frame</title>
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="${hostUrl}/api/flag-image?word=${activeWord}" />
  <meta property="fc:frame:post_url" content="${hostUrl}/api/frame-action" />
  <meta property="fc:frame:button:1" content="Generar Palabra" />
  <meta property="fc:frame:button:2" content="Cambiar Fondo" />
  <meta property="fc:frame:button:3" content="Ver Completo" />
  <meta property="fc:frame:button:4" content="Escribir Palabra" />
  <meta property="fc:frame:input:text" content="Escribe una palabra (máx. 6 caracteres)" />
</head>
<body>
  <h1>Sistema de Banderas Náuticas</h1>
  <p>Este es un Frame de Farcaster que muestra palabras como banderas náuticas.</p>
</body>
</html>`;

  return (
    <main className="min-h-screen p-6 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Ejemplos de Frames de Farcaster</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Frame de ejemplo */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Vista previa del Frame:</h2>
            <div className="border-2 border-dashed border-gray-600 p-4 rounded-lg">
              <FlagFrame />
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Esta es una vista previa del Frame tal como se vería en Farcaster. Prueba los botones y la entrada de texto.
            </p>
          </div>
          
          {/* Ejemplos de uso */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Cómo usar este Frame:</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Copia la URL del frame: <code className="bg-gray-700 px-2 py-1 rounded">{frameUrl}</code></li>
              <li>Compártela en una publicación de Farcaster</li>
              <li>Los usuarios podrán interactuar con el frame desde sus clientes</li>
              <li>También puedes incrustar el frame en tu propia página web</li>
            </ol>
            
            <div className="mt-6">
              <button 
                onClick={() => setShowHtml(!showHtml)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                {showHtml ? 'Ocultar HTML' : 'Mostrar HTML para incrustar'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Código de ejemplo */}
        {showHtml && (
          <div className="bg-gray-800 p-6 rounded-lg mb-12">
            <h2 className="text-xl font-semibold mb-4">Código HTML para incrustar:</h2>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm font-mono text-gray-300">
              {embedHtml}
            </pre>
            <p className="mt-4 text-sm text-gray-400">
              Este es el código HTML básico que puedes usar para incrustar este Frame en tu sitio web.
            </p>
          </div>
        )}
        
        {/* Validador de Frames */}
        <div className="bg-gray-800 p-6 rounded-lg mb-12">
          <h2 className="text-xl font-semibold mb-4">Validar tu Frame:</h2>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="URL del Frame a validar" 
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
              className="flex-grow px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Link 
              href={`/api/frame-validator?url=${encodeURIComponent(testUrl)}`}
              target="_blank"
              className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition ${!testUrl && 'opacity-50 cursor-not-allowed'}`}
              onClick={(e) => !testUrl && e.preventDefault()}
            >
              Validar
            </Link>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Usa nuestra API de validación para verificar si tu Frame cumple con las especificaciones de Farcaster.
          </p>
        </div>
        
        {/* Documentación */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Documentación:</h2>
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="text-lg font-medium">Endpoint API:</h3>
              <code className="block bg-gray-700 p-2 rounded mt-2">{hostUrl}/api/frame-action</code>
              <p className="mt-1 text-sm text-gray-400">
                Endpoint que procesa las acciones del Frame. Responde a los clicks de botones y entrada de texto.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Validador de Frames:</h3>
              <code className="block bg-gray-700 p-2 rounded mt-2">{hostUrl}/api/frame-validator?url=URL_DEL_FRAME</code>
              <p className="mt-1 text-sm text-gray-400">
                API para validar que tu Frame cumple con las especificaciones. Proporciona información detallada y advertencias.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Generador de Imágenes:</h3>
              <code className="block bg-gray-700 p-2 rounded mt-2">{hostUrl}/api/flag-image?word=PALABRA</code>
              <p className="mt-1 text-sm text-gray-400">
                Genera imágenes de banderas náuticas para cualquier palabra.
              </p>
            </div>
            
            <div className="mt-6">
              <Link 
                href="https://github.com/farcasterxyz/protocol/discussions/205#frame-embed-metatags"
                target="_blank"
                className="text-blue-400 hover:underline"
              >
                → Más información sobre Farcaster Frames
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
