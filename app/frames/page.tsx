'use client';

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Importar el componente FlagFrame de forma dinámica para evitar problemas de SSR
const FlagFrame = dynamic(() => import("@/components/flag-system/FlagFrame"), {
  ssr: false,
});

export default function FramesPage() {
  const [host, setHost] = useState("");

  useEffect(() => {
    // Obtener la URL base para usarla en las meta tags de Frame
    setHost(window.location.origin);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4">
      <FlagFrame />
    </main>
  );
}
