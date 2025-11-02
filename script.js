const scrollBtn = document.getElementById("scrollTopBtn");

// Scroll করলে বাটন দেখাবে বা লুকাবে
window.onscroll = function() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

// বাটনে ক্লিক করলে পেজ মসৃণভাবে উপরে উঠবে
scrollBtn.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// 🌙 Theme Toggle
const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // আইকন পরিবর্তন
  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }
});




// 💧 Droplet Animation Script
function createDroplets(number = 30) {
  const container = document.getElementById('droplet-container');
  if (!container) return;

  const pageHeight = document.documentElement.scrollHeight;

  for (let i = 0; i < number; i++) {
    const d = document.createElement('div');
    d.className = 'droplet';
    d.style.left = Math.random() * 100 + 'vw';
    d.style.setProperty('--fall-distance', (pageHeight + 200) + 'px');
    d.style.animationDuration = 2 + Math.random() * 4 + 's';
    d.style.animationDelay = Math.random() * 4 + 's';

    d.addEventListener('animationend', () => d.remove());
    container.appendChild(d);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  createDroplets(35);

  // নতুন ড্রপলেট বারবার তৈরি হবে
  setInterval(() => createDroplets(7), 2500);
});


