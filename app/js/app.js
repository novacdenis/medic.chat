// import $ from 'jquery'; window.jQuery = $; window.$ = $ // import module example (npm i -D jquery)
// import lottie from 'lottie-web';
import Splide from "@splidejs/splide";

const preloader = document.querySelector("#preloader");

document.addEventListener("DOMContentLoaded", () => {
  preloader.classList.remove("active");

  // SVG Converter
  const convertImages = (query, callback) => {
    const images = document.querySelectorAll(query);

    images.forEach((image) => {
      fetch(image.src)
        .then((res) => res.text())
        .then((data) => {
          const parser = new DOMParser();
          const svg = parser
            .parseFromString(data, "image/svg+xml")
            .querySelector("svg");

          if (image.id) svg.id = image.id;
          if (image.className) svg.classList = image.classList;

          image.parentNode.replaceChild(svg, image);
        })
        .then(callback)
        .catch((error) => console.error(error));
    });
  };

  convertImages(".svg-icon");

  // Mobile menu
  function activateMobileMenu(btnName, navName) {
    const mobileBtn = document.querySelector(btnName);
    const nav = document.querySelector(navName);

    if (!mobileBtn) {
      return;
    }
    mobileBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!nav.classList.contains("active")) {
        nav.classList.add("active");
        nav.style.maxHeight = nav.scrollHeight + "px";
      } else {
        nav.classList.remove("active");
        nav.style.maxHeight = null;
      }
    });

    document.addEventListener("click", function (event) {
      let isClickInside = false;

      isClickInside =
        mobileBtn.contains(event.target) || nav.contains(event.target);

      if (!isClickInside) {
        nav.classList.remove("active");
        nav.style.maxHeight = null;
      }
    });
  }

  activateMobileMenu(".mobile-menu-btn", "#nav");

  // Accordion

  function Accordion(id) {
    const el = document.querySelector(id);

    if (!el) return;

    const children = el.children;

    for (let i = 0; i < children.length; i++) {
      children[i].classList.add("accordion-item");

      let head, body;

      head = children[i].children[0];
      body = children[i].children[1];

      head.classList.add("head");
      body.classList.add("body");

      head.addEventListener("click", (e) => {
        resetAccordion(children);
        head.classList.add("active");

        e.preventDefault();

        body.style.maxHeight = body.scrollHeight + "px";
        body.classList.add("active");
      });
    }
  }

  function resetAccordion(children) {
    for (let i = 0; i < children.length; i++) {
      let body = children[i].querySelector(".body");
      let head = children[i].querySelector(".head");

      head.classList.remove("active");
      body.classList.remove("active");
      body.style.maxHeight = null;
    }
  }

  Accordion("#specs-accordion");

  // Animations
  const wow = new WOW({
    boxClass: "wow",
    animateClass: "animate__animated",
    offset: 0,
    mobile: true,
    live: true,
    callback: function (box) {},
    scrollContainer: null,
  });
  wow.init();

  // Team slide
  function teamSlide() {
    const el = document.querySelector(".splide");

    if (!el) return;

    const teamSlide = new Splide(el, {
      pagination: false,
      focus: "center",
      autoplay: true,
      interval: 5000,
      speed: 1500,
      perPage: 2,
      rewind: true,
    });

    window.onresize = () => {
      if (window.innerWidth < 870) {
        teamSlide.options = {
          pagination: false,
          focus: "center",
          autoplay: true,
          interval: 5000,
          speed: 800,
          perPage: 1,
          rewind: true,
        };
      }
    };

    if (window.innerWidth < 870) {
      teamSlide.options = {
        pagination: false,
        focus: "center",
        autoplay: true,
        interval: 5000,
        speed: 800,
        perPage: 1,
        rewind: true,
      };
    }
    teamSlide.mount();
  }
  teamSlide();

  // Get Date
  function blogsTodayDate() {
    const el = document.querySelector(".blogs-date");

    if (!el) return;

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    let monthNumb = today.getMonth();

    let mothName = {
      1: "Ianuarie",
      2: "Februarie",
      3: "Martie",
      4: "Aprilie",
      5: "Mai",
      6: "Iunie",
      7: "Iulie",
      8: "August",
      9: "Septembrie",
      10: "Octombrie",
      11: "Noiebrie",
      12: "Decembrie",
    };

    let monthStr;

    for (monthNumb in mothName) {
      monthStr = mothName[monthNumb];
    }

    el.children[0].innerHTML = `Luna: ${monthStr} ${today.getFullYear()}`;
  }
  blogsTodayDate();
});
