
// burger + active nav + cookie
document.addEventListener('DOMContentLoaded',()=>{
  const burger=document.getElementById('burger'); const nav=document.querySelector('.nav');
  burger&&burger.addEventListener('click',()=>{nav.style.display = (getComputedStyle(nav).display==='none'?'flex':'none');});
  const path=(location.pathname.split('/').pop()||'index.html');
  const active={'index.html':'nav-home','krypto.html':'nav-crypto','shop.html':'nav-shop','blog.html':'nav-blog','ueber-uns.html':'nav-about'}[path];
  active && document.getElementById(active)?.classList.add('active');
  // cookie
  const bar=document.getElementById('cookie'); const ok=document.getElementById('cookie-accept');
  if(!localStorage.getItem('cookie_ok')){bar.style.display='block';}
  ok&&ok.addEventListener('click',e=>{e.preventDefault(); localStorage.setItem('cookie_ok','1'); bar.style.display='none';});
});
