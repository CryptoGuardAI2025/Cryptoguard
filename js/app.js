
// i18n minimal (DE/EN) using data-i18n keys
const dict = {
  de: {
    nav_home: "Start",
    nav_crypto: "Krypto",
    nav_shop: "Shop",
    nav_blog: "Blog",
    nav_about: "Über uns",
    hero_title: "Wir setzen den Maßstab für klare Entscheidungen im Kryptomarkt.",
    hero_lead: "Live-Daten, geprüfte Informationen und konservative Modell-Prognosen – Ehrlichkeit vor Hype.",
    about_title: "Wer wir sind",
    about_text: "CGAI baut ein Navigationssystem für Kryptomärkte. Transparenz, robuste Prozesse und nachvollziehbare Modelle."
  },
  en: {
    nav_home: "Home",
    nav_crypto: "Crypto",
    nav_shop: "Shop",
    nav_blog: "Blog",
    nav_about: "About",
    hero_title: "We set the standard for clear decisions in crypto markets.",
    hero_lead: "Live data, vetted information and conservative model forecasts — honesty over hype.",
    about_title: "Who we are",
    about_text: "CGAI builds a navigation system for crypto markets. Transparency, robust processes and explainable models."
  }
};
let lang = localStorage.getItem("lang") || "de";
function applyI18n(){
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if(dict[lang] && dict[lang][key]) el.textContent = dict[lang][key];
  });
  document.documentElement.lang = lang;
}
applyI18n();
document.getElementById("lang-de")?.addEventListener("click",()=>{lang="de";localStorage.setItem("lang",lang);applyI18n();});
document.getElementById("lang-en")?.addEventListener("click",()=>{lang="en";localStorage.setItem("lang",lang);applyI18n();});

// Burger Menu
const burger = document.getElementById("burger");
const panel = document.getElementById("nav-panel");
burger?.addEventListener("click", ()=>{
  burger.classList.toggle("is-open");
  panel.classList.toggle("open");
});
