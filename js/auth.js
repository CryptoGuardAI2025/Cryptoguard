
export function isAuthed(){ return localStorage.getItem('authed')==='1'; }
export function login(){ localStorage.setItem('authed','1'); location.reload(); }
export function logout(){ localStorage.removeItem('authed'); location.reload(); }
