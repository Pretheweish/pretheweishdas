import { supa } from "./supabase-config.js";

/* ===========================
   EMAIL USER LOGIN
=========================== */
window.userLogin = async function () {
  authMsg.innerText = "Logging in...";

  const email = userEmail.value.trim();
  const password = userPass.value;

  if (!email || !password) {
    authMsg.innerText = "Email and password required";
    return;
  }

  const { data, error } = await supa.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    authMsg.innerText = error.message;
    return;
  }

  const user = data.user;

  // check phone verification
  if (!user.user_metadata?.mobile_verified) {
    authModal.close();
    mobileModal.showModal();
  } else {
    window.location.href = "dashboard.html";
  }
};

/* ===========================
   ADMIN LOGIN
=========================== */
window.adminLogin = async function () {
  authMsg.innerText = "Checking admin...";

  const email = adminEmail.value.trim();
  const password = adminPass.value;

  const { data, error } = await supa.auth.signInWithPassword({
    email,
    password,
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

/* ===========================
   SEND PHONE OTP (TWILIO)
=========================== */
window.sendPhoneOtp = async function () {
  phoneMsg.innerText = "Sending OTP...";

  const phone = phoneInput.value.trim(); // format: +91XXXXXXXXXX

  if (!phone.startsWith("+")) {
    phoneMsg.innerText = "Use country code (e.g. +91)";
    return;
  }

  const { error } = await supa.auth.signInWithOtp({
    phone,
  });

  if (error) {
    phoneMsg.innerText = error.message;
    return;
  }

  phoneMsg.innerText = "OTP sent successfully";
};

/* ===========================
   VERIFY PHONE OTP
=========================== */
window.verifyPhoneOtp = async function () {
  otpMsg.innerText = "Verifying OTP...";

  const phone = phoneInput.value.trim();
  const token = otpInput.value.trim();

  if (!token) {
    otpMsg.innerText = "Enter OTP";
    return;
  }

  const { data, error } = await supa.auth.verifyOtp({
    phone,
    token,
    type: "sms",
  });

  if (error) {
    otpMsg.innerText = error.message;
    return;
  }

  // mark phone verified
  await supa.auth.updateUser({
    data: { mobile_verified: true },
  });

  otpMsg.innerText = "Phone verified ✔";
  window.location.href = "dashboard.html";
};

/* ===========================
   LOGOUT
=========================== */
window.logout = async function () {
  await supa.auth.signOut();
  window.location.href = "index.html";
};

/* ===========================
   AUTH STATE LISTENER
=========================== */
supa.auth.onAuthStateChange((event, session) => {
  console.log("Auth event:", event);

  if (event === "SIGNED_OUT") {
    console.log("User signed out");
  }
});



