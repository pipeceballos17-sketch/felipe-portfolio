(function () {
  const root = document.getElementById("agentChat");
  if (!root) return;

  const card = document.getElementById("agentChatCard");
  const placeholderBtn = document.getElementById("agentChatPlaceholder");
  const textarea = document.getElementById("agentChatTextarea");
  const sendBtn = document.getElementById("agentChatSend");
  const fileInput = document.getElementById("agentChatFile");
  const attachBtn = document.getElementById("agentChatAttachBtn");
  const attachmentsWrap = document.getElementById("agentChatAttachments");
  const effortBtn = document.getElementById("agentChatEffortBtn");
  const effortLabel = document.getElementById("agentChatEffortLabel");
  const bars = document.querySelectorAll("#agentChatBars i");
  const note = document.getElementById("agentChatNote");
  const suggestions = document.getElementById("agentChatSuggestions");

  const EFFORTS = ["Low", "Balanced", "Max"];
  const MAX_ATTACHMENTS = 6;

  let effortIndex = 1;
  let attachments = [];
  let expanded = false;
  let noteTimer = null;

  function setBars() {
    bars.forEach((bar, i) => bar.classList.toggle("is-active", i <= effortIndex));
  }
  setBars();

  function hasContent() {
    return textarea.value.trim() !== "" || attachments.length > 0;
  }

  function updateSendState() {
    sendBtn.classList.toggle("is-active", hasContent());
  }

  function expand() {
    if (suggestions) suggestions.hidden = true;
    if (expanded) return;
    expanded = true;
    card.classList.add("is-expanded");
    requestAnimationFrame(() => textarea.focus());
  }

  function collapse() {
    if (!expanded || hasContent()) return;
    expanded = false;
    card.classList.remove("is-expanded");
    if (suggestions) suggestions.hidden = false;
  }

  function autoresize() {
    textarea.style.height = "auto";
    const next = Math.max(88, Math.min(textarea.scrollHeight, 220));
    textarea.style.height = next + "px";
    card.style.setProperty("--agent-chat-height", next + 56 + "px");
  }

  placeholderBtn.addEventListener("click", expand);
  textarea.addEventListener("focus", expand);

  document.addEventListener("focus-agent-chat", () => {
    // Give the smooth-scroll from the nav button time to land before expanding.
    setTimeout(expand, 450);
  });

  textarea.addEventListener("input", () => {
    autoresize();
    updateSendState();
  });

  textarea.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
    if (event.key === "Escape" && !hasContent()) {
      textarea.blur();
      collapse();
    }
  });

  root.addEventListener("focusout", (event) => {
    if (root.contains(event.relatedTarget)) return;
    setTimeout(collapse, 0);
  });

  if (suggestions) {
    suggestions.querySelectorAll(".agent-chat__chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        textarea.value = chip.textContent.trim();
        expand();
        autoresize();
        updateSendState();
        requestAnimationFrame(() => {
          textarea.focus();
          textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        });
      });
    });
  }

  effortBtn.addEventListener("click", () => {
    effortIndex = (effortIndex + 1) % EFFORTS.length;
    effortLabel.textContent = EFFORTS[effortIndex];
    setBars();
  });

  attachBtn.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", () => {
    const files = Array.from(fileInput.files || []).filter((file) => file.type.startsWith("image/"));
    fileInput.value = "";
    const room = Math.max(0, MAX_ATTACHMENTS - attachments.length);
    files.slice(0, room).forEach((file) => {
      attachments.push({
        id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
        file,
        url: URL.createObjectURL(file),
      });
    });
    renderAttachments();
    updateSendState();
  });

  function renderAttachments() {
    attachmentsWrap.hidden = attachments.length === 0;
    attachmentsWrap.innerHTML = attachments
      .map(
        (attachment) => `
        <div class="agent-chat__thumb" data-id="${attachment.id}">
          <img src="${attachment.url}" alt="${attachment.file.name}" />
          <button type="button" aria-label="Remove ${attachment.file.name}">&times;</button>
        </div>`
      )
      .join("");
  }

  attachmentsWrap.addEventListener("click", (event) => {
    const thumb = event.target.closest(".agent-chat__thumb");
    if (!thumb) return;
    const id = thumb.dataset.id;
    const removeBtn = event.target.closest("button");

    if (removeBtn) {
      const target = attachments.find((a) => a.id === id);
      if (target) URL.revokeObjectURL(target.url);
      attachments = attachments.filter((a) => a.id !== id);
      renderAttachments();
      updateSendState();
      return;
    }

    const item = attachments.find((a) => a.id === id);
    if (item) openPreview(item);
  });

  function openPreview(item) {
    const modal = document.createElement("div");
    modal.className = "agent-chat__modal";
    modal.innerHTML = `<img src="${item.url}" alt="${item.file.name}" /><button type="button" class="close" aria-label="Close preview">&times;</button>`;
    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add("is-open"));

    function close() {
      modal.classList.remove("is-open");
      setTimeout(() => modal.remove(), 250);
      document.removeEventListener("keydown", onKey);
    }

    function onKey(event) {
      if (event.key === "Escape") close();
    }

    modal.addEventListener("click", (event) => {
      if (event.target === modal || event.target.closest(".close")) close();
    });
    document.addEventListener("keydown", onKey);
  }

  sendBtn.addEventListener("click", submit);

  function submit() {
    if (!hasContent()) return;

    // No backend is wired up for this widget yet — this only logs locally
    // and gives the visitor an honest acknowledgement instead of a fake AI reply.
    console.log("Agent widget submission:", {
      message: textarea.value.trim(),
      effort: EFFORTS[effortIndex],
      attachments: attachments.map((a) => a.file.name),
    });

    clearTimeout(noteTimer);
    note.textContent = window.i18n
      ? window.i18n.t("agent.note")
      : "Thanks! This demo doesn't have a live AI agent wired up yet, so nothing was actually sent.";
    noteTimer = setTimeout(() => {
      note.textContent = "";
    }, 6000);

    textarea.value = "";
    attachments.forEach((a) => URL.revokeObjectURL(a.url));
    attachments = [];
    renderAttachments();
    autoresize();
    updateSendState();
    collapse();
  }

  updateSendState();
})();
