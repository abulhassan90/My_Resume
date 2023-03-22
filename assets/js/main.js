(() => {
  "use strict";

  document
    .querySelector("#navbarSideCollapse")
    ?.addEventListener("click", () => {
      document.querySelector(".offcanvas-collapse").classList.toggle("open");
      document
        .querySelector("#navbarSideCollapse .bi")
        .classList.toggle("bi-x");
    });

  document.querySelectorAll(".nav-item").forEach((link) => {
    link.addEventListener("click", (e) => {
      var current = document
        .querySelector(".nav-pills")
        .getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      e.currentTarget.className += " active";
    });
  });
})();
