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

  document.querySelectorAll(".nav-item")?.forEach((link) => {
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
      ...new Set(portfolio?.map((website) => website.category)),
    ];

    filterContainer.innerHTML = categories
      .map((category) => {
        return `<button class="category-btn ${
          category === "all" ? "active" : ""
        }" data-id="${category}"> ${category} </button>`;
      })
      .join("");
  };

  displayFilter();

  let categoryBtns = document.querySelectorAll(".category-btn");
  categoryBtns?.forEach((categoryBtn) => {
    categoryBtn.addEventListener("click", (e) => {
      let current = document
        .querySelector(".categories")
        .getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      e.target.classList.add("active");

      filterWebsite(e.target.textContent.trim());
      displayPortfolio();
      portfolioImgHeight();
    });
  });

  // Portfolio List
  const portfolioList = document.querySelector("#portfolio-list");

  let portfolioCopy = portfolio;
  const filterWebsite = (category) => {
    portfolioCopy = portfolio.filter((website) => website.category == category);
    if (category === "all") {
      portfolioCopy = portfolio;
    }
  };

  const displayPortfolio = () => {
    portfolioList.innerHTML = portfolioCopy
      .map((website) => {
        return `<div class="col-md-4">
      <div class="website">
        <img
          src=${website.image}
          alt=${website.name}
          class="w-100"
        />
        <div class="actions">
          <a class="link" href="#!"><i class="bi bi-plus"></i></a>
          <a
            class="link"
            href=${website.url}
            target="_blank"
            ><i class="bi bi-link-45deg"></i
          ></a>
        </div>
      </div>
    </div>`;
      })
      .join("");
  };

  displayPortfolio();

  // Portfolio find image height set as bottom value

  const portfolioImgHeight = () => {
    const websiteImgs = document.querySelectorAll(".website img");

    const loadImgHeight = () => {
      websiteImgs.forEach((websiteImg) => {
        const websiteImgHeight = websiteImg.height - 250;
        websiteImg.style.bottom = "-" + websiteImgHeight + "px";

        const customTransition = Math.ceil(websiteImg.height / 200);
        websiteImg.style.transition = `all ${customTransition}s ease 0s`;
      });
    };

    loadImgHeight();

    window.addEventListener("load", function () {
      loadImgHeight();
    });
  };

  portfolioImgHeight();
})();
