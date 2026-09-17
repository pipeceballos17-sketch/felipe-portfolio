(function () {
  const stage = document.getElementById("work");
  const workEl = document.getElementById("workCards");
  const cards = workEl ? Array.from(workEl.querySelectorAll(".work__card")) : [];
  if (!stage || !workEl || cards.length === 0) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  if (prefersReduced || isTouch) return; // keep the plain static grid, no scroll pinning

  stage.classList.add("work-stage--animated");

  // Percent offsets (relative to the cards' own box) and rotation for the
  // clustered "stack" state vs each card's final spread-out grid slot.
  const START = [
    { x: -5, y: -3, rotate: -9, scale: 0.76 },
    { x: 4, y: 2, rotate: 7, scale: 0.8 },
    { x: -1, y: 5, rotate: -3, scale: 0.74 },
  ];
  const END = [
    { x: -34, y: 0, rotate: -2 },
    { x: 0, y: 0, rotate: 0 },
    { x: 34, y: 0, rotate: 2 },
  ];

  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  let ticking = false;

  function render() {
    ticking = false;

    const rect = stage.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    const raw = scrollable > 0 ? clamp01(-rect.top / scrollable) : rect.top < 0 ? 1 : 0;
    const p = easeInOutCubic(raw);

    const box = workEl.getBoundingClientRect();

    cards.forEach((card, i) => {
      const start = START[i % START.length];
      const end = END[i % END.length];
      const x = lerp(start.x, end.x, p);
      const y = lerp(start.y, end.y, p);
      const rotate = lerp(start.rotate, end.rotate, p);
      const scale = lerp(start.scale, 1, p);
      const xPx = (x / 100) * box.width;
      const yPx = (y / 100) * box.height;

      card.style.transform = `translate(calc(-50% + ${xPx}px), calc(-50% + ${yPx}px)) rotate(${rotate}deg) scale(${scale})`;
      card.style.zIndex = String(i + 1);
    });
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(render);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  render();
})();
