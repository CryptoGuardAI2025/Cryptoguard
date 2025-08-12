
// Burger menu
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
