(() => {
  "use strict";

  let offcanvas = document.querySelector(".offcanvas-collapse");
  let navbarToggle = document.querySelector("#navbarSideCollapse .bi");

  document
    .querySelector("#navbarSideCollapse")
    ?.addEventListener("click", () => {
      offcanvas.classList.toggle("open");
      navbarToggle.classList.toggle("bi-x");
    });

  document.onclick = function (e) {
    if (e.target.id !== "navbarSideCollapse" && e.target.id !== "toggle") {
      offcanvas.classList.remove("open");
      navbarToggle.classList.remove("bi-x");
    }
  };

  document.querySelectorAll(".nav-item").forEach((link) => {
    link.addEventListener("click", (e) => {
      var current = document
        .querySelector(".nav-pills")
        .getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      e.currentTarget.className += " active";
    });
  });

  // Portfolio Category Filter Tab
  const filterContainer = document.querySelector(".categories");

  const displayFilter = () => {
    const categories = [
      "all",
      ...new Set(portfolio.map((website) => website.category)),
    ];

    filterContainer.innerHTML = categories
      .map((category) => {
        return `<button class="category-btn" data-id="${category}"> ${category} </button>`;
      })
      .join("");
  };

  displayFilter();
})();
