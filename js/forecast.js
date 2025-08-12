
async function gecko(id){
  const r = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(id)}&vs_currencies=usd`);
  if(!r.ok) throw new Error('API');
  const j=await r.json(); if(!j[id]) throw new Error('Coin');
  return j[id].usd;
}
function proj(p){ const g=0.1125; return {next:(p*(1+g)), pct:(g*100)}; }
document.addEventListener('DOMContentLoaded',()=>{
  const b=document.getElementById('predict-btn'), i=document.getElementById('coin'), o=document.getElementById('out');
  if(!b) return;
  b.addEventListener('click', async ()=>{
    try{ o.textContent='...'; const id=(i.value||'bitcoin').toLowerCase(); const price=await gecko(id); const {next,pct}=proj(price);
      o.innerHTML=`Aktuell: $${price.toLocaleString()}<br>1‑Jahres‑Prognose: $${next.toFixed(2)} (${pct.toFixed(1)}%)`; }
    catch(e){ o.textContent='Fehler bei der Prognose.'; }
  });
});
