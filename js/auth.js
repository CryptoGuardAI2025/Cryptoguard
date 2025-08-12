
document.addEventListener('DOMContentLoaded',()=>{
  const s=document.getElementById('status');
  document.getElementById('demoLogin')?.addEventListener('click',e=>{e.preventDefault(); localStorage.setItem('cgai_user','demo@cgai.site'); s.textContent='Eingeloggt (Demo)';});
  document.getElementById('logout')?.addEventListener('click',e=>{e.preventDefault(); localStorage.removeItem('cgai_user'); s.textContent='Ausgeloggt';});
  document.getElementById('register')?.addEventListener('click',e=>{
    e.preventDefault();
    if(!document.getElementById('terms').checked) return alert('Bitte Bedingungen akzeptieren.');
    localStorage.setItem('cgai_user', document.getElementById('email2').value||'user@cgai.site');
    s.textContent='Eingeloggt (Demo)';
  });
});
