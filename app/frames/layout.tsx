import { generateFrameMetadata } from '@/lib/frame-utils';

export const metadata = generateFrameMetadata({
  title: 'Sistema de Banderas Náuticas',
  description: 'Visualiza palabras como banderas náuticas internacionales',
  imageWord: 'FLOC',
  buttons: ['Generar Palabra', 'Cambiar Fondo', 'Ver Completo', 'Escribir Palabra'],
  hasInput: true,
  inputPlaceholder: 'Escribe una palabra (máx. 6 caracteres)',
  // Para desarrollo local, usamos una URL relativa
  postUrl: process.env.NODE_ENV === 'production' 
    ? 'https://floc.app/api/frame-action'
    : '/api/frame-action'
});

export default function FramesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
