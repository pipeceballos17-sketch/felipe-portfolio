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
      "work.card3.eyebrow": "Branding + Product design",
      "work.card4.eyebrow": "Product design",
      "work.seeAll": "See all my work →",
      "workIndex.eyebrow": "Work",
      "workIndex.heading": "Everything I've shipped.",
      "workDetail.back": "← All work",
      "workDetail.screens": "App screens",
      "workDetail.wireframes": "Wireframes",
      "gs.login.t": "Login",
      "gs.login.d": "A friendly welcome back, with the Buddy waiting for you.",
      "gs.tipo.t": "Diabetes type",
      "gs.tipo.d": "First onboarding step: personalizes the health panel and the Buddy.",
      "gs.medidor.t": "Connect your meter",
      "gs.medidor.d": "Pairs the glucose sensor in three steps, or lets you log manually.",
      "gs.buddy.t": "Meet your Buddy",
      "gs.buddy.d": "Introduces the avatar that reflects your glucose and can be customized later.",
      "gs.rango.t": "Ideal range",
      "gs.rango.d": "Sets the glucose range for alerts and asks for notification, calendar and health permissions.",
      "gs.home.t": "Home",
      "gs.home.d": "The avatar and the current reading at a glance, plus last meal, time in range and insulin.",
      "gs.lecturas.t": "Readings",
      "gs.lecturas.d": "Real-time sensor data with a 3-hour trend and prediction.",
      "gs.historial.t": "History",
      "gs.historial.d": "A daily timeline of readings, meals, insulin and alerts, exportable as PDF.",
      "gs.plan.t": "Wellness plan",
      "gs.plan.d": "Daily tasks to check off, with tips from the Buddy.",
      "gs.calendario.t": "Calendar",
      "gs.calendario.d": "Medical appointments and reminders in one monthly view.",
      "gs.perfil.t": "Profile",
      "gs.perfil.d": "Level, streak and time in range, with shortcuts to wardrobe, achievements and supplies.",
      "gs.vestidor.t": "Wardrobe",
      "gs.vestidor.d": "Unlock and equip accessories to customize your avatar.",
      "gs.logros.t": "Achievements",
      "gs.logros.d": "Streaks, badges and XP that reward consistent care.",
      "gs.insumos.t": "Supplies",
      "gs.insumos.d": "Alerts when test strips or insulin are running low.",
      "gs.pedir.t": "Request supplies",
      "gs.pedir.d": "Review stock, set quantities and request them from the health insurer (EPS).",
      "workDetail.roleLabel": "Role",
      "workDetail.typeLabel": "Type",
      "workDetail.glubuddy.role": "Product Designer",
      "workDetail.glubuddy.type": "Branding + Product design",
      "workDetail.glubuddy.summary": "Glubuddy is a friendly glucose-tracking experience for young people living with diabetes. A customizable avatar keeps them company and helps them keep track of their glucose through a connected sensor. As the Product Designer, I shaped the experience and the interface. This was a class project: a prototype that never became a real product.",
      "workDetail.placeholder": "More about this project — the problem, my role, and the process — is coming soon.",
      "photos.eyebrow": "Photos",
      "photos.heading": "A few personal frames.",
      "agent.heading": "Or... Ask my agent anything about me",
      "agent.placeholder": "Ask anything about me…",
      "agent.chip1": "What tools do you use?",
      "agent.chip2": "Where are you based?",
      "agent.chip3": "What's your design process?",
      "agent.chip4": "How does AI fit into your work?",
      "agent.note": "Thanks! This demo doesn't have a live AI agent wired up yet, so nothing was actually sent.",
      "contact.whatsapp": "Message me on WhatsApp",
      "contact.orEmail": "or email me",
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
      "work.card3.eyebrow": "Branding + Diseño de producto",
      "work.card4.eyebrow": "Diseño de producto",
      "work.seeAll": "Ver todo mi trabajo →",
      "workIndex.eyebrow": "Trabajo",
      "workIndex.heading": "Todo lo que he construido.",
      "workDetail.back": "← Todo el trabajo",
      "workDetail.placeholder": "Más sobre este proyecto — el problema, mi rol y el proceso — está por venir.",
      "workDetail.screens": "Pantallas de la app",
      "workDetail.wireframes": "Wireframes",
      "gs.login.t": "Inicio de sesión",
      "gs.login.d": "Una bienvenida cercana, con el Buddy esperándote.",
      "gs.tipo.t": "Tipo de diabetes",
      "gs.tipo.d": "Primer paso del onboarding: personaliza tu panel de salud y tu Buddy.",
      "gs.medidor.t": "Conecta tu medidor",
      "gs.medidor.d": "Vincula el sensor de glucosa en tres pasos, o permite el registro manual.",
      "gs.buddy.t": "Conoce a tu Buddy",
      "gs.buddy.d": "Presenta al avatar que refleja tu glucosa y que podrás personalizar después.",
      "gs.rango.t": "Rango ideal",
      "gs.rango.d": "Define el rango de glucosa para las alertas y pide permisos de notificaciones, calendario y salud.",
      "gs.home.t": "Inicio",
      "gs.home.d": "El avatar y la lectura actual de un vistazo, con última comida, tiempo en rango e insulina.",
      "gs.lecturas.t": "Lecturas",
      "gs.lecturas.d": "Datos del sensor en tiempo real con tendencia y predicción de 3 horas.",
      "gs.historial.t": "Historial",
      "gs.historial.d": "Línea de tiempo diaria de lecturas, comidas, insulina y alertas, exportable en PDF.",
      "gs.plan.t": "Plan de bienestar",
      "gs.plan.d": "Tareas diarias para marcar, con tips del Buddy.",
      "gs.calendario.t": "Calendario",
      "gs.calendario.d": "Citas médicas y recordatorios en una vista mensual.",
      "gs.perfil.t": "Perfil",
      "gs.perfil.d": "Nivel, racha y tiempo en rango, con accesos al vestidor, logros e insumos.",
      "gs.vestidor.t": "Vestidor",
      "gs.vestidor.d": "Desbloquea y equipa accesorios para personalizar tu avatar.",
      "gs.logros.t": "Logros",
      "gs.logros.d": "Rachas, insignias y XP que premian el autocuidado constante.",
      "gs.insumos.t": "Insumos",
      "gs.insumos.d": "Alertas cuando las tiras reactivas o la insulina se están acabando.",
      "gs.pedir.t": "Pedir insumos",
      "gs.pedir.d": "Revisa existencias, elige cantidades y solicítalas a la EPS.",
      "workDetail.roleLabel": "Rol",
      "workDetail.typeLabel": "Tipo",
      "workDetail.glubuddy.role": "Product Designer",
      "workDetail.glubuddy.type": "Branding + Diseño de producto",
      "workDetail.glubuddy.summary": "Glubuddy es una experiencia amigable para jóvenes que viven con diabetes. Un avatar personalizable los acompaña y les permite llevar el registro de su glucosa a través de la conexión con un sensor. Como Product Designer, diseñé la experiencia y la interfaz. Fue un trabajo de clase: un prototipo que no llegó a ser un producto real.",
      "photos.eyebrow": "Fotos",
      "photos.heading": "Algunas fotos personales.",
      "agent.heading": "O... preguntale a mi agente lo que quieras sobre mí",
      "agent.placeholder": "Preguntá lo que quieras sobre mí…",
      "agent.chip1": "¿Qué herramientas usás?",
      "agent.chip2": "¿Dónde estás basado?",
      "agent.chip3": "¿Cuál es tu proceso de diseño?",
      "agent.chip4": "¿Cómo se mete la IA en tu trabajo?",
      "agent.note": "¡Gracias! Esta demo todavía no tiene un agente de IA real conectado, así que no se envió nada.",
      "contact.whatsapp": "Escribime por WhatsApp",
      "contact.orEmail": "o escribime un correo",
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
