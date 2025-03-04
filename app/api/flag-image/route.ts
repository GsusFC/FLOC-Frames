import { getRandomWord } from '@/lib/flag-system/dictionary';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Obtener la palabra de la URL
  const searchParams = request.nextUrl.searchParams;
  const word = searchParams.get('word') || getRandomWord(6);
  
  // Por ahora es una implementación de prueba - idealmente deberíamos generar la
  // imagen de la bandera con Canvas o SVG y devolverla como imagen
  // En este ejemplo, redirigimos a una imagen de placeholder
  return NextResponse.json({ 
    word,
    message: 'API de imagen para banderas náuticas'
  });
}
