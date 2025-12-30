"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var track = document.querySelector('.feedback_content .carousel_feedback');
  var indicatorsContainer = document.querySelector('.feedback_content .carousel_indicators');
  var wrapper = document.querySelector('.feedback_content'); // контейнер для наблюдения

  var originalCards = Array.from(document.querySelectorAll('.feedback_content .carousel_feedback .feedback_card'));

  if (!track || originalCards.length === 0 || !indicatorsContainer) {
    console.warn('Карусель: отсутствуют необходимые элементы');
    return;
  } // Клонируем оригинальные карточки для бесконечной ленты


  originalCards.forEach(function (card) {
    track.appendChild(card.cloneNode(true));
  }); // После клонирования обновляем список всех карточек

  var allCards = Array.from(track.querySelectorAll('.feedback_card')); // Индикаторы

  originalCards.forEach(function (_, i) {
    var dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    indicatorsContainer.appendChild(dot);
  });
  var indicators = Array.from(indicatorsContainer.querySelectorAll('span')); // Расчёт шага

  function getStep() {
    return getStepFromOffsets(allCards);
  }

  function getStepFromOffsets(cardList) {
    if (cardList.length < 2) {
      return cardList[0].getBoundingClientRect().width;
    }

    var x0 = cardList[0].offsetLeft;
    var x1 = cardList[1].offsetLeft;
    return Math.abs(x1 - x0);
  }

  var step = getStep();
  var currentIndex = 0;
  var originalCount = originalCards.length;

  function moveTo(index, withTransition) {
    track.style.transition = withTransition ? 'transform 0.6s ease' : 'none';
    track.style.transform = 'translateX(-' + index * step + 'px)';
  }

  function updateIndicators() {
    var logicalIndex = currentIndex % originalCount;
    indicators.forEach(function (dot) {
      return dot.classList.remove('active');
    });

    if (indicators[logicalIndex]) {
      indicators[logicalIndex].classList.add('active');
    }
  }

  function next() {
    currentIndex += 1;
    moveTo(currentIndex, true);

    if (currentIndex === originalCount) {
      setTimeout(function () {
        currentIndex = 0;
        moveTo(0, false);
        updateIndicators();
      }, 600);
    } else {
      updateIndicators();
    }
  } // Инициализация


  moveTo(0, false);
  updateIndicators(); // Автопрокрутка — теперь управляем через Observer

  var timer = null;

  function startCarousel() {
    if (!timer) {
      timer = setInterval(next, 3500);
    }
  }

  function stopCarousel() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  } // Intersection Observer: следим за видимостью wrapper


  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        startCarousel();
      } else {
        stopCarousel();
      }
    });
  }, {
    threshold: 0
  });
  observer.observe(wrapper); // Пересчёт шага при ресайзе

  window.addEventListener('resize', function () {
    allCards = Array.from(track.querySelectorAll('.feedback_card'));
    step = getStep();
    moveTo(currentIndex, false);
  }); // Пауза при наведении

  track.addEventListener('mouseenter', stopCarousel);
  track.addEventListener('mouseleave', startCarousel); // Клик по индикатору

  indicators.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      currentIndex = i;
      moveTo(currentIndex, true);
      updateIndicators();
    });
  });
});