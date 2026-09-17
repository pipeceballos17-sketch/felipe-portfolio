(function () {
  const logos = document.querySelectorAll(".brand-logo");
  if (!logos.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  logos.forEach((logo) => {
    const lid = logo.querySelector(".brand-logo__lid");
    if (!lid) return;

    logo.addEventListener("click", () => {
      lid.classList.remove("is-blinking");
      void lid.offsetWidth; // restart the animation on rapid repeat clicks
      lid.classList.add("is-blinking");
    });
  });
})();
