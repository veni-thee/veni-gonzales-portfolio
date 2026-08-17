(function () {
  var width, height, container, canvas, ctx, points, target;

  function init() {
    container = document.getElementById("orbit-bg");
    canvas = document.getElementById("orbit-canvas");
    if (!container || !canvas || typeof TweenLite === "undefined") {
      return;
    }
    ctx = canvas.getContext("2d");
    resize();

    target = { x: width / 2, y: height / 2 };

    points = [];
    for (var x = 0; x < width; x += width / 20) {
      for (var y = 0; y < height; y += height / 20) {
        var px = x + (Math.random() * width) / 20;
        var py = y + (Math.random() * height) / 20;
        points.push({ x: px, originX: px, y: py, originY: py });
      }
    }

    for (var i = 0; i < points.length; i++) {
      var closest = [];
      var p1 = points[i];
      for (var j = 0; j < points.length; j++) {
        var p2 = points[j];
        if (p1 === p2) {
          continue;
        }
        var placed = false;
        for (var k = 0; k < 5; k++) {
          if (!placed && closest[k] === undefined) {
            closest[k] = p2;
            placed = true;
          }
        }
        for (var k = 0; k < 5; k++) {
          if (!placed && getDistance(p1, p2) < getDistance(p1, closest[k])) {
            closest[k] = p2;
            placed = true;
          }
        }
      }
      p1.closest = closest;
    }

    for (var i = 0; i < points.length; i++) {
      points[i].circle = new Circle(points[i], 2 + Math.random() * 2);
    }

    animate();
    for (var i = 0; i < points.length; i++) {
      shiftPoint(points[i]);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", resize);
  }

  function resize() {
    var rect = container.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = rect.height;
  }

  function onMouseMove(event) {
    var rect = container.getBoundingClientRect();
    target.x = event.clientX - rect.left;
    target.y = event.clientY - rect.top;
  }

  function animate() {
    if (ctx) {
      ctx.clearRect(0, 0, width, height);
      for (var i = 0; i < points.length; i++) {
        var d = getDistance(target, points[i]);
        if (d < 4000) {
          points[i].active = 0.4;
          points[i].circle.active = 0.7;
        } else if (d < 20000) {
          points[i].active = 0.15;
          points[i].circle.active = 0.35;
        } else if (d < 40000) {
          points[i].active = 0.04;
          points[i].circle.active = 0.12;
        } else {
          points[i].active = 0;
          points[i].circle.active = 0;
        }
        drawLines(points[i]);
        points[i].circle.draw();
      }
    }
    requestAnimationFrame(animate);
  }

  function shiftPoint(p) {
    TweenLite.to(p, 1 + Math.random(), {
      x: p.originX - 50 + Math.random() * 100,
      y: p.originY - 50 + Math.random() * 100,
      ease: Circ.easeInOut,
      onComplete: function () {
        shiftPoint(p);
      }
    });
  }

  function drawLines(p) {
    if (!p.active) {
      return;
    }
    for (var i = 0; i < p.closest.length; i++) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.closest[i].x, p.closest[i].y);
      ctx.strokeStyle = "rgba(156,217,249," + p.active + ")";
      ctx.stroke();
    }
  }

  function Circle(pos, rad) {
    this.pos = pos;
    this.radius = rad;
    this.draw = function () {
      if (!this.active) {
        return;
      }
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = "rgba(156,217,249," + this.active + ")";
      ctx.fill();
    };
  }

  function getDistance(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
