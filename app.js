import { supa } from "./supabase.js";

// ELEMENTS
const msg = document.getElementById("authMsg");
const emailBox = document.getElementById("email");
const passBox = document.getElementById("password");

// --------------------------- SIGNUP --------------------------
window.signup = async function () {
  const email = emailBox.value.trim();
  const password = passBox.value.trim();

  const { error } = await supa.auth.signUp({
    email,
    password
  });

  if (error) {
    msg.innerText = error.message;
  } else {
    msg.style.color = "lightgreen";
    msg.innerText = "Account created. Check email!";
  }
};

// --------------------------- LOGIN ---------------------------
window.login = async function () {
  const email = emailBox.value.trim();
  const password = passBox.value.trim();

  const { data, error } = await supa.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    msg.innerText = "Login failed: " + error.message;
    return;
  }

  // fetch profile
  const { data: profile } = await supa
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (profile.role === "admin") {
    window.location.href = "admin.html";   
  } else {
    window.location.href = "dashboard.html";
  }
};

// --------------------------- LOGOUT ---------------------------
window.appLogout = async function () {
  await supa.auth.signOut();
  window.location.href = "index.html";
};


// ---------------- CHECK LOGIN PAGE REDIRECT --------------------
if (location.pathname.includes("index.html")) {
  supa.auth.getUser().then(async ({ data }) => {
    if (!data.user) return;

    const { data: profile } = await supa
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profile.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "dashboard.html";
    }
  });
}
