const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navBar = document.querySelector(".nav-bar");
  const navLinks = document.querySelectorAll(".nav-links li");
  const header = document.querySelector(".hero-section");
  let isScrolled = false;

  const headerOptions = {
    rootMargin: "-80% 0px 0px 0px",
  };

  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        navBar.classList.add("scrolled-nav");
        isScrolled = true;
      } else {
        navBar.classList.remove("scrolled-nav");
        isScrolled = false;
      }
    });
  }, headerOptions);

  headerObserver.observe(header);

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");

    if (nav.classList.contains("nav-active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "initial";
    }

    if (burger.classList.contains("toggle")) {
      burger.classList.remove("toggle");
    } else {
      burger.classList.add("toggle");
    }

    if (!isScrolled) {
      navBar.classList.toggle("scrolled-nav");
    }

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 500ms ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });
  });
};

navSlide();

const headerAnimation = () => {
  const slides = document.querySelectorAll(".slide");
  const sideImg = Array.from(
    document.querySelectorAll(".header__side-section")
  );

  const nextButton = document.querySelector(".right-button");
  const prevButton = document.querySelector(".left-button");

  const pageCounter = document.querySelector(".page-count");

  let index = 0;
  let pageCount = 1;
  let sideImgIndex = 0;
  const updateTime = 5000;
  let nextTime;

  window.onload = () => {
    nextTime = setInterval(changeToNextSlide, updateTime);
  };

  pageCounter.innerHTML = pageCount;

  nextButton.addEventListener("click", () => {
    changeToNextSlide();
  });
  prevButton.addEventListener("click", () => {
    changeToPrevSlide();
  });

  function showNextSlide() {
    index++;
    if (index > slides.length - 1) {
      index = 0;
    }

    slides.forEach((slide, i) => {
      slide.classList.remove("show");

      if (i === index) {
        slide.classList.add("show");
      }
    });
  }

  function showPrevSlide() {
    index--;
    if (index < 0) {
      index = slides.length - 1;
    }

    slides.forEach((slide, i) => {
      slide.classList.remove("show");

      if (i === index) {
        slide.classList.add("show");
      }
    });
  }
  //IMG Delay
  function delayNextSideImg() {
    sideImgIndex++;

    if (sideImgIndex > sideImg.length - 1) {
      sideImgIndex = 0;
    }

    const currentSideImg = document.querySelector(".current__side-img");
    const nextSideImg = sideImg[sideImgIndex];

    currentSideImg.classList.remove("current__side-img");
    nextSideImg.classList.add("current__side-img");

    clearTimeout(nextTime);
    nextTime = setInterval(changeToNextSlide, updateTime);
  }
  function delayPrevSideImg() {
    sideImgIndex--;

    if (sideImgIndex < 0) {
      sideImgIndex = sideImg.length - 1;
    }

    const currentSideImg = document.querySelector(".current__side-img");
    const nextSideImg = sideImg[sideImgIndex];

    currentSideImg.classList.remove("current__side-img");
    nextSideImg.classList.add("current__side-img");

    clearTimeout(nextTime);
    nextTime = setInterval(changeToNextSlide, updateTime);
  }

  function incrementPageCount() {
    pageCount++;

    if (pageCount > slides.length) {
      pageCount = 1;
    }

    pageCounter.innerHTML = pageCount;
  }

  function decrementPageCount() {
    pageCount--;

    if (pageCount < 1) {
      pageCount = slides.length;
    }

    pageCounter.innerHTML = pageCount;
  }

  function changeToNextSlide() {
    showNextSlide();
    incrementPageCount();
    delayNextSideImg();
  }

  function changeToPrevSlide() {
    showPrevSlide();
    decrementPageCount();
    delayPrevSideImg();
  }
};
headerAnimation();

const menuNavigation = () => {
  let menuImages = Array.from(
    document.querySelectorAll(".menu-navigation-img li")
  );
  let menuItems = Array.from(document.querySelectorAll(".menu-item-container"));
  const imgButtons = document.querySelectorAll(".menu-navigation-img li");

  const nextButton = document.querySelector(".next-button");
  const prevButton = document.querySelector(".prev-button");

  let currentImg = menuImages[0];
  menuImages.unshift(menuImages.pop());

  changeText();

  nextButton.addEventListener("click", () => {
    showNextMenuImg();
    showMenuItems();
  });

  prevButton.addEventListener("click", () => {
    showPrevMenuImg();
    showMenuItems();
  });

  function showNextMenuImg() {
    menuImages.push(menuImages.shift());
    changeText();
  }

  function showPrevMenuImg() {
    menuImages.unshift(menuImages.pop());
    changeText();
  }

  function changeText() {
    currentImg.classList.remove("current-menu-img");
    currentImg = menuImages[1];
    currentImg.classList.add("current-menu-img");
    nextButton.textContent = menuImages[2].dataset.food;
    prevButton.textContent = menuImages[0].dataset.food;
  }

  function showMenuItems() {
    for (let i = 0; i < menuItems.length; i++) {
      menuItems[i].classList.remove("selected-items");

      if (currentImg.dataset.food != menuItems[i].dataset.menu) {
        menuItems[i].classList.add("selected-items");
      }

      if (currentImg.dataset.food == "bestsellers") {
        menuItems[i].classList.remove("selected-items");
      }
    }
  }
  function highlightMenuItems() {
    imgButtons.forEach((img) => {
      img.addEventListener("click", (e) => {
        imgButtons.forEach((img) => {
          img.classList.remove("selected-img");
        });
        img.classList.add("selected-img");

        const clickedImg = e.target.closest("li");
        for (let i = 0; i < menuItems.length; i++) {
          menuItems[i].classList.remove("selected-items");

          if (clickedImg.dataset.food != menuItems[i].dataset.menu) {
            menuItems[i].classList.add("selected-items");
          }

          if (clickedImg.dataset.food == "bestsellers") {
            menuItems[i].classList.remove("selected-items");
          }
        }
      });
    });
  }
  highlightMenuItems();
};
menuNavigation();

const testimonialCarousel = () => {
  const testimonialButtons = document.querySelectorAll("[data-target-slide]");
  const tabContent = document.querySelectorAll(".testimonial-carousel-tab");

  let testimonialCount = 0;

  let testimonialTime = 5000;

  const changeTestimonial = () => {
    testimonialCount++;

    if (testimonialCount > tabContent.length - 1) {
      testimonialCount = 0;
    }

    tabContent.forEach((tab, i) => {
      tab.classList.remove("current-tab");

      if (testimonialCount === i) {
        tab.classList.add("current-tab");
      }
    });
    testimonialButtons.forEach((button, i) => {
      button.classList.remove("current-dot");

      if (testimonialCount === i) {
        button.classList.add("current-dot");
      }
    });
  };

  window.onload = () => {
    nextTestimonialTime = setInterval(changeTestimonial, testimonialTime);
  };

  testimonialButtons.forEach((button, i) => {
    button.addEventListener("click", () => {
      let target = document.querySelector(button.dataset.targetSlide);
      tabContent.forEach((content) => {
        content.classList.remove("current-tab");
      });
      target.classList.add("current-tab");
      updateDot();
    });

    const updateDot = () => {
      testimonialButtons.forEach((button) => {
        button.classList.remove("current-dot");
      });
      button.classList.add("current-dot");
    };
  });
};
testimonialCarousel();
