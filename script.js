(() => {
  "use strict";

  // ---------- Referencias al DOM ----------
  const btnYes = document.getElementById("btn-yes");
  const btnNo = document.getElementById("btn-no");
  const actions = document.getElementById("actions");
  const title = document.getElementById("title");
  const subtitle = document.getElementById("subtitle");
  const message = document.getElementById("message");
  const heartsLayer = document.getElementById("hearts");
  const sticker = document.getElementById("sticker");

  const MARGIN = 10;          // separación mínima con los bordes de la pantalla (px)
  const MIN_JUMP = 150;       // distancia mínima que debe saltar el botón (px)
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let placeholder = null;     // hueco que deja el botón "No" al empezar a huir
  let isFloating = false;

  const random = (min, max) => Math.random() * (max - min) + min;

  // ---------- Botón "No": huye a una posición aleatoria ----------
  function startFloating() {
    const rect = btnNo.getBoundingClientRect();

    // Deja un hueco del mismo tamaño para que el botón "Sí" no cambie de lugar
    placeholder = document.createElement("span");
    placeholder.className = "placeholder";
    placeholder.style.width = rect.width + "px";
    placeholder.style.height = rect.height + "px";
    btnNo.parentNode.insertBefore(placeholder, btnNo);

    // Lo saca del flujo conservando su posición actual
    btnNo.classList.add("is-floating");
    btnNo.style.left = rect.left + "px";
    btnNo.style.top = rect.top + "px";
    void btnNo.offsetWidth; // fuerza el reflow para que la transición funcione

    isFloating = true;
  }

  function moveNoButton() {
    if (!isFloating) startFloating();

    const w = btnNo.offsetWidth;
    const h = btnNo.offsetHeight;
    const maxX = Math.max(MARGIN, window.innerWidth - w - MARGIN);
    const maxY = Math.max(MARGIN, window.innerHeight - h - MARGIN);

    const currentX = parseFloat(btnNo.style.left) || 0;
    const currentY = parseFloat(btnNo.style.top) || 0;

    // Busca una posición lo bastante lejos de la actual
    let x, y;
    let tries = 0;
    do {
      x = random(MARGIN, maxX);
      y = random(MARGIN, maxY);
      tries++;
    } while (Math.hypot(x - currentX, y - currentY) < MIN_JUMP && tries < 25);

    btnNo.style.left = x + "px";
    btnNo.style.top = y + "px";
  }

  // Ratón
  btnNo.addEventListener("mouseover", moveNoButton);

  // Móvil: se bloquea el toque para que no llegue a ser un clic
  btnNo.addEventListener(
    "touchstart",
    (event) => {
      event.preventDefault();
      moveNoButton();
    },
    { passive: false }
  );

  // Teclado (Tab) y cualquier clic que se cuele: también huye
  btnNo.addEventListener("focus", moveNoButton);
  btnNo.addEventListener("click", (event) => {
    event.preventDefault();
    moveNoButton();
  });

  // Si cambia el tamaño de la ventana, mantiene el botón visible
  window.addEventListener("resize", () => {
    if (!isFloating) return;
    const maxX = Math.max(MARGIN, window.innerWidth - btnNo.offsetWidth - MARGIN);
    const maxY = Math.max(MARGIN, window.innerHeight - btnNo.offsetHeight - MARGIN);
    btnNo.style.left = Math.min(parseFloat(btnNo.style.left) || 0, maxX) + "px";
    btnNo.style.top = Math.min(parseFloat(btnNo.style.top) || 0, maxY) + "px";
  });

  // ---------- Botón "Sí": celebración ----------
  btnYes.addEventListener("click", () => {
    actions.hidden = true;          // oculta ambos botones
    subtitle.hidden = true;
    title.textContent = "¡Gracias, Mafer! 💖";
    message.hidden = false;
    sticker.classList.add("is-happy"); // el osito se pone feliz

    if (!reduceMotion) launchBurst();
  });

  // Explosión de corazones desde el centro de la pantalla
  function launchBurst() {
    const emojis = ["❤️", "💖", "💕", "✨", "💗", "🥰"];
    const total = 36;

    for (let i = 0; i < total; i++) {
      const el = document.createElement("span");
      el.className = "burst";
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

      const angle = (Math.PI * 2 * i) / total + random(-0.2, 0.2);
      const distance = random(120, Math.min(window.innerWidth, 520) * 0.7);

      el.style.left = window.innerWidth / 2 + "px";
      el.style.top = window.innerHeight / 2 + "px";
      el.style.fontSize = random(18, 34) + "px";
      el.style.setProperty("--dx", Math.cos(angle) * distance + "px");
      el.style.setProperty("--dy", Math.sin(angle) * distance + "px");

      heartsLayer.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
    }
  }

  // ---------- Corazones que flotan de fondo ----------
  function spawnHeart() {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = ["💗", "💕", "🩷", "❤️"][Math.floor(Math.random() * 4)];
    heart.style.left = random(0, 100) + "vw";
    heart.style.fontSize = random(14, 30) + "px";
    heart.style.animationDuration = random(6, 11) + "s";

    heartsLayer.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove());
  }

  if (!reduceMotion) {
    setInterval(spawnHeart, 700);
    for (let i = 0; i < 6; i++) setTimeout(spawnHeart, i * 250);
  }
})();
