# Configuración de Túnel para Pruebas de Farcaster Frames

Para probar tu Frame en el Playground de Farcaster o compartirlo con otros usuarios, necesitas exponer tu aplicación de desarrollo local a Internet. Esto se hace típicamente a través de un túnel. Sin embargo, hay algunos aspectos importantes a considerar para asegurarte de que tu Frame funcione correctamente.

## Opciones de Tunneling

### Ngrok

[Ngrok](https://ngrok.com/) es una opción popular para crear túneles, pero ten en cuenta algunas limitaciones:

#### ⚠️ Advertencia sobre el Plan Gratuito de Ngrok

El **plan gratuito de Ngrok** inserta una página intermedia de click-through entre tu servidor de desarrollo y el endpoint del túnel. Esto interfiere con los Frames de Farcaster, ya que:

1. La página intermedia rompe las metaetiquetas de tu Frame
2. Farcaster no podrá acceder directamente a tus endpoints de API

#### Configuración recomendada con Ngrok:

Si decides usar Ngrok, considera:
- Usar una cuenta pagada de Ngrok que elimina la página intermedia
- Configurar un dominio personalizado para tu túnel

```bash
# Ejemplo de uso con cuenta pagada
ngrok http 3004 --domain=tu-subdominio-permanente.ngrok.io
```

### Tailscale Funnel

[Tailscale Funnel](https://tailscale.com/kb/1223/tailscale-funnel/) es una excelente alternativa que no inserta páginas intermedias:

```bash
# Instalar Tailscale
# Luego habilitar funnel para tu servidor local
tailscale funnel 3004
```

Esto te proporcionará una URL pública que puedes usar para tus pruebas.

### Cloudflare Tunnel

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/) es otra opción robusta:

```bash
# Instalar cloudflared
# Configurar un túnel
cloudflared tunnel create mi-frame-tunnel
# Ejecutar el túnel
cloudflared tunnel run --url http://localhost:3004 mi-frame-tunnel
```

## Uso con el Frame Playground de Farcaster

Para probar tu Frame en el [Frame Playground de Warpcast](https://warpcast.com/~/developers/frames), necesitas:

1. Configurar un túnel como se describió anteriormente
2. Usar la URL del túnel para tu Frame, por ejemplo: `https://tu-subdominio.ngrok.io/frames`
3. Pegar esta URL en el campo de URL del Frame Playground
4. El Playground validará automáticamente tu Frame y mostrará una vista previa

## Configuración para desarrollo local

Para facilitar el desarrollo, puedes configurar un script npm que inicie tanto tu servidor de desarrollo como el túnel:

```json
// package.json
"scripts": {
  "dev": "next dev -p 3004",
  "tunnel": "tailscale funnel 3004",
  "dev:public": "concurrently \"npm run dev\" \"npm run tunnel\""
}
```

## Verificación de funcionamiento

Para verificar que tu túnel funciona correctamente y no inserta páginas intermedias:

1. Accede a tu URL de túnel directamente en un navegador
2. Debería cargar tu aplicación sin páginas intermedias
3. Usa la herramienta de validación integrada: `/api/frame-validator?url=TU_URL_DE_TÚNEL/frames`
4. Verifica que los encabezados HTTP se envían correctamente

Si encuentras problemas, comprueba los encabezados y la respuesta completa para asegurarte de que no hay redirecciones o contenido adicional insertado por el servicio de túnel.
