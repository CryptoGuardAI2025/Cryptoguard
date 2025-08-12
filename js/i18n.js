
const I18N = {
  de: {
    nav_start: "Start", nav_krypto: "Krypto", nav_shop:"Shop", nav_blog:"Blog", nav_about:"Über uns",
    hero_title: "Wir setzen den Maßstab für klare Entscheidungen im Kryptomarkt.",
    hero_lead: "Live-Daten, geprüfte Informationen und konservative Modell-Prognosen – Ehrlichkeit vor Hype.",
    tab_krypto:"Krypto", tab_shop:"Shop",
    ai_title:"Schnellprognose",
    ai_hint:"Coin (z.B. bitcoin, ethereum, solana, ripple)",
    ai_btn:"Prognose berechnen",
    no_advice:"Keine Finanzberatung.",
    cats_trader:"Trader", cats_investor:"Investoren", cats_anf:"Anfänger",
    trader_desc:"Kurzfristige Strategien mit klaren Regeln.",
    investor_desc:"Langfristige Allokation & Disziplin.",
    anf_desc:"Sicherheit & erste Schritte.",
    more:"Mehr",
    footer_disclaimer:"Disclaimer", footer_terms:"Nutzungsbedingungen", footer_privacy:"Datenschutz",
    login:"Login"
  },
  en: {
    nav_start: "Home", nav_krypto: "Crypto", nav_shop:"Shop", nav_blog:"Blog", nav_about:"About",
    hero_title: "We set the standard for clear decisions in crypto markets.",
    hero_lead: "Live data, vetted information and conservative model forecasts — honesty over hype.",
    tab_krypto:"Crypto", tab_shop:"Shop",
    ai_title:"Quick Forecast",
    ai_hint:"Coin (e.g. bitcoin, ethereum, solana, ripple)",
    ai_btn:"Calculate forecast",
    no_advice:"No financial advice.",
    cats_trader:"Traders", cats_investor:"Investors", cats_anf:"Beginners",
    trader_desc:"Short-term strategies with clear rules.",
    investor_desc:"Long-term allocation & discipline.",
    anf_desc:"Security & first steps.",
    more:"More",
    footer_disclaimer:"Disclaimer", footer_terms:"Terms", footer_privacy:"Privacy",
    login:"Login"
  }
};
function setLang(l){ localStorage.setItem('lang', l); applyLang(); }
function applyLang(){
  const l = localStorage.getItem('lang') || 'de';
  const dict = I18N[l];
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(dict[key]) el.textContent = dict[key];
  });
}
document.addEventListener('DOMContentLoaded',applyLang);
