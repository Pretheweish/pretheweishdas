import { supa } from "./supabase-config.js";

const SITE_URL = "https://pretheweish.github.io/pretheweishdas/";

// ======================
// SIGNUP
// ======================
window.signup = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  const { data, error } = await supa.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: SITE_URL   // 🔥 Important for email verification
    }
  });

  if (error) {
    alert("Signup Error: " + error.message);
  } else {
    alert("Account created! Please verify your email.");
  }
};


// ======================
// LOGIN
// ======================
window.login = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  const { data, error } = await supa.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("Login Error: " + error.message);
  } else {
    window.location.href = "dashboard.html";
  }
};


// ======================
// AUTO SESSION DETECT (VERY IMPORTANT)
// Handles email verification redirect
// ======================
window.addEventListener("load", async () => {

  // Detect session after email verification
  const { data, error } = await supa.auth.getSession();

  if (data.session) {
    console.log("User logged in:", data.session.user.email);

    // If already logged in, go to dashboard
    if (window.location.pathname.includes("index.html") ||
        window.location.pathname.endsWith("/pretheweishdas/")) {
      window.location.href = "dashboard.html";
    }
  }

});


// ======================
// LOGOUT
// ======================
window.logout = async function () {
  await supa.auth.signOut();
  window.location.href = "index.html";
};

