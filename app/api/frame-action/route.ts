import { NextRequest, NextResponse } from 'next/server';
import { getRandomWord } from '@/lib/flag-system/dictionary';

export async function POST(request: NextRequest) {
  try {
    // Parsear el cuerpo de la solicitud
    const body = await request.json();
    
    // Obtener el índice del botón presionado (1-4)
    const buttonIndex = body.untrustedData?.buttonIndex || 0;
    
    // Obtener otros datos útiles de la solicitud de Farcaster
    const fid = body.untrustedData?.fid;
    const messageHash = body.untrustedData?.messageHash;
    
    // Generar una palabra aleatoria para usar en la imagen
    const word = getRandomWord(6);
    
    // Determinar las acciones basadas en el botón presionado
    let actionResult = "";
    let bgColor = "#000000";
    
    // Obtener el texto ingresado por el usuario (si existe)
    const inputText = body.untrustedData?.inputText;
    
    switch (buttonIndex) {
      case 1:
        // Generar Palabra
        actionResult = `Palabra generada: ${word}`;
        break;
      case 2:
        // Cambiar Fondo
        const colors = ["#ff0000", "#0000ff", "#00ff00", "#000000", "#ffffff"];
        const randomIndex = Math.floor(Math.random() * colors.length);
        bgColor = colors[randomIndex];
        actionResult = "Fondo cambiado";
        break;
      case 3:
        // Ver Completo - Redirigir a la versión completa
        return NextResponse.json({
          message: "Redirigiendo a la versión completa",
          imageUrl: `https://floc.app/api/flag-image?word=${word}`,
          buttonIndex,
          redirect: `https://floc.app/flag-system-v2?word=${word}`
        });
      case 4:
        // Usar palabra ingresada por el usuario
        if (inputText && inputText.trim()) {
          // Limitar a 6 caracteres para mantener el diseño legible
          const userWord = inputText.trim().substring(0, 6).toUpperCase();
          actionResult = `Usando palabra personalizada: ${userWord}`;
          return NextResponse.json({
            message: actionResult,
            imageUrl: `https://floc.app/api/flag-image?word=${userWord}`,
            buttonIndex
          });
        } else {
          actionResult = "Por favor, ingresa una palabra en el campo de texto";
        }
        break;
      default:
        actionResult = "Acción desconocida";
    }
    
    // Construir la respuesta para Farcaster Frame
    return NextResponse.json({
      message: actionResult,
      imageUrl: `https://floc.app/api/flag-image?word=${word}`,
      buttonIndex,
      bgColor
    });
    
  } catch (error) {
    console.error('Error procesando acción del frame:', error);
    return NextResponse.json(
      { error: 'Error procesando la solicitud' },
      { status: 500 }
    );
  }
}
