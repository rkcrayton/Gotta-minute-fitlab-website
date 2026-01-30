(function () {
  fetch("nav.html")
    .then(res => res.text())
    .then(html => {
      const mount = document.getElementById("nav-mount");
      if (mount) mount.innerHTML = html;
    })
    .catch(err => console.error("Failed to load nav:", err));
})();
