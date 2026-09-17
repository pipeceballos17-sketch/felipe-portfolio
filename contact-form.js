(function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const CONTACT_EMAIL = "pipe.ceballos17@gmail.com";

  const nameInput = document.getElementById("contactName");
  const emailInput = document.getElementById("contactEmail");
  const messageInput = document.getElementById("contactMessage");
  const note = document.getElementById("contactFormNote");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    note.textContent = window.i18n ? window.i18n.t("contact.note") : "Opening your email app…";
  });

  document.addEventListener("focus-contact-form", () => {
    // Give the smooth-scroll from the nav button time to land before focusing.
    setTimeout(() => nameInput.focus(), 450);
  });
})();
