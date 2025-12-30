document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.hero__curency');
  const wrapper = document.querySelector('.hero_ticker');
  if (!track || !wrapper) return;

  // Дублируем содержимое для бесконечной прокрутки
  const originalHTML = track.innerHTML;
  track.innerHTML = originalHTML + originalHTML;

  let pos = 0;
  const speed = 30; // px/сек
  let halfWidth = track.scrollWidth / 2;
  let lastTime = performance.now();
  let running = false; // флаг анимации

  function tick(now) {
    if (!running) {
      requestAnimationFrame(tick);
      return;
    }

    const dt = (now - lastTime) / 1000;
    lastTime = now;

    pos -= speed * dt;
    if (pos <= -halfWidth) {
      pos += halfWidth;
    }

    track.style.transform = `translateX(${pos}px)`;
    requestAnimationFrame(tick);
  }

  // Запускаем анимацию
  requestAnimationFrame(function (t) {
    lastTime = t;
    requestAnimationFrame(tick);
  });

  // Intersection Observer: следим за видимостью wrapper
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        running = true;  // включаем анимацию
      } else {
        running = false; // выключаем анимацию
      }
    });
  }, { threshold: 0 }); // threshold=0 → реагирует даже на малую видимость

  observer.observe(wrapper);

  // Пересчёт ширины при ресайзе
  window.addEventListener('resize', () => {
    pos = 0;
    halfWidth = track.scrollWidth / 2;
  });
});
