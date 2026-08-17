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
});
