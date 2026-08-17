document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".sf-nav-toggle");
  var links = document.querySelector(".sf-navlinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("is-open");
    });
  }

  document.querySelectorAll(".sf-accordion-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var item = trigger.closest(".sf-accordion-item");
      var wasOpen = item.classList.contains("is-open");
      item.parentElement.querySelectorAll(".sf-accordion-item").forEach(function (i) {
        i.classList.remove("is-open");
      });
      if (!wasOpen) {
        item.classList.add("is-open");
      }
    });
  });
});
