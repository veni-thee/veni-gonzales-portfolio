(function () {
  var numberOfStars = 120;

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function createStars(field) {
    var width = field.clientWidth;
    var height = field.clientHeight;
    var direction = "sf-star--right";
    var html = "";

    for (var i = 0; i < numberOfStars; i++) {
      direction = direction === "sf-star--right" ? "sf-star--left" : "sf-star--right";
      var top = randomNumber(0, height);
      var left = randomNumber(0, width);
      var radius = randomNumber(1, 4);
      var duration = randomNumber(6, 16);

      html +=
        '<span class="sf-star ' + direction + '" style="top:' + top + "px; left:" + left +
        "px; width:" + radius + "px; height:" + radius + "px; animation-duration:" + duration + 's;"></span>';
    }

    field.innerHTML = html;
  }

  function createAllStarFields() {
    document.querySelectorAll(".sf-star-field").forEach(function (field) {
      createStars(field);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createAllStarFields);
  } else {
    createAllStarFields();
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(createAllStarFields, 250);
  });
})();
