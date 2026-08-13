
(function () {
  const KEY = "sitegen_cookie_preferences_v2";

  function getPrefs() {
    try { return JSON.parse(localStorage.getItem(KEY) || "null"); }
    catch (_) { return null; }
  }

  function savePrefs(prefs) {
    localStorage.setItem(KEY, JSON.stringify({
      necessary: true,
      analytics: !!prefs.analytics,
      marketing: !!prefs.marketing,
      updatedAt: new Date().toISOString()
    }));
    closeAll();
    window.dispatchEvent(new CustomEvent("sitegen:cookie-consent", { detail: getPrefs() }));
  }

  function closeAll() {
    document.getElementById("cookie-banner")?.classList.remove("is-visible");
    document.getElementById("cookie-modal")?.classList.remove("is-visible");
  }

  function openSettings() {
    const prefs = getPrefs() || {analytics:false, marketing:false};
    document.getElementById("cookie-analytics").checked = !!prefs.analytics;
    document.getElementById("cookie-marketing").checked = !!prefs.marketing;
    document.getElementById("cookie-modal").classList.add("is-visible");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const banner = document.createElement("div");
    banner.id = "cookie-banner";
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Preferências de cookies");
    banner.innerHTML = `
      <div class="cookie-banner-inner">
        <div>
          <h3>Privacidade e cookies</h3>
          <p>Usamos armazenamento estritamente necessário para lembrar suas preferências. Cookies analíticos e de marketing permanecem desativados até sua autorização. Leia nossa <a href="/cookies.html" style="color:#79d9ff">Política de Cookies</a> e a <a href="/privacidade.html" style="color:#79d9ff">Política de Privacidade e LGPD</a>.</p>
        </div>
        <div class="cookie-actions">
          <button class="cookie-secondary" id="cookie-reject">Rejeitar não essenciais</button>
          <button class="cookie-secondary" id="cookie-manage">Gerenciar</button>
          <button class="cookie-primary" id="cookie-accept">Aceitar todos</button>
        </div>
      </div>`;
    document.body.appendChild(banner);

    const modal = document.createElement("div");
    modal.id = "cookie-modal";
    modal.className = "cookie-modal";
    modal.innerHTML = `
      <div class="cookie-panel" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
        <h2 id="cookie-title">Gerenciar cookies</h2>
        <p>Escolha quais categorias não essenciais você autoriza. Cookies estritamente necessários não podem ser desativados porque são usados para segurança e para lembrar sua escolha.</p>
        <div class="cookie-row">
          <div><strong>Necessários</strong><small>Preferências de consentimento e funcionamento essencial do site.</small></div>
          <input class="cookie-switch" type="checkbox" checked disabled aria-label="Cookies necessários sempre ativos">
        </div>
        <div class="cookie-row">
          <div><strong>Analíticos</strong><small>Podem ser usados futuramente para medir visitas e desempenho. Permanecem desativados sem autorização.</small></div>
          <input id="cookie-analytics" class="cookie-switch" type="checkbox" aria-label="Permitir cookies analíticos">
        </div>
        <div class="cookie-row">
          <div><strong>Marketing</strong><small>Podem ser usados futuramente para campanhas e mensuração publicitária. Permanecem desativados sem autorização.</small></div>
          <input id="cookie-marketing" class="cookie-switch" type="checkbox" aria-label="Permitir cookies de marketing">
        </div>
        <div class="cookie-panel-actions">
          <button class="cookie-secondary" id="cookie-close" style="color:#0d1a2d;border-color:#cbd2dc">Cancelar</button>
          <button class="cookie-primary" id="cookie-save">Salvar preferências</button>
        </div>
      </div>`;
    document.body.appendChild(modal);

    if (!getPrefs()) banner.classList.add("is-visible");

    document.getElementById("cookie-accept").onclick = () => savePrefs({analytics:true, marketing:true});
    document.getElementById("cookie-reject").onclick = () => savePrefs({analytics:false, marketing:false});
    document.getElementById("cookie-manage").onclick = openSettings;
    document.getElementById("cookie-close").onclick = closeAll;
    document.getElementById("cookie-save").onclick = () => savePrefs({
      analytics: document.getElementById("cookie-analytics").checked,
      marketing: document.getElementById("cookie-marketing").checked
    });
    document.getElementById("open-cookie-settings")?.addEventListener("click", openSettings);
  });
})();
