// Definición de tipos para las banderas náuticas
export interface FlagData {
  letter: string;
  flagPath: string;
  name: string;
}

// Mapeo de letras a banderas náuticas reales desde los archivos SVG
const FLAGS: Record<string, FlagData> = {
  'A': { 
    letter: 'A', 
    name: 'Alfa', 
    flagPath: '/assets/flags/A-ALPHA.svg'
  },
  'B': { 
    letter: 'B', 
    name: 'Bravo', 
    flagPath: '/assets/flags/B-BRAVO.svg'
  },
  'C': { 
    letter: 'C', 
    name: 'Charlie', 
    flagPath: '/assets/flags/C-CHARLIE.svg'
  },
  'D': { 
    letter: 'D', 
    name: 'Delta', 
    flagPath: '/assets/flags/D-DELTA.svg'
  },
  'E': { 
    letter: 'E', 
    name: 'Echo', 
    flagPath: '/assets/flags/E-ECHO.svg'
  },
  'F': { 
    letter: 'F', 
    name: 'Foxtrot', 
    flagPath: '/assets/flags/F-FOXTROT.svg'
  },
  'G': { 
    letter: 'G', 
    name: 'Golf', 
    flagPath: '/assets/flags/G-GOLF.svg'
  },
  'H': { 
    letter: 'H', 
    name: 'Hotel', 
    flagPath: '/assets/flags/H-HOTEL.svg'
  },
  'I': { 
    letter: 'I', 
    name: 'India', 
    flagPath: '/assets/flags/I-INDIA.svg'
  },
  'J': { 
    letter: 'J', 
    name: 'Juliet', 
    flagPath: '/assets/flags/J-JULIET.svg'
  },
  'K': { 
    letter: 'K', 
    name: 'Kilo', 
    flagPath: '/assets/flags/K-KILO.svg'
  },
  'L': { 
    letter: 'L', 
    name: 'Lima', 
    flagPath: '/assets/flags/L-LIMA.svg'
  },
  'M': { 
    letter: 'M', 
    name: 'Mike', 
    flagPath: '/assets/flags/M-MIKE.svg'
  },
  'N': { 
    letter: 'N', 
    name: 'November', 
    flagPath: '/assets/flags/N-NOVEMBER.svg'
  },
  'O': { 
    letter: 'O', 
    name: 'Oscar', 
    flagPath: '/assets/flags/O-OSCAR.svg'
  },
  'P': { 
    letter: 'P', 
    name: 'Papa', 
    flagPath: '/assets/flags/P-PAPA.svg'
  },
  'Q': { 
    letter: 'Q', 
    name: 'Quebec', 
    flagPath: '/assets/flags/Q-QUEBEC.svg'
  },
  'R': { 
    letter: 'R', 
    name: 'Romeo', 
    flagPath: '/assets/flags/R-ROMEO.svg'
  },
  'S': { 
    letter: 'S', 
    name: 'Sierra', 
    flagPath: '/assets/flags/S-SIERRA.svg'
  },
  'T': { 
    letter: 'T', 
    name: 'Tango', 
    flagPath: '/assets/flags/T-TANGO.svg'
  },
  'U': { 
    letter: 'U', 
    name: 'Uniform', 
    flagPath: '/assets/flags/U-UNIFORM.svg'
  },
  'V': { 
    letter: 'V', 
    name: 'Victor', 
    flagPath: '/assets/flags/V-VICTOR.svg'
  },
  'W': { 
    letter: 'W', 
    name: 'Whisky', 
    flagPath: '/assets/flags/W-WHISKY.svg'
  },
  'X': { 
    letter: 'X', 
    name: 'X-ray', 
    flagPath: '/assets/flags/X-XRAY.svg'
  },
  'Y': { 
    letter: 'Y', 
    name: 'Yankee', 
    flagPath: '/assets/flags/Y-YANKEE.svg'
  },
  'Z': { 
    letter: 'Z', 
    name: 'Zulu', 
    flagPath: '/assets/flags/Z-ZULU.svg'
  }
};

/**
 * Obtiene la información de la bandera correspondiente a una letra
 */
export function letterToFlag(letter: string): FlagData | null {
  const upperLetter = letter.toUpperCase();
  return FLAGS[upperLetter] || null;
}

/**
 * Verifica si una letra tiene bandera correspondiente
 */
export function hasFlag(letter: string): boolean {
  const upperLetter = letter.toUpperCase();
  return upperLetter in FLAGS;
}

/**
 * Obtiene todas las banderas disponibles
 */
export function getAllFlags(): FlagData[] {
  return Object.values(FLAGS);
}
