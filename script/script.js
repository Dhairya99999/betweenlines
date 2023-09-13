// Note - The rawData is in the data.js file that is imported in both the work grid and work list.

if (
  window.location.href.includes("list") ||
  window.location.href.includes("grid")
) {
  const currWindow = window.location.href.includes("list") ? "list" : "grid";
  currWindow === "list" &&
    (document.getElementById("list-text").style.color = "#9B1C1F");
  currWindow === "grid" &&
    (document.getElementById("grid-text").style.color = "#9B1C1F");

  let data = rawData;
  let currentParent = "all";

  const removeAndAddActive = (e, type) => {
    document.querySelectorAll(type).forEach((item) => {
      item.classList.remove("active");
    });
    e.target.classList.add("active");
  };

  const setElements = (currWindow) => {
    if (currentParent.includes("all")) {
      document.querySelector(".sub-div-22").style.display = "none";
    } else {
      document.querySelector(".sub-div-22").style.display = "flex";
    }

    if (currWindow == "list") {
      const newElement = data
        .map((item) => {
          let nameHTML = item.name;
          const nameParts = item.name.split(", ");

          if (nameParts.length > 1 && window.innerWidth < 500) {
            nameHTML = nameParts[0];
            nameHTML += `, <p>${nameParts.slice(1).join(", ")}</p>`;
          }

          return `<a href=${item.links} class="div41 hover-effect-parent-item">
          <div class="-year">${item.year}</div>
          <div class="div41-text">${nameHTML}</div>
          <img src=${item.imgSrc}>
        </a>`;
        })
        .join("");

      document.querySelector("div.container-4").innerHTML = newElement;
      document.getElementById("list-text").style.color = "#9B1C1F";

      // This all is the GSAP thing.
      const items = document.querySelectorAll(".hover-effect-parent-item");

      items.forEach((el) => {
        const image = el.querySelector("img");
        el.addEventListener("mouseenter", (e) => {
          gsap.to(image, { autoAlpha: 1, duration: 0.1 });
        });

        el.addEventListener("mouseleave", (e) => {
          gsap.to(image, { autoAlpha: 0, duration: 0.1 });
        });

        el.addEventListener("mousemove", (e) => {
          gsap.set(image, {
            x: e.offsetX - 200,
            y: e.offsetY - 50,
            duration: 0.5,
          });
        });
      });
    }
    if (currWindow == "grid") {
      const newElement = data
        .map((item) => {
          let name = item.name.split(", ")[0];
          let states = item.name.split(", ")[1] || "";
          return `
      <a href=${item.links} class="grid-item">
        <img src="${item.imgSrc}" alt="${item.name}" class="work-img" />
        <div class="img-text">
          <div class="greyText">${name}, <span class="state">${states}</span></div>
          <div class="greyText">${item.year}</div>
        </div>
      </a>`;
        })
        .join("");

      document.querySelector(".grid-container").innerHTML = newElement;

      // Now you can use the gridItemElement string to insert the HTML into your DOM.
    }
  };
  setElements(currWindow);

  const clickHandle = (e, type) => {
    const currentBtn = e.target.textContent.toLowerCase();

    if (type == "parent") {
      currentParent = currentBtn;
      removeAndAddActive(e, ".div21");

      if (currentBtn.includes("all")) {
        data = rawData;
      } else {
        data = rawData.filter((element) => {
          return currentBtn.includes(element.category);
        });
      }
    } else {
      removeAndAddActive(e, ".div22");

      data = rawData.filter((element) => {
        return (
          currentBtn.includes(element.type) &&
          currentParent.includes(element.category)
        );
      });
    }

    setElements(currWindow);
  };

  const allParentElements = document.querySelectorAll(".div21");
  const allChildElements = document.querySelectorAll(".div22");
  allParentElements.forEach((item) => {
    item.addEventListener("click", (e) => {
      clickHandle(e, "parent");
    });
  });
  allChildElements.forEach((item) => {
    item.addEventListener("click", (e) => {
      clickHandle(e, "child");
    });
  });
}

if (window.location.hash === "") {
  if (document.querySelector(".swiper-wrapper")) {
    const swiperSlideParent = document.querySelector(".swiper-wrapper");

    const newElement = swiperData
      .map((item) => {
        return `<div class="swiper-slide">
      <div class="swiper-slide-inner">
        <div class="slider-1">${item.name}</div>
        <div class="slider-2">
          <div>
            <i class="fa-solid fa-quote-left fa-xl" style="color: #ffffff"></i>
          </div>
          <div class="content">
            <span class="short-content">${item.content.substring(0, 150)}</span>
            <span class="full-content" style="display: none;">${
              item.content
            }</span>
            <button class="read-more-btn">
            Read More <span class="arrow"> &rarr; </span>
          </button>
          </div>
        </div>
        <div class="slider-3">${item.by}</div>
      </div>
    </div>`;
      })
      .join("");

    swiperSlideParent.innerHTML = newElement;

    if (window.innerWidth >= 500) {
      document.querySelectorAll(".full-content");
      document.querySelectorAll(".short-content");

      const contentEle = document.querySelectorAll(".content");
      contentEle.forEach((item) => {
        item.querySelector(".full-content").style.display = "inline";
        item.querySelector(".short-content").style.display = "none";
        item.querySelector(".read-more-btn").style.display = "none";
      });
    } else {
      const readMoreButtons = document.querySelectorAll(".read-more-btn");
      readMoreButtons.forEach((button) => {
        button.addEventListener(
          "click",

          () => {
            const contentContainer = button.parentElement;

            const shortContent =
              contentContainer.querySelector(".short-content");
            const fullContent = contentContainer.querySelector(".full-content");

            if (shortContent.style.display === "none") {
              shortContent.style.display = "inline";
              fullContent.style.display = "none";
              button.textContent = "Read More";
            } else {
              shortContent.style.display = "none";
              fullContent.style.display = "inline";
              button.textContent = "Read Less";
            }
          }
        );
      });
    }
  }

  if (document.querySelector(".running-text")) {
    const runningElement = document.querySelector(".running-text");
    const newElement = runningText
      .map((item) => {
        return `<div>${item}</div>`;
      })
      .join("");

    runningElement.innerHTML = newElement;
  }
}
