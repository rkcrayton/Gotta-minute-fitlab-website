(function () {
  function init() {
    const navInner = document.querySelector(".nav-inner");
    const navLinks = document.querySelector(".nav-links");
    const navCta = document.querySelector(".nav-cta");

    if (!navInner || !navLinks || !navCta) return;

    function adjustNav() {
      // reset
      navCta.classList.remove("is-collapsed");
      navLinks.classList.remove("is-collapsed");

      // If overflow, hide CTA first
      if (navInner.scrollWidth > navInner.clientWidth) {
        navCta.classList.add("is-collapsed");
      }

      // If still overflow, hide nav-links next
      if (navInner.scrollWidth > navInner.clientWidth) {
        navLinks.classList.add("is-collapsed");
      }
    }

    window.addEventListener("resize", adjustNav);
    adjustNav();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
