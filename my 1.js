/* =====================================================
   PART 1 — SCROLL-TO-TOP BUTTON
===================================================== */

const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});


/* =====================================================
   PART 2 — THEME TOGGLE (DAY/NIGHT)
===================================================== */

const toggleBtn = document.getElementById("themeToggle");

// Save theme preference
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // icon update
  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    toggleBtn.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});


/* =====================================================
   PART 3 — BACKGROUND ANIMATION (STAR / DROPLET)
===================================================== */

const animationType = "droplet";      // Change: "star" or "droplet"
const container = document.getElementById("droplet-container");
container.innerHTML = "";             // reset

// If user prefers reduced motion → disable background motion
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  
  if (animationType === "star") {
    const numStars = 120;

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.classList.add("star");

      // random position
      star.style.top = Math.random() * 100 + "%";
      star.style.left = Math.random() * 100 + "%";

      // animation delay + random size
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
      drop.classList.add("drop");

      drop.style.left = Math.random() * 100 + "%";
      drop.style.animationDelay = Math.random() * 4 + "s";

      container.appendChild(drop);
    }
  }

} else {
  console.log("Reduced motion enabled: Background animation disabled for accessibility.");
}


/* =====================================================
   PART 4 — ANNOUNCEMENT BAR SPEED ADJUSTMENT (OPTIONAL)
===================================================== */

// Smooth scrolling of ticker adjusts with screen width
const scrollText = document.querySelector(".scroll-text");

function updateScrollSpeed() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 500) {
    scrollText.style.animationDuration = "15s";
  } else if (screenWidth < 900) {
    scrollText.style.animationDuration = "12s";
  } else {
    scrollText.style.animationDuration = "10s";
  }
}

updateScrollSpeed();
window.addEventListener("resize", updateScrollSpeed);
