document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".sf-nav-toggle");
  var links = document.querySelector(".sf-navlinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("is-open");
    });
  }

  document.querySelectorAll("[data-modal-open]").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var modal = document.getElementById(trigger.dataset.modalOpen);
      if (modal) {
        modal.classList.add("is-open");
      }
    });
  });

  document.querySelectorAll("[data-modal-close]").forEach(function (el) {
    el.addEventListener("click", function () {
      el.closest(".sf-modal-wrap").classList.remove("is-open");
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      document.querySelectorAll(".sf-modal-wrap.is-open").forEach(function (modal) {
        modal.classList.remove("is-open");
      });
    }
  });

  document.querySelectorAll(".sf-carousel").forEach(function (carousel) {
    var track = carousel.querySelector(".sf-carousel-track");
    var slides = carousel.querySelectorAll(".sf-carousel-slide");
    var dots = carousel.querySelectorAll(".sf-carousel-dot");
    var prev = carousel.querySelector(".sf-carousel-arrow--prev");
    var next = carousel.querySelector(".sf-carousel-arrow--next");
    var index = 0;

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + index * 100 + "%)";
      dots.forEach(function (dot, dotIndex) {
        dot.classList.toggle("is-active", dotIndex === index);
      });
    }

    if (prev) {
      prev.addEventListener("click", function () {
        goTo(index - 1);
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        goTo(index + 1);
      });
    }
    dots.forEach(function (dot, dotIndex) {
      dot.addEventListener("click", function () {
        goTo(dotIndex);
      });
    });
  });
});
