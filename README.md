# Mis juegos

Lanzador PWA con apps educativas en HTML de un solo archivo.

## Agregar una app
1. Crear `apps/<nombre>/index.html` (un solo HTML autocontenido).
2. En su `<head>`: `<title>Nombre visible</title>` y `<meta name="app-emoji" content="🕐">`.
3. `git push`. La Action regenera `apps.json` y publica.

## Prompt base para el LLM
> Hacé un único archivo HTML con CSS y JS inline, sin CDNs ni librerías externas.
> Pensado para tablet: táctil con Pointer Events, botones grandes, que funcione en vertical y horizontal.
> En español rioplatense, para una nena de 8 años.
> En el <head> poné `<meta name="app-emoji" content="EMOJI">` con un emoji que represente la app.
> Agregá un botón 🏠 fijo arriba a la izquierda con `href="../../"`.

## Probar local
```
node scripts/build-index.mjs && npx serve .
```
