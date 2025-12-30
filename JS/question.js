document.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.question_box');

  boxes.forEach(box => {
    const item = box.querySelector('.question_box_item');
    const answer = box.querySelector('.question_box_answer');

    item.addEventListener('click', () => {
      // закрываем все остальные
      boxes.forEach(b => {
        if (b !== box) {
          b.classList.remove('active');
          b.querySelector('.question_box_answer').style.maxHeight = null;
        }
      });

      // переключаем текущий
      box.classList.toggle('active');

      if (box.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight +"px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  });
});
