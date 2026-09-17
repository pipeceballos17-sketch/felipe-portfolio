document.querySelectorAll('.nav__links a[href^="#"], .nav__cta[href^="#"], .footer__links a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const agentBtn = document.getElementById("navAgentBtn");
if (agentBtn) {
  agentBtn.addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("focus-agent-chat"));
  });
}

const contactBtn = document.getElementById("navContactBtn");
if (contactBtn) {
  contactBtn.addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("focus-contact-form"));
  });
}

const footerYear = document.getElementById("footerYear");
if (footerYear) {
  footerYear.textContent = String(new Date().getFullYear());
}
