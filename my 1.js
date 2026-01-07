document.addEventListener("DOMContentLoaded", () => {

  /* ================= PART 1 — MODAL ================= */
  window.openPaperModal = function () {
    document.getElementById("paperModal").style.display = "flex";
  };

  window.closePaperModal = function () {
    document.getElementById("paperModal").style.display = "none";
  };

  /* ================= PART 2 — SCROLL TO TOP ================= */
  const scrollBtn = document.getElementById("scrollTopBtn");

  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ================= PART 3 — THEME TOGGLE ================= */
  const toggleBtn = document.getElementById("themeToggle");

  if (toggleBtn) {
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

  /* ================= PART 4 — BACKGROUND ANIMATION ================= */
  const container = document.getElementById("droplet-container");
  const animationType = "droplet";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (container && !reduceMotion) {
    container.innerHTML = "";

    if (animationType === "droplet") {
      for (let i = 0; i < 60; i++) {
        const drop = document.createElement("div");
        drop.classList.add("drop");
        drop.style.left = Math.random() * 100 + "%";
        drop.style.animationDelay = Math.random() * 4 + "s";
        container.appendChild(drop);
      }
    }
  }

  /* ================= PART 5 — ANNOUNCEMENT SPEED ================= */
  const scrollText = document.querySelector(".scroll-text");

  function updateScrollSpeed() {
    if (!scrollText) return;

    const w = window.innerWidth;
    scrollText.style.animationDuration =
      w < 500 ? "15s" : w < 900 ? "12s" : "10s";
  }

  updateScrollSpeed();
  window.addEventListener("resize", updateScrollSpeed);

});
/script>





