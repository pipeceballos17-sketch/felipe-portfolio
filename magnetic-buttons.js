(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  if (prefersReduced || isTouch) return;

  const targets = Array.from(document.querySelectorAll(".cta__button, .cta__arrow, .nav__cta, .nav__agent, .social-pill a, .contact-form__submit"));
  if (!targets.length) return;

  const STRENGTH = 0.35;
  const MAX_OFFSET = 14;
  const RADIUS_PAD = 34; // extra px beyond the element's own box that still attracts it

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function onPointerMove(event) {
    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const radius = Math.max(rect.width, rect.height) / 2 + RADIUS_PAD;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        const pull = 1 - dist / radius;
        const mx = clamp(dx * STRENGTH * pull, -MAX_OFFSET, MAX_OFFSET);
        const my = clamp(dy * STRENGTH * pull, -MAX_OFFSET, MAX_OFFSET);
        el.style.setProperty("--mx", mx.toFixed(2) + "px");
        el.style.setProperty("--my", my.toFixed(2) + "px");
      } else {
        el.style.setProperty("--mx", "0px");
        el.style.setProperty("--my", "0px");
      }
    });
  }

  function reset() {
    targets.forEach((el) => {
      el.style.setProperty("--mx", "0px");
      el.style.setProperty("--my", "0px");
    });
  }

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("mouseleave", reset);
  window.addEventListener("blur", reset);
})();
