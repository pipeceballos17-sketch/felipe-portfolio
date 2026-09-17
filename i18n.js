(function () {
  const LANG_KEY = "site-lang";
  const DEFAULT_LANG = "en";

  const dict = {
    en: {
      "nav.about": "About me",
      "nav.work": "My Work",
      "nav.agent": "Ask my agent",
      "nav.cta": "Let's talk",
      "hero.greeting": "Hi!",
      "hero.titleRest": " I'm Felipe, a product builder & designer",
      "hero.bio": "I design it, I build it with AI, and I look at the numbers after. Product designer from Bogotá, Colombia",
      "hero.cta": "See the work",
      "social.checkMySocials": "Check my socials",
      "about.eyebrow": "About",
      "about.heading": "Design, built and measured.",
      "about.bio1": "I'm Felipe, a product designer based in Bogotá, Colombia. I like owning the whole loop — from the first sketch in Figma to the shipped interface, and then back into the data to see if it actually worked.",
      "about.bio2": "AI is part of how I work, not just what I design. I use it to move faster from idea to working product — prototyping, building, and automating the parts that used to take days — so I can spend more time on the decisions that actually need a human.",
      "about.group.design": "Product design",
      "about.group.branding": "Branding",
      "about.group.build": "Build",
      "about.group.data": "Data & automation",
      "about.tag.figma": "Figma",
      "about.tag.prototyping": "Prototyping",
      "about.tag.designSystems": "Design systems",
      "about.tag.visualIdentity": "Visual identity",
      "about.tag.brandStrategy": "Brand strategy",
      "about.tag.artDirection": "Art direction",
      "about.tag.aiDev": "AI-assisted dev",
      "about.tag.rapidPrototyping": "Rapid prototyping",
      "about.tag.dashboards": "Dashboards",
      "about.tag.analytics": "Analytics",
      "about.tag.aiAgents": "AI agents",
      "work.card1.eyebrow": "Product design + Branding",
      "work.card2.eyebrow": "Product design",
      "work.card3.eyebrow": "Branding",
      "agent.heading": "Or... Ask my agent anything about me",
      "agent.placeholder": "Ask anything about me…",
      "agent.chip1": "What tools do you use?",
      "agent.chip2": "Where are you based?",
      "agent.chip3": "What's your design process?",
      "agent.chip4": "How does AI fit into your work?",
      "agent.note": "Thanks! This demo doesn't have a live AI agent wired up yet, so nothing was actually sent.",
      "contact.name": "Name",
      "contact.email": "Email",
      "contact.message": "Message",
      "contact.submit": "Send message",
      "contact.note": "Opening your email app…",
      "footer.eyebrow": "Get in touch",
      "footer.tagline": "Design it. Build it. Measure it. Repeat.",
      "footer.rights": "All rights reserved.",
    },
    es: {
      "nav.about": "Sobre mí",
      "nav.work": "Mi trabajo",
      "nav.agent": "Preguntale a mi agente",
      "nav.cta": "Hablemos",
      "hero.greeting": "¡Hola!",
      "hero.titleRest": " Soy Felipe, product builder y diseñador",
      "hero.bio": "Lo diseño, lo construyo con IA, y después reviso los números. Diseñador de producto desde Bogotá, Colombia",
      "hero.cta": "Ver el trabajo",
      "social.checkMySocials": "Mirá mis redes",
      "about.eyebrow": "Sobre mí",
      "about.heading": "Diseñado, construido y medido.",
      "about.bio1": "Soy Felipe, diseñador de producto desde Bogotá, Colombia. Me gusta encargarme de todo el ciclo — desde el primer boceto en Figma hasta la interfaz ya en producción, y después volver a los datos para ver si realmente funcionó.",
      "about.bio2": "La IA es parte de cómo trabajo, no solo de lo que diseño. La uso para pasar más rápido de la idea al producto funcionando — prototipando, construyendo y automatizando lo que antes tomaba días — así puedo dedicar más tiempo a las decisiones que sí necesitan un humano.",
      "about.group.design": "Diseño de producto",
      "about.group.branding": "Branding",
      "about.group.build": "Construcción",
      "about.group.data": "Datos y automatización",
      "about.tag.figma": "Figma",
      "about.tag.prototyping": "Prototipado",
      "about.tag.designSystems": "Sistemas de diseño",
      "about.tag.visualIdentity": "Identidad visual",
      "about.tag.brandStrategy": "Estrategia de marca",
      "about.tag.artDirection": "Dirección de arte",
      "about.tag.aiDev": "Desarrollo asistido con IA",
      "about.tag.rapidPrototyping": "Prototipado rápido",
      "about.tag.dashboards": "Dashboards",
      "about.tag.analytics": "Analítica",
      "about.tag.aiAgents": "Agentes de IA",
      "work.card1.eyebrow": "Diseño de producto + Branding",
      "work.card2.eyebrow": "Diseño de producto",
      "work.card3.eyebrow": "Branding",
      "agent.heading": "O... preguntale a mi agente lo que quieras sobre mí",
      "agent.placeholder": "Preguntá lo que quieras sobre mí…",
      "agent.chip1": "¿Qué herramientas usás?",
      "agent.chip2": "¿Dónde estás basado?",
      "agent.chip3": "¿Cuál es tu proceso de diseño?",
      "agent.chip4": "¿Cómo se mete la IA en tu trabajo?",
      "agent.note": "¡Gracias! Esta demo todavía no tiene un agente de IA real conectado, así que no se envió nada.",
      "contact.name": "Nombre",
      "contact.email": "Correo",
      "contact.message": "Mensaje",
      "contact.submit": "Enviar mensaje",
      "contact.note": "Abriendo tu app de correo…",
      "footer.eyebrow": "Contacto",
      "footer.tagline": "Diseñalo. Construilo. Medilo. Repetí.",
      "footer.rights": "Todos los derechos reservados.",
    },
  };

  let currentLang = DEFAULT_LANG;
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && dict[saved]) currentLang = saved;
  } catch (e) {
    /* localStorage unavailable (private mode, etc.) — fall back to default */
  }

  const switchEl = document.getElementById("langSwitch");

  function applyLang(lang) {
    const t = dict[lang] || dict[DEFAULT_LANG];
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (t[key] != null) el.textContent = t[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (t[key] != null) el.setAttribute("placeholder", t[key]);
    });

    if (switchEl) {
      switchEl.setAttribute("data-active", lang);
      switchEl.querySelectorAll(".lang-switch__btn").forEach((btn) => {
        btn.classList.toggle("is-active", btn.dataset.lang === lang);
      });
    }
  }

  function setLang(lang) {
    if (!dict[lang] || lang === currentLang) return;
    currentLang = lang;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {
      /* ignore */
    }
    applyLang(lang);
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  if (switchEl) {
    switchEl.addEventListener("click", (event) => {
      const btn = event.target.closest(".lang-switch__btn");
      if (!btn) return;
      setLang(btn.dataset.lang);
    });
  }

  applyLang(currentLang);

  // Exposed so other scripts (agent-chat.js) can look up strings that get
  // set dynamically at runtime, not just on load.
  window.i18n = {
    t(key) {
      return (dict[currentLang] && dict[currentLang][key]) || (dict[DEFAULT_LANG] && dict[DEFAULT_LANG][key]) || key;
    },
    get lang() {
      return currentLang;
    },
  };
})();
