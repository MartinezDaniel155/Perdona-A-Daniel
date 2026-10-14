# 🥺 ¿Me perdonas? — Página para pedir perdón

Una página web tierna y moderna para pedir perdón. Tiene un botón **Sí** (verde) y un botón **No** (rojo) que **huye** cada vez que intentas tocarlo. Al presionar **Sí** aparece un mensaje de celebración con una lluvia de corazones. 💖

## 📁 Estructura

```
.
├── index.html   → Estructura de la página
├── style.css    → Estilos, colores y animaciones
├── script.js    → Lógica de los botones y los corazones
└── README.md    → Este archivo
```

## 🚀 Cómo usarla

1. Guarda los tres archivos (`index.html`, `style.css` y `script.js`) **en la misma carpeta**.
2. Abre `index.html` con doble clic en cualquier navegador (Chrome, Firefox, Edge, Safari).
3. ¡Listo! No necesita instalación ni servidor.

> 💡 Las fuentes (Pacifico y Nunito) se cargan desde Google Fonts, así que se ven mejor con internet. Sin conexión la página funciona igual, con tipografías del sistema.

## ✨ Cómo funciona

| Elemento | Comportamiento |
|---|---|
| **Botón "No"** | Con `mouseover` (ratón) o `touchstart` (móvil) salta a una posición aleatoria de la pantalla, al menos 150 px lejos de donde estaba. También huye si se enfoca con el teclado o si logran hacer clic. |
| **Botón "Sí"** | Al hacer clic se ocultan los botones, el título cambia a *"¡Gracias, Mafer! 💖"*, el osito se pone feliz y aparece el mensaje *"¡Sabía que me perdonarías! ❤️✨"* con una explosión de corazones. |
| **Sticker** | Un osito dibujado en SVG que llora (con lagrimita animada) y cambia a carita feliz con saltitos cuando dicen que sí. |
| **Fondo** | Corazones que flotan suavemente hacia arriba. |
| **Accesibilidad** | Respeta `prefers-reduced-motion`: si el dispositivo pide menos movimiento, se desactivan las animaciones. |

## 🎨 Personalización

- **Textos**: edita el título, el subtítulo y el mensaje en `index.html`. El título que aparece tras decir "Sí" está en `script.js` (`title.textContent = ...`).
- **Nombre**: el nombre "Mafer" está en `script.js`, en la línea `title.textContent = "¡Gracias, Mafer! 💖"`. Si quieres que aparezca también en el título inicial, edita el `<h1>` de `index.html`.
- **Sticker**: está en `index.html`, dentro de `<div class="sticker">`. Para usar tu propia imagen, guárdala en la misma carpeta y reemplaza el `<svg>...</svg>` por `<img src="mi-sticker.png" alt="" />` (ajusta el tamaño con `.sticker { width: ... }` en `style.css`).
- **Colores**: cambia las variables al inicio de `style.css` (`--accent`, `--green`, `--red`, `--pink-1`, `--pink-2`).
- **Dificultad del botón "No"**: en `script.js` modifica `MIN_JUMP` (distancia mínima del salto) o `MARGIN` (separación con los bordes).
- **Más o menos corazones**: ajusta el intervalo de `setInterval(spawnHeart, 700)` (menor número = más corazones) o `total` en `launchBurst()`.

## 🌐 Publicarla (opcional)

Puedes subir la carpeta a GitHub Pages, Netlify o Vercel y compartir el enlace.

Hecho con mucho cariño. 💌
