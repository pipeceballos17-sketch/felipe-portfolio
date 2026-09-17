(function () {
  const hero = document.querySelector(".hero");
  const stack = document.querySelector(".photo-stack");
  if (!hero || !stack) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  if (prefersReduced || isTouch) return;

  const layer1 = stack.querySelector(".photo-stack__layer--1");
  const layer2 = stack.querySelector(".photo-stack__layer--2");
  const layer3 = stack.querySelector(".photo-stack__layer--3");
  const photoSvg = stack.querySelector(".photo-stack__photo");
  const photoGroup = photoSvg ? photoSvg.querySelector("g") : null;

  // Depth amplitude in px, back layer -> front card. layer3 and photo MUST
  // share the same depth: the photo sits exactly on top of layer3's mat and
  // has to move in lockstep with it, or they drift apart into a visible gap
  // as soon as the cursor moves off-center.
  const FRONT_DEPTH = 16;
  const DEPTH = { layer1: 5, layer2: 9, layer3: FRONT_DEPTH, photo: FRONT_DEPTH };
  const MOUSE_STRENGTH = 1;
  const SCROLL_LIFT = 26; // extra px (at full depth) the stack drifts up as the hero scrolls away
  const SCROLL_FADE_END = 0.9; // scroll progress through hero at which the stack is fully faded

  let mouseX = 0;
  let mouseY = 0; // -1..1, target from the pointer
  let curX = 0;
  let curY = 0; // eased values actually applied
  let scrollProgress = 0;
  let raf = null;

  function onPointerMove(event) {
    const rect = stack.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX = clamp((event.clientX - cx) / (window.innerWidth / 2), -1, 1);
    mouseY = clamp((event.clientY - cy) / (window.innerHeight / 2), -1, 1);
    schedule();
  }

  function onPointerLeave() {
    mouseX = 0;
    mouseY = 0;
    schedule();
  }

  function onScroll() {
    const rect = hero.getBoundingClientRect();
    const total = rect.height - window.innerHeight * 0.4;
    const passed = -rect.top;
    scrollProgress = clamp(total > 0 ? passed / total : 0, 0, 1);
    schedule();
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function schedule() {
    if (!raf) raf = requestAnimationFrame(render);
  }

  function render() {
    raf = null;
    curX += (mouseX - curX) * 0.08;
    curY += (mouseY - curY) * 0.08;

    const fade = 1 - clamp(scrollProgress / SCROLL_FADE_END, 0, 1);
    stack.style.opacity = fade.toFixed(3);

    setLayerOffset(layer1, DEPTH.layer1);
    setLayerOffset(layer2, DEPTH.layer2);
    setLayerOffset(layer3, DEPTH.layer3);

    if (photoGroup) {
      const rect = stack.getBoundingClientRect();
      // Must match the <svg viewBox="0 0 490.95 499.41"> in index.html exactly.
      const scaleX = rect.width ? 490.95 / rect.width : 0;
      const scaleY = rect.height ? 499.41 / rect.height : 0;
      const offset = layerOffset(DEPTH.photo);
      const gx = (offset.x * scaleX).toFixed(3);
      const gy = (offset.y * scaleY).toFixed(3);
      photoGroup.setAttribute("transform", `translate(${gx} ${gy}) rotate(-15.08 245.475 249.705)`);
    }

    if (Math.abs(mouseX - curX) > 0.001 || Math.abs(mouseY - curY) > 0.001) {
      schedule();
    }
  }

  function layerOffset(depth) {
    const liftFactor = depth / DEPTH.photo;
    return {
      x: curX * depth * MOUSE_STRENGTH,
      y: curY * depth * MOUSE_STRENGTH - scrollProgress * SCROLL_LIFT * liftFactor,
    };
  }

  function setLayerOffset(layer, depth) {
    if (!layer) return;
    const offset = layerOffset(depth);
    layer.style.setProperty("--px", offset.x.toFixed(2) + "px");
    layer.style.setProperty("--py", offset.y.toFixed(2) + "px");
  }

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("mouseleave", onPointerLeave);
  window.addEventListener("blur", onPointerLeave);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  onScroll();
  render();
})();
