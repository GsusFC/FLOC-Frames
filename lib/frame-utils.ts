/**
 * Utilidades para Farcaster Frames
 */

interface FrameMetadataOptions {
  title?: string;
  description?: string;
  imageWord?: string;
  imageUrl?: string;
  postUrl?: string;
  buttons?: string[];
  hasInput?: boolean;
  inputPlaceholder?: string;
  state?: Record<string, string>;
}

/**
 * Genera los metadatos para un Farcaster Frame
 */
export function generateFrameMetadata(options: FrameMetadataOptions = {}) {
  const {
    title = 'Sistema de Banderas Náuticas',
    description = 'Visualiza palabras como banderas náuticas internacionales',
    imageWord = 'FLOC',
    imageUrl,
    postUrl = 'https://floc.app/api/frame-action',
    buttons = ['Generar Palabra', 'Cambiar Fondo', 'Ver Completo', 'Escribir Palabra'],
    hasInput = true,
    inputPlaceholder = 'Escribe una palabra',
    state = {},
  } = options;

  // Construcción de la URL de la imagen
  const finalImageUrl = imageUrl || `https://floc.app/api/flag-image?word=${imageWord}`;
  
  // Metadatos base del frame
  const metadata = {
    title: `${title} - Frames`,
    description: `${description} usando Farcaster Frames`,
    openGraph: {
      title: `${title} - Frames`,
      description,
      images: [finalImageUrl],
    },
    other: {
      'fc:frame': 'vNext',
      'fc:frame:image': finalImageUrl,
      'fc:frame:post_url': postUrl,
    } as Record<string, string>,
  };

  // Añadir botones (máximo 4)
  buttons.slice(0, 4).forEach((buttonText, index) => {
    metadata.other[`fc:frame:button:${index + 1}`] = buttonText;
  });

  // Añadir campo de entrada si es necesario
  if (hasInput) {
    metadata.other['fc:frame:input:text'] = inputPlaceholder;
  }
  
  // Añadir estado si existe
  Object.entries(state).forEach(([key, value]) => {
    metadata.other[`fc:frame:state:${key}`] = value;
  });

  return metadata;
}

interface FrameResponse {
  message: string;
  imageUrl: string;
  buttonIndex?: number;
  bgColor?: string;
  redirect?: string;
  [key: string]: string | number | undefined;
}

/**
 * Genera la estructura de respuesta para un Farcaster Frame
 */
export function generateFrameResponse(options: {
  word: string;
  bgColor?: string;
  message?: string;
  buttonIndex?: number;
  redirect?: string;
}): FrameResponse {
  const { word, bgColor = '#000000', message, buttonIndex, redirect } = options;
  
  const response: FrameResponse = {
    message: message || `Palabra visualizada: ${word}`,
    imageUrl: `https://floc.app/api/flag-image?word=${word}`,
  };
  
  if (buttonIndex) {
    response.buttonIndex = buttonIndex;
  }
  
  if (bgColor) {
    response.bgColor = bgColor;
  }
  
  if (redirect) {
    response.redirect = redirect;
  }
  
  return response;
}
