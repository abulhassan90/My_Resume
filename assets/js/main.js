(() => {
  "use strict";

  /******************
  # Aside
  *******************/

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

  /******************
  # Portfolio
  *******************/

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

  const selectCategory = () => {
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
        portfolioModal();
      });
    });
  };

  selectCategory();

  // Portfolio List

  const portfolioList = document.querySelector("#portfolio-list");
  let pagination = 6;
  let portfolioCopy;
  let filteredPortfolio;
  const sliceData = () => {
    portfolioCopy = portfolio.slice(0, pagination);
    filteredPortfolio = portfolioCopy;
  };
  sliceData();

  const filterWebsite = (category) => {
    filteredPortfolio = portfolioCopy.filter(
      (website) => website.category == category
    );
    if (category === "all") {
      filteredPortfolio = portfolioCopy;
    }
  };

  const displayPortfolio = () => {
    portfolioList.innerHTML = filteredPortfolio
      .map((website) => {
        return `<div class="col-sm-6 col-md-4">
      <div class="website">
        <img
          src=${website.image}
          alt=${website.name}
          class="w-100"
        />
        <div class="actions">
          <span class="link portfolio-popup" data-id=${
            website.id
          }  data-bs-toggle="modal"
          data-bs-target="#portfolioModal"><i class="bi bi-plus"></i></span>
          ${
            website.url
              ? `<a
            class="link"
            href=${website.url}
            target="_blank"
            ><i class="bi bi-link-45deg"></i
          ></a>`
              : ""
          }
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

    window.addEventListener("resize", function () {
      loadImgHeight();
    });
  };

  portfolioImgHeight();

  // Portfolio Modal Content
  const portfolioModal = () => {
    const portfolioLink = document.querySelectorAll(".portfolio-popup");
    const portfolioTitle = document.querySelector(".portfolio-title");
    const portfolioImage = document.querySelector(".portfolio-image");
    const portfolioContent = document.querySelector(".portfolio-content");

    portfolioLink.forEach((link) => {
      link.addEventListener("click", (e) => {
        let porfolioID = Number(e.currentTarget.dataset.id);

        let result = portfolioCopy.find((website) => website.id === porfolioID);

        portfolioTitle.innerHTML = result.name;
        portfolioImage.innerHTML = `<img src=${result.image} alt=${result.name} class="w-100" />`;
        portfolioContent.innerHTML = `
        <div class="top">
            <p><strong>Category:</strong> ${result.category.toUpperCase()}</p>
            <p><strong>Platform:</strong> ${result.platform}</p>
            <p><strong>Client:</strong> ${result.name}</p>
            <p><strong>Project date:</strong> ${result.date}</p>
            ${
              result.url
                ? `<p><strong>Project URL:</strong> <a href=${result.url} target="_blank">${result.url}</a></p>`
                : ""
            }
        </div>
        ${
          result.role && result.role.length > 0
            ? `<div class="bottom">
          <h4 class="title">My Role</h4>
          <ul>
          ${result.role.map((list) => `<li>${list}</li>`).join("")}
          </ul>
        </div>`
            : ""
        }
        `;
      });
    });
  };

  portfolioModal();

  const loadAllProjects = document.querySelector("#load-all");

  loadAllProjects.addEventListener("click", (e) => {
    pagination = portfolio.length;
    displayFilter();
    selectCategory();
    sliceData();
    displayPortfolio();
    portfolioImgHeight();
    e.target.style.display = "none";
  });
})();
