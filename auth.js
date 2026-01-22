import { supa } from "./supabase-config.js";

window.userLogin = async function () {
  authMsg.innerText = "Logging in...";

  const email = userEmail.value;
  const password = userPass.value;

  const { data, error } = await supa.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    authMsg.innerText = error.message;
    return;
  }

  const user = data.user;

  // OPTION B → mobile verification
  if (!user.user_metadata?.mobile_verified) {
    authModal.close();
    mobileModal.showModal();
  } else {
    window.location.href = "dashboard.html";
  }
};

window.adminLogin = async function () {
  authMsg.innerText = "Checking admin...";

  const email = adminEmail.value;
  const password = adminPass.value;

  const { data, error } = await supa.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    authMsg.innerText = error.message;
    return;
  }

  const role = data.user.user_metadata?.role;
  if (role !== "admin") {
    authMsg.innerText = "Access denied";
    await supa.auth.signOut();
    return;
  }

  window.location.href = "admin-dashboard.html";
};


