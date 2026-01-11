/* =====================================================
   DOM READY
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     PAPER MODAL
  ===================================================== */
  window.openPaperModal = function () {
    const modal = document.getElementById("paperModal");
    if (modal) modal.style.display = "flex";
  };

  window.closePaperModal = function () {
    const modal = document.getElementById("paperModal");
    if (modal) modal.style.display = "none";
  };

  /* =====================================================
     AOS INITIALIZATION
  ===================================================== */
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true
    });
  } else {
    console.error("AOS library not loaded");
  }

  /* =====================================================
     ANNOUNCEMENT BAR SPEED CONTROL
  ===================================================== */
  const scrollText = document.querySelector(".scroll-text");

  function updateScrollSpeed() {
    if (!scrollText) return;
    const w = window.innerWidth;
    if (w < 500) scrollText.style.animationDuration = "15s";
    else if (w < 900) scrollText.style.animationDuration = "12s";
    else scrollText.style.animationDuration = "10s";
  }

  updateScrollSpeed();
  window.addEventListener("resize", updateScrollSpeed);

});


/* =====================================================
   SCROLL TO TOP BUTTON
===================================================== */
const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


/* =====================================================
   THEME TOGGLE (DAY / NIGHT)
===================================================== */
const toggleBtn = document.getElementById("themeToggle");

if (toggleBtn) {

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      toggleBtn.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    } else {
      toggleBtn.textContent = "🌙";
      localStorage.setItem("theme", "light");
    }
  });
}


/* =====================================================
   BACKGROUND ANIMATION (STAR / DROPLET)
===================================================== */
const animationType = "droplet";   // "star" or "droplet"
const container = document.getElementById("droplet-container");

if (container) {
  container.innerHTML = "";

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!reduceMotion) {

    if (animationType === "star") {
      const numStars = 120;
      for (let i = 0; i < numStars; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.top = Math.random() * 100 + "%";
        star.style.left = Math.random() * 100 + "%";
        star.style.animationDelay = Math.random() * 3 + "s";
        const size = Math.random() * 2 + 1;
        star.style.width = size + "px";
        star.style.height = size + "px";
        container.appendChild(star);
      }

    } else if (animationType === "droplet") {
      const numDrops = 60;
      for (let i = 0; i < numDrops; i++) {
        const drop = document.createElement("div");
        drop.className = "drop";
        drop.style.left = Math.random() * 100 + "%";
        drop.style.animationDelay = Math.random() * 4 + "s";
        container.appendChild(drop);
      }
    }

  } else {
    console.log("Reduced motion enabled: background animation disabled.");
  }
}


/* =====================================================
   INTEREST SECTION TOGGLE
===================================================== */
window.showResearch = function () {
  const research = document.getElementById("researchBox");
  const hobby = document.getElementById("hobbyBox");
  const btns = document.querySelectorAll(".toggle-btn");

  if (research && hobby && btns.length >= 2) {
    research.classList.add("show");
    hobby.classList.remove("show");
    btns[0].classList.add("active");
    btns[1].classList.remove("active");
  }
};

window.showHobbies = function () {
  const research = document.getElementById("researchBox");
  const hobby = document.getElementById("hobbyBox");
  const btns = document.querySelectorAll(".toggle-btn");

  if (research && hobby && btns.length >= 2) {
    hobby.classList.add("show");
    research.classList.remove("show");
    btns[1].classList.add("active");
    btns[0].classList.remove("active");
  }
};


/* =====================================================
   CMP ORG-CHART FLOAT ANIMATION (SAFE)
===================================================== */
const cmpNodes = document.querySelectorAll(".cmp-branch, .node");

if (cmpNodes.length > 0) {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes floatNode {
      0%,100% { transform: translateY(0); }
      50% { transform: translateY(-7px); }
    }
  `;
  document.head.appendChild(style);

  cmpNodes.forEach((node, i) => {
    node.style.animation = `floatNode 4s ease-in-out ${i * 0.3}s infinite`;
  });
}
