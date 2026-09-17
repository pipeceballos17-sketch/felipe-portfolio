(function () {
  const nav = document.querySelector(".nav");
  if (!nav) return;

  // Past this scroll distance the nav shrinks into a floating pill — same
  // content, just smaller (see .nav--collapsed in styles.css). The morph
  // itself is a CSS transition, this only flips the class.
  const COLLAPSE_AT = 120;

  let ticking = false;

  function update() {
    ticking = false;
    nav.classList.toggle("nav--collapsed", window.scrollY > COLLAPSE_AT);
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  update();
})();
