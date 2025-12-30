"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var boxes = document.querySelectorAll('.question_box');
  boxes.forEach(function (box) {
    var item = box.querySelector('.question_box_item');
    var answer = box.querySelector('.question_box_answer');
    item.addEventListener('click', function () {
      // закрываем все остальные
      boxes.forEach(function (b) {
        if (b !== box) {
          b.classList.remove('active');
          b.querySelector('.question_box_answer').style.maxHeight = null;
        }
      }); // переключаем текущий

      box.classList.toggle('active');

      if (box.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  });
});