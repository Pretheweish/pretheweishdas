// =============================
//  add-document.js
// =============================
import { supa } from "./supabase-config.js";

let currentUser = null;

// ---------- init (auth guard) ----------
async function init() {
  const { data } = await supa.auth.getUser();

  if (!data.user) {
    window.location.href = "my 1.html"; // not logged in
    return;
  }

  currentUser = data.user;
  document.getElementById("who").textContent = currentUser.email;
}

window.addEventListener("load", init);

// ---------- Back to dashboard ----------
window.goBack = () => (window.location.href = "dashboard.html");


// ---------- Save Document ----------
window.saveDocument = async () => {
  const title = document.getElementById("docTitle").value.trim();
  const content = document.getElementById("docContent").value.trim();

  if (!title) {
    alert("Please enter a title");
    return;
  }

  // store inside Supabase table: documents
  const { data, error } = await supa
    .from("documents")
    .insert([
      {
        user_id: currentUser.id,
        title: title,
        content: content,
        created_at: new Date().toISOString()
      }
    ]);

  if (error) {
    console.error(error);
    alert("Failed to save! (Check console)");
    return;
  }

  alert("Document saved successfully!");
  window.location.href = "dashboard.html"; 
};


// ---------- Logout ----------
window.appLogout = async () => {
  await supa.auth.signOut();
  window.location.href = "my 1.html";
};

// ---------- for Plus list ----------

import { supa } from "./supabase-config.js";

let currentUser = null;
let isAdmin = false;
let listCount = 0;

// Define admin emails here
const ADMIN_EMAILS = ["youradmin@gmail.com"];  // এখানে admin email দাও

// ---------- Init ----------
async function initLists() {
  const { data } = await supa.auth.getUser();

  if (!data.user) return;

  currentUser = data.user;

  // Check if user is admin
  if (ADMIN_EMAILS.includes(currentUser.email)) {
    isAdmin = true;
  }
}

window.addEventListener("load", initLists);


// ---------- Handle Plus Button ----------
document.getElementById("plusBtn").onclick = () => {
  if (!isAdmin) {
    // normal users cannot open list
    alert("Only Admin can create lists.");
    return;
  }

  listCount++;

  const box = document.createElement("div");
  box.className = "list-box";

  const title = document.createElement("div");
  title.className = "list-title";
  title.textContent = `List ${listCount}`;

  const content = document.createElement("div");
  content.className = "list-content";

  // Admin can write, users cannot edit
  content.contentEditable = isAdmin ? "true" : "false";

  box.appendChild(title);
  box.appendChild(content);

  document.getElementById("listsContainer").appendChild(box);
};



