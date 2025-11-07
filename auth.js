import { supa } from "./supabase-config.js";

window.signup = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supa.auth.signUp({ email, password });

  if (error) alert("Signup Error: " + error.message);
  else alert("Account created! Check your email.");
};

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supa.auth.signInWithPassword({ email, password });

  if (error) alert("Login Error: " + error.message);
  else window.location.href = "dashboard.html";
};

