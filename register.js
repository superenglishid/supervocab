// register.js
// Simple client-side registration prototype.
// NOTE: This is a local/demo implementation only — do NOT use for production.
// Replace with proper server-side auth (Supabase/Firebase/etc.) when ready.

// localStorage key for proto users
const USERS_KEY = 'sv_users';

function getUsers(){
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch(e){
    return [];
  }
}

function saveUsers(arr){
  localStorage.setItem(USERS_KEY, JSON.stringify(arr));
}

function emailExists(email){
  const users = getUsers();
  return users.some(u => u.email.toLowerCase() === email.toLowerCase());
}

function simpleHash(s){
  // tiny pseudo-hash (base64) just for prototype. Replace with real hashing server-side.
  try { return btoa(unescape(encodeURIComponent(s))); } catch(e) { return s; }
}

function registerUser(e){
  e.preventDefault();
  const name = document.getElementById('r-name').value.trim();
  const email = document.getElementById('r-email').value.trim();
  const p1 = document.getElementById('r-password').value;
  const p2 = document.getElementById('r-password2').value;

  if(!name || !email || !p1 || !p2){
    alert('Isi semua field ya.');
    return false;
  }
  if(p1.length < 6){
    alert('Password minimal 6 karakter.');
    return false;
  }
  if(p1 !== p2){
    alert('Password & konfirmasi tidak cocok.');
    return false;
  }
  if(emailExists(email)){
    alert('Email sudah terdaftar. Silakan masuk.');
    return false;
  }

  const users = getUsers();
  const newUser = {
    name,
    email,
    passwordHash: simpleHash(p1),
    createdAt: Date.now()
  };
  users.push(newUser);
  saveUsers(users);

  // auto-login (demo) — save minimal session
  localStorage.setItem('sv_user', JSON.stringify({ email, name, loggedAt: Date.now() }));

  alert('Pendaftaran sukses! Mengarahkan ke halaman belajar...');
  window.location.href = '/flashcard/flashcard.html';
  return false;
}
