(function () {
  const stack = document.querySelector(".photo-stack");
  if (!stack) return;

  const bgs = Array.from(stack.querySelectorAll(".photo-stack__bg"));
  if (bgs.length < 3) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  // Extra rotation "kick" per mat layer, alternating direction so the fan-out
  // reads like a hand of cards being riffled rather than all spinning the
  // same way. Layers always spring back to their normal rotation afterward —
  // this never changes the resting look of the stack, just how it gets there.
  const KICK_DEG = [-16, 12, -9];
  const STAGGER_MS = 60;
  const HOLD_MS = 180;

  let shuffling = false;

  function kick(bg, deg, delay) {
    window.setTimeout(() => {
      bg.style.setProperty("--shuffle-rot", deg + "deg");
      window.setTimeout(() => {
        bg.style.setProperty("--shuffle-rot", "0deg");
      }, HOLD_MS);
    }, delay);
  }

  function shuffle() {
    if (shuffling) return;
    shuffling = true;
    bgs.forEach((bg, i) => kick(bg, KICK_DEG[i % KICK_DEG.length], i * STAGGER_MS));
    window.setTimeout(() => {
      shuffling = false;
    }, bgs.length * STAGGER_MS + HOLD_MS + 650);
  }

  stack.classList.add("photo-stack--shufflable");
  stack.addEventListener("click", shuffle);
})();
