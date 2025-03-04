import { NextRequest, NextResponse } from 'next/server';

interface FrameValidationResponse {
  valid: boolean;
  errors: string[];
  warnings: string[];
  details?: {
    buttons?: number;
    hasPostUrl?: boolean;
    hasImage?: boolean;
    hasVersion?: boolean;
    hasInputField?: boolean;
    imageUrl?: string;
    postUrl?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Parsear el cuerpo de la solicitud que debe contener el HTML del Frame a validar
    const { html, url } = await request.json();

    if (!html && !url) {
      return NextResponse.json(
        { 
          valid: false, 
          errors: ['Se debe proporcionar HTML o URL para validar']
        },
        { status: 400 }
      );
    }

    // Inicializar la respuesta
    const response: FrameValidationResponse = {
      valid: true,
      errors: [],
      warnings: [],
      details: {
        buttons: 0,
        hasPostUrl: false,
        hasImage: false,
        hasVersion: false,
        hasInputField: false
      }
    };

    // Obtener el HTML, ya sea del cuerpo de la solicitud o de la URL proporcionada
    let frameHtml = html;
    
    if (url && !html) {
      try {
        const htmlResponse = await fetch(url);
        frameHtml = await htmlResponse.text();
      } catch (error) {
        response.errors.push(`Error al obtener HTML de la URL: ${error}`);
        response.valid = false;
      }
    }

    if (!frameHtml) {
      return NextResponse.json(
        { 
          valid: false, 
          errors: ['No se pudo obtener el HTML para validar']
        },
        { status: 400 }
      );
    }

    // Analizar metaetiquetas de Frame
    const parser = new DOMParser();
    const doc = parser.parseFromString(frameHtml, 'text/html');
    
    // Validar versión del Frame
    const versionMeta = doc.querySelector('meta[property="fc:frame"]');
    if (!versionMeta) {
      response.errors.push('Falta la metaetiqueta fc:frame requerida');
      response.valid = false;
    } else {
      response.details!.hasVersion = true;
      const version = versionMeta.getAttribute('content');
      if (version !== 'vNext') {
        response.warnings.push(`Versión de frame '${version}' puede no ser compatible con los estándares actuales`);
      }
    }

    // Validar imagen
    const imageMeta = doc.querySelector('meta[property="fc:frame:image"]');
    if (!imageMeta) {
      response.errors.push('Falta la metaetiqueta fc:frame:image requerida');
      response.valid = false;
    } else {
      response.details!.hasImage = true;
      response.details!.imageUrl = imageMeta.getAttribute('content') || undefined;
      
      if (response.details!.imageUrl) {
        if (!response.details!.imageUrl.startsWith('http')) {
          response.errors.push('La URL de la imagen debe ser una URL completa (comenzando con http:// o https://)');
          response.valid = false;
        }
        
        if (response.details!.imageUrl.includes('localhost')) {
          response.warnings.push('La URL de la imagen contiene localhost, lo que no funcionará en producción');
        }
      }
    }

    // Validar post_url
    const postUrlMeta = doc.querySelector('meta[property="fc:frame:post_url"]');
    if (!postUrlMeta) {
      response.warnings.push('Falta la metaetiqueta fc:frame:post_url recomendada');
    } else {
      response.details!.hasPostUrl = true;
      response.details!.postUrl = postUrlMeta.getAttribute('content') || undefined;
      
      if (response.details!.postUrl) {
        if (!response.details!.postUrl.startsWith('http')) {
          response.errors.push('La URL de post debe ser una URL completa (comenzando con http:// o https://)');
          response.valid = false;
        }
        
        if (response.details!.postUrl.includes('localhost')) {
          response.warnings.push('La URL de post contiene localhost, lo que no funcionará en producción');
        }
      }
    }

    // Validar botones
    const buttonMetas = doc.querySelectorAll('meta[property^="fc:frame:button:"]');
    response.details!.buttons = buttonMetas.length;
    if (buttonMetas.length === 0) {
      response.warnings.push('No se encontraron botones en el Frame');
    } else if (buttonMetas.length > 4) {
      response.errors.push(`Demasiados botones: ${buttonMetas.length}. El máximo permitido es 4`);
      response.valid = false;
    }

    // Validar campo de entrada
    const inputMeta = doc.querySelector('meta[property="fc:frame:input:text"]');
    response.details!.hasInputField = !!inputMeta;

    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error al validar frame:', error);
    return NextResponse.json(
      { 
        valid: false, 
        errors: [`Error al procesar la solicitud: ${error}`],
        warnings: []
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  
  if (!url) {
    return NextResponse.json(
      { message: 'Proporcione una URL para validar con el parámetro ?url=' },
      { status: 400 }
    );
  }

  try {
    // Hacer la solicitud POST a la misma ruta con la URL proporcionada
    const response = await fetch(`${request.nextUrl.origin}/api/frame-validator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { 
        valid: false, 
        errors: [`Error al validar URL: ${error}`],
        warnings: []
      },
      { status: 500 }
    );
  }
}
