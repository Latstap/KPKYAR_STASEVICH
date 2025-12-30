"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var track = document.querySelector('.hero__curency');
  var wrapper = document.querySelector('.hero_ticker');
  if (!track || !wrapper) return; // Дублируем содержимое для бесконечной прокрутки

  var originalHTML = track.innerHTML;
  track.innerHTML = originalHTML + originalHTML;
  var pos = 0;
  var speed = 30; // px/сек

  var halfWidth = track.scrollWidth / 2;
  var lastTime = performance.now();
  var running = false; // флаг анимации

  function tick(now) {
    if (!running) {
      requestAnimationFrame(tick);
      return;
    }

    var dt = (now - lastTime) / 1000;
    lastTime = now;
    pos -= speed * dt;

    if (pos <= -halfWidth) {
      pos += halfWidth;
    }

    track.style.transform = "translateX(".concat(pos, "px)");
    requestAnimationFrame(tick);
  } // Запускаем анимацию


  requestAnimationFrame(function (t) {
    lastTime = t;
    requestAnimationFrame(tick);
  }); // Intersection Observer: следим за видимостью wrapper

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        running = true; // включаем анимацию
      } else {
        running = false; // выключаем анимацию
      }
    });
  }, {
    threshold: 0
  }); // threshold=0 → реагирует даже на малую видимость

  observer.observe(wrapper); // Пересчёт ширины при ресайзе

  window.addEventListener('resize', function () {
    pos = 0;
    halfWidth = track.scrollWidth / 2;
  });
});