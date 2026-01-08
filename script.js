(function () {
  const domainEl = document.getElementById("domainText");
  const copyBtn = document.getElementById("copyBtn");
  const statusEl = document.getElementById("status");
  const yearEl = document.getElementById("year");

  const langBtn = document.getElementById("langBtn");
  const langPill = document.getElementById("langPill");

  const generateBtn = document.getElementById("generateBtn");
  const copyMsgBtn = document.getElementById("copyMsgBtn");
  const msgEl = document.getElementById("message");

  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const offerEl = document.getElementById("offer");
  const useEl = document.getElementById("use");

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const host = window.location.hostname;
  if (domainEl && host && host.includes(".") && !host.includes("localhost")) {
    domainEl.textContent = host;
    document.title = `${host} is for sale`;

    const emailBtn = document.getElementById("emailBtn");
    if (emailBtn) {
      const base = emailBtn.getAttribute("href") || "";
      emailBtn.setAttribute("href", base.replace(/YOURDOMAIN\.COM/g, host));
    }
  }

  const i18n = {
    en: {
      language: "English",
      brand: "Domain Marketplace",
      badge: "Premium Domain Available",
      headline: "This domain is for sale.",
      subhead: "A short, brandable domain that’s perfect for a startup, business, or personal brand.",
      t1_title: "Fast to remember",
      t1_text: "Clean, simple, and easy to type.",
      t2_title: "Brand-ready",
      t2_text: "Ideal for ads, social, and SEO.",
      t3_title: "Secure transfer",
      t3_text: "Safe ownership transfer via trusted platforms.",
      cta_title: "Interested?",
      cta_text: "Send your best offer and I’ll reply quickly.",
      btn_email: "Email Offer",
      btn_copy: "Copy Domain",
      form_title: "Quick Offer Form",
      form_desc: "Fill this in and copy the message. You can paste it in email/WhatsApp.",
      f_name: "Your Name",
      f_email: "Email",
      f_offer: "Offer (EUR)",
      f_use: "Intended use",
      btn_generate: "Generate Message",
      btn_copymsg: "Copy Message",
      note: "Tip: If you want, add “Buy Now” price in the text later. Keeping it “Make an offer” often increases inquiries.",
      footer_left: "©",
      footer_mid: "Domain listed privately",
      copiedDomain: "Domain copied.",
      copiedMsg: "Message copied.",
      generated: "Message generated."
    },
    it: {
      language: "Italiano",
      brand: "Marketplace Domini",
      badge: "Dominio Premium Disponibile",
      headline: "Questo dominio è in vendita.",
      subhead: "Un dominio breve e memorabile, perfetto per startup, business o personal brand.",
      t1_title: "Facile da ricordare",
      t1_text: "Pulito, semplice e veloce da digitare.",
      t2_title: "Pronto per il brand",
      t2_text: "Ideale per ads, social e SEO.",
      t3_title: "Trasferimento sicuro",
      t3_text: "Passaggio di proprietà in modo sicuro tramite piattaforme affidabili.",
      cta_title: "Interessato?",
      cta_text: "Invia la tua migliore offerta e risponderò rapidamente.",
      btn_email: "Invia Offerta via Email",
      btn_copy: "Copia Dominio",
      form_title: "Modulo Offerta Veloce",
      form_desc: "Compila e copia il messaggio. Puoi incollarlo in email/WhatsApp.",
      f_name: "Nome",
      f_email: "Email",
      f_offer: "Offerta (EUR)",
      f_use: "Uso previsto",
      btn_generate: "Genera Messaggio",
      btn_copymsg: "Copia Messaggio",
      note: "Suggerimento: puoi aggiungere un prezzo “Compra Subito” più tardi. Lasciare “Fai un’offerta” spesso aumenta i contatti.",
      footer_left: "©",
      footer_mid: "Dominio in vendita privatamente",
      copiedDomain: "Dominio copiato.",
      copiedMsg: "Messaggio copiato.",
      generated: "Messaggio generato."
    }
  };

  let currentLang = "en";

  function setStatus(text) {
    if (!statusEl) return;
    statusEl.textContent = text;
    clearTimeout(setStatus._t);
    setStatus._t = setTimeout(() => (statusEl.textContent = ""), 2200);
  }

  function applyLang(lang) {
    currentLang = lang;
    if (langPill) langPill.textContent = lang.toUpperCase();
    document.documentElement.lang = lang;

    const dict = i18n[lang];
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });
  }

  if (langBtn) {
    langBtn.addEventListener("click", () => {
      applyLang(currentLang === "en" ? "it" : "en");
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const domain = domainEl ? domainEl.textContent.trim() : "";
      try {
        await navigator.clipboard.writeText(domain);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = domain;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      setStatus(i18n[currentLang].copiedDomain);
    });
  }

  function buildMessage() {
    const domain = domainEl ? domainEl.textContent.trim() : "";
    const name = (nameEl?.value || "").trim();
    const email = (emailEl?.value || "").trim();
    const offer = (offerEl?.value || "").trim();
    const use = (useEl?.value || "").trim();

    if (currentLang === "it") {
      return `Ciao,
Vorrei fare un’offerta per il dominio: ${domain}

Offerta (EUR): ${offer || "-"}
Nome: ${name || "-"}
Email: ${email || "-"}
Uso previsto: ${use || "-"}

Grazie!`;
    }

    return `Hi,
I’d like to make an offer for the domain: ${domain}

Offer (EUR): ${offer || "-"}
Name: ${name || "-"}
Email: ${email || "-"}
Intended use: ${use || "-"}

Thanks!`;
  }

  if (generateBtn) {
    generateBtn.addEventListener("click", () => {
      msgEl.value = buildMessage();
      setStatus(i18n[currentLang].generated);
    });
  }

  if (copyMsgBtn) {
    copyMsgBtn.addEventListener("click", async () => {
      const text = msgEl.value.trim() || buildMessage();
      msgEl.value = text;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        msgEl.focus();
        msgEl.select();
        document.execCommand("copy");
      }
      setStatus(i18n[currentLang].copiedMsg);
    });
  }

  applyLang("en");
})();

(function () {
  const overlay = document.getElementById("saleOverlay");
  if (!overlay) return;

  const autoClose = setTimeout(hideOverlay, 2000);

  function hideOverlay() {
    overlay.classList.add("hide");
    clearTimeout(autoClose);
  }

  overlay.addEventListener("click", hideOverlay);
})();
