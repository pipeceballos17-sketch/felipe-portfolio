(function () {
  const stack = document.getElementById("photoStack");
  const reveal = document.getElementById("photoReveal");
  if (!stack || !reveal) return;

  function open() {
    reveal.classList.add("is-open");
    stack.setAttribute("aria-expanded", "true");
  }

  function close() {
    reveal.classList.remove("is-open");
    stack.setAttribute("aria-expanded", "false");
  }

  function toggle(event) {
    event.stopPropagation();
    if (reveal.classList.contains("is-open")) close();
    else open();
  }

  stack.addEventListener("click", toggle);

  document.addEventListener("click", (event) => {
    if (reveal.classList.contains("is-open") && !stack.contains(event.target)) {
      close();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
})();
