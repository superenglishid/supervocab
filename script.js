function loginUser(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // DUMMY LOGIN — nanti bisa diganti Supabase
  if (email && password) {
    // Simpan sesi user
    localStorage.setItem("sv_user", email);

    // Redirect ke flashcard app
    window.location.href = "/flashcard/flashcard.html";
  } else {
    alert("Isi email & password!");
  }
}
