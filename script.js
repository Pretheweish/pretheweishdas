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
