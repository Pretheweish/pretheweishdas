import { supa } from "./supabase-config.js";

const BUCKET = "userfiles";      // নিশ্চিত হও এই নামটাই তোমার bucket
let currentUser = null;

// ---------- guard & header ----------
async function init() {
  const { data } = await supa.auth.getUser();
  if (!data.user) {
    // লগইন না থাকলে তোমার মূল পেজে ফেরত
    window.location.href = "my 1.html";
    return;
  }
  currentUser = data.user;
  document.getElementById("who").textContent = `${currentUser.email}`;
  await loadFiles();
}
window.addEventListener("load", init);

// ---------- go home / logout ----------
window.goHome = () => (window.location.href = "my 1.html");
window.appLogout = async () => {
  await supa.auth.signOut();
  window.location.href = "my 1.html";
};

// ---------- upload ----------
window.uploadFile = async () => {
  const el = document.getElementById("pick");
  const msg = document.getElementById("status");
  if (!el.files?.length) { msg.textContent = "Pick a file first."; return; }

  const file = el.files[0];
  msg.textContent = "Uploading…";
  const key = `${currentUser.id}/${Date.now()}__${file.name}`;

  const { error } = await supa.storage.from(BUCKET).upload(key, file, { upsert: false });
  if (error) { msg.textContent = error.message; return; }

  msg.textContent = "Uploaded ✔";
  el.value = "";
  await loadFiles();
};

// ---------- list files ----------
async function loadFiles() {
  const listEl = document.getElementById("fileList");
  const emptyEl = document.getElementById("emptyHint");
  listEl.innerHTML = "";
  emptyEl.style.display = "none";

  const { data, error } = await supa.storage.from(BUCKET).list(`${currentUser.id}/`, {
    limit: 100, sortBy: { column: "created_at", order: "desc" }
  });
  if (error) { listEl.innerHTML = `<li class="empty">${error.message}</li>`; return; }
  if (!data || data.length === 0) { emptyEl.style.display = "block"; return; }

  for (const item of data) {
    // signed url (1 hour)
    const { data: signed } = await supa.storage.from(BUCKET)
      .createSignedUrl(`${currentUser.id}/${item.name}`, 3600);

    const li = document.createElement("li");
    li.className = "item";
    li.innerHTML = `
      <div class="name">${item.name}</div>
      <a class="btn" href="${signed?.signedUrl || "#"}" target="_blank" rel="noopener">View</a>
      <a class="btn" href="${signed?.signedUrl || "#"}" download>Download</a>
      <button class="btn danger">Delete</button>
    `;

    li.querySelector("button").onclick = async () => {
      if (!confirm(`Delete "${item.name}"?`)) return;
      const { error: delErr } = await supa.storage.from(BUCKET)
        .remove([`${currentUser.id}/${item.name}`]);
      if (delErr) alert(delErr.message);
      else li.remove();
    };

    listEl.appendChild(li);
  }
}

