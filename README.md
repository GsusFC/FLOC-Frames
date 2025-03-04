# Sistema de Banderas Náuticas como Farcaster Frame

Esta extensión del proyecto Creative Services Platform permite visualizar palabras como banderas náuticas internacionales en el formato de Farcaster Frames, permitiendo la interacción desde clientes compatibles.

## Características principales

- **Visualización de palabras como banderas**: Convierte texto en representaciones visuales usando el sistema internacional de banderas náuticas
- **Interacción completa con Frames**: Implementa todos los elementos de la especificación de Farcaster Frames v2
- **Entrada de texto personalizada**: Permite a los usuarios ingresar sus propias palabras para visualizar
- **Cambio de fondo dinámico**: Personalización del aspecto visual del frame
- **Validador incorporado**: Herramienta para validar que los frames cumplen con las especificaciones

## Estructura del proyecto

- `/src/components/flag-system/FlagFrame.tsx`: Componente principal que implementa la visualización en formato frame
- `/src/app/frames/`: Rutas y layouts para el sistema de frames
- `/src/app/api/frame-action/`: Endpoint que procesa las acciones del frame (botones y entrada de texto)
- `/src/app/api/flag-image/`: Generador de imágenes para las banderas
- `/src/app/api/frame-validator/`: Validador de frames según especificaciones
- `/src/lib/frame-utils.ts`: Utilidades para generar metadatos y respuestas de frame

## Cómo funciona

1. **Metadatos de Frame**: Cada frame incluye metadatos específicos como imagen, URL de acción, botones y campos de entrada
2. **Interacción**: El usuario interactúa con los botones o ingresa texto en el frame
3. **Procesamiento**: La API procesa la acción y genera una respuesta adecuada
4. **Visualización**: Se muestra una nueva imagen con las banderas correspondientes

## Endpoints API

- **`/api/frame-action`**: Procesa las acciones del frame (POST)
  - Botón 1: Genera una palabra aleatoria
  - Botón 2: Cambia el color de fondo
  - Botón 3: Redirecciona a la vista completa
  - Botón 4: Usa la palabra ingresada por el usuario

- **`/api/flag-image?word=PALABRA`**: Genera una imagen con las banderas náuticas para la palabra especificada

- **`/api/frame-validator?url=URL`**: Valida que un frame cumple con las especificaciones de Farcaster

## Uso de ejemplo

```html
<meta property="fc:frame" content="vNext" />
<meta property="fc:frame:image" content="https://tu-dominio.com/api/flag-image?word=FLOC" />
<meta property="fc:frame:post_url" content="https://tu-dominio.com/api/frame-action" />
<meta property="fc:frame:button:1" content="Generar Palabra" />
<meta property="fc:frame:button:2" content="Cambiar Fondo" />
<meta property="fc:frame:button:3" content="Ver Completo" />
<meta property="fc:frame:button:4" content="Escribir Palabra" />
<meta property="fc:frame:input:text" content="Escribe una palabra (máx. 6 caracteres)" />
```

## Implementación con Wagmi y Web3

El sistema está integrado con Wagmi para la conexión con wallets, lo que permite:

1. **Identificación de usuarios**: Conexión con la wallet del usuario
2. **Autenticación**: Verificación de la identidad a través de Web3
3. **Potencial NFT**: Base para permitir a los usuarios mintear sus banderas como NFTs

## Herramientas de desarrollo

Para facilitar el desarrollo y pruebas, se han implementado:

- **Página de ejemplos**: `/frames/examples` muestra cómo usar e implementar frames
- **Validador integrado**: Verifica que los frames cumplen con todas las especificaciones
- **Utilidades reutilizables**: Funciones para generar metadatos y respuestas compatibles

## Recursos externos

- [Documentación oficial de Farcaster Frames](https://github.com/farcasterxyz/protocol/discussions/205#frame-embed-metatags)
- [Especificación de Frame vNext](https://docs.farcaster.xyz/reference/frames/spec)
- [Validador oficial de Frames](https://warpcast.com/~/developers/frames)

## Ejemplos en vivo

- [Visualizador de banderas](/frames): Frame básico para uso en Farcaster
- [Ejemplos y documentación](/frames/examples): Implementación y uso detallado

---

Desarrollado como parte del proyecto Creative Services Platform con integración para Farcaster.
