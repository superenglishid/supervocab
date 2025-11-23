function loginUser(e){
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const pw = document.getElementById('password').value.trim();

  if(!email || !pw){
    alert('Isi email dan password dulu ya.');
    return false;
  }

  // dummy auth: simpan user di localStorage (ganti nanti dengan Supabase)
  localStorage.setItem('sv_user', JSON.stringify({ email, loggedAt: Date.now() }));

  // redirect ke halaman belajar
  window.location.href = '/flashcard/flashcard.html';
  return false;
}
