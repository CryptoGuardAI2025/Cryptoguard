
// Burger menu
document.getElementById('burger').addEventListener('click', function(){
  const nav = document.getElementById('nav');
  nav.classList.toggle('open');
  this.setAttribute('aria-expanded', nav.classList.contains('open'));
});
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#burger');
  const nav = document.querySelector('#nav');
  if(btn){
    btn.addEventListener('click',()=>{
      nav.classList.toggle('open');
      if(nav.classList.contains('open')) nav.style.display='block'; else nav.style.display='none';
    });
  }
  // Keep language toggle buttons
  document.getElementById('lang-de')?.addEventListener('click',()=>setLang('de'));
  document.getElementById('lang-en')?.addEventListener('click',()=>setLang('en'));

  // Forecast form
  const form = document.getElementById('ai-form');
  if(form){
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const out = document.getElementById('ai-out');
      const coin = (document.getElementById('ai-coin').value||'').trim().toLowerCase();
      if(!coin){ out.textContent = 'Bitte Coin eingeben.'; return; }
      out.textContent = 'Lade…';
      try{
        // Map common tickers to coingecko ids
        const map = {btc:'bitcoin',eth:'ethereum',sol:'solana',xrp:'ripple',ada:'cardano',doge:'dogecoin',shib:'shiba-inu',shibainu:'shiba-inu',vet:'vechain',vtho:'vethor-token',ltc:'litecoin',dot:'polkadot',matic:'matic-network',bnb:'binancecoin'}
        const id = map[coin] || coin;
        const r = await fetch('https://api.coingecko.com/api/v3/simple/price?ids='+encodeURIComponent(id)+'&vs_currencies=usd&include_24hr_change=true');
        const j = await r.json();
        if(!j[id]){ out.textContent = 'Coin nicht gefunden.'; return; }
        const price = j[id].usd;
        // Conservative one–year projection: cap between -50% and +120% based on 24h change proxy (for demo)
        const daily = j[id].usd_24h_change || 0;
        const bounded = Math.max(-50, Math.min(120, daily * 10));
        const proj = price * (1 + bounded/100);
        out.innerHTML = 'Aktuell: <b>$'+price.toLocaleString()+'</b><br>1‑Jahres‑Prognose (konservativ): <b>$'+proj.toFixed(2).toLocaleString()+'</b>';
      }catch(e){ out.textContent = 'Fehler bei der Abfrage.'; }
    });
  }

  // TradingView inject on krypto page
  if(document.getElementById('tv-total')){
    const s = document.createElement('script');
    s.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    s.async = true;
    s.text = JSON.stringify({
      "symbols":[["Crypto Total Market Cap","CRYPTOCAP:TOTAL|1M"]],
      "chartOnly": false, "width": "100%", "height": 420, "locale": "de", "colorTheme": "dark",
      "autosize": true, "showVolume": true, "showMA": false, "hideDateRanges": false, "showSymbolLogo": true
    });
    document.getElementById('tv-total').appendChild(s);
  }
});
// === Drawer ===
const burger = document.getElementById('burger');
const drawer = document.getElementById('nav-drawer');
const backdrop = document.getElementById('nav-backdrop');
const drawerClose = document.getElementById('drawer-close');

function openDrawer() {
  drawer.classList.add('open');
  backdrop.classList.add('active');
  burger.setAttribute('aria-expanded', 'true');
  drawer.setAttribute('aria-hidden', 'false');
}
function closeDrawer() {
  drawer.classList.remove('open');
  backdrop.classList.remove('active');
  burger.setAttribute('aria-expanded', 'false');
  drawer.setAttribute('aria-hidden', 'true');
}
if (burger && drawer && backdrop) {
  burger.addEventListener('click', () => (drawer.classList.contains('open') ? closeDrawer() : openDrawer()));
  backdrop.addEventListener('click', closeDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });
  // Toggle Gruppen (Krypto/Shop)
  document.querySelectorAll('.group-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const list = btn.nextElementSibling;
      if (list) list.style.display = expanded ? 'none' : 'block';
    });
  });
  // Link click -> schließen
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
}

// === Language switch (persist) ===
const setLang = (lng) => {
  localStorage.setItem('cgalang', lng);
  if (typeof window.i18nApply === 'function') window.i18nApply(lng);
};
document.getElementById('lang-de')?.addEventListener('click', () => setLang('de'));
document.getElementById('lang-en')?.addEventListener('click', () => setLang('en'));
(() => { const saved = localStorage.getItem('cgalang') || document.documentElement.lang || 'de'; setLang(saved); })();
/* ===== CGAI Burger Menu ===== */
(function(){
  const btn     = document.getElementById('cgaiburger-btn');
  const panel   = document.getElementById('cgaiburger-panel');
  const overlay = document.getElementById('cgaiburger-overlay');
  if(!btn || !panel || !overlay) return;

  const open = () => {
    panel.classList.add('is-open');
    overlay.hidden = false;
    requestAnimationFrame(()=>overlay.classList.add('is-open'));
    btn.setAttribute('aria-expanded','true');
    panel.setAttribute('aria-hidden','false');
    document.documentElement.style.overflow='hidden';
  };
  const close = () => {
    panel.classList.remove('is-open');
    overlay.classList.remove('is-open');
    btn.setAttribute('aria-expanded','false');
    panel.setAttribute('aria-hidden','true');
    setTimeout(()=>{ overlay.hidden = true; }, 250);
    document.documentElement.style.overflow='';
  };

  btn.addEventListener('click', ()=> panel.classList.contains('is-open') ? close() : open());
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && panel.classList.contains('is-open')) close(); });
  panel.addEventListener('click', (e)=>{ if(e.target.closest('a')) close(); });
})();
/* ===== CGAI Burger ===== */
(function(){
  const btn = document.getElementById('cgaiburger-btn');
  const panel = document.getElementById('cgaiburger-panel');
  const overlay = document.getElementById('cgaiburger-overlay');
  if(!btn || !panel || !overlay) return;

  const open = () => {
    panel.classList.add('is-open');
    overlay.hidden = false;
    requestAnimationFrame(()=> overlay.classList.add('is-open'));
    btn.setAttribute('aria-expanded','true');
    panel.setAttribute('aria-hidden','false');
    document.documentElement.style.overflow='hidden';
  };
  const close = () => {
    panel.classList.remove('is-open');
    overlay.classList.remove('is-open');
    btn.setAttribute('aria-expanded','false');
    panel.setAttribute('aria-hidden','true');
    setTimeout(()=> overlay.hidden = true, 250);
    document.documentElement.style.overflow='';
  };

  btn.addEventListener('click', ()=> panel.classList.contains('is-open') ? close() : open());
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', e=>{ if(e.key==='Escape' && panel.classList.contains('is-open')) close(); });
  panel.addEventListener('click', e=>{ if(e.target.closest('a')) close(); });

  // kleiner Fallback: globale API zum Debuggen
  window.CGAI = Object.assign(window.CGAI||{}, { openMenu: open, closeMenu: close });
})();
