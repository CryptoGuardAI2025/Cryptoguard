// super-light i18n (can be expanded later)
document.addEventListener('DOMContentLoaded',()=>{
  const map={de:{},en:{}}; // labels are baked in; extend here if needed
  const btnDE=document.getElementById('lang-de'); const btnEN=document.getElementById('lang-en');
  function set(lang){localStorage.setItem('lang',lang);document.documentElement.lang=lang;location.reload();}
  btnDE&&btnDE.addEventListener('click',()=>set('de')); btnEN&&btnEN.addEventListener('click',()=>set('en'));
});