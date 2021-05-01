let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
let grid = 20;
let count = 0;
let snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
};
let apple = {
  x: 220,
  y: 220
};

let keyUp = document.querySelector('.button__up')
let keyDown = document.querySelector('.button__down')
let keyRight = document.querySelector('.button__right')
let keyLeft = document.querySelector('.button__left')

//Генератор случайных чисел
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
}

function loop() {
    // Дальше будет хитрая функция, которая замедляет скорость игры с 60 кадров в секунду до 15. Для этого она пропускает три кадра из четырёх, то есть срабатывает каждый четвёртый кадр игры. Было 60 кадров в секунду, станет 15.
    requestAnimationFrame(loop);
    // Игровой код выполнится только один раз из четырёх, в этом и суть замедления кадров, а пока переменная count меньше четырёх, код выполняться не будет.
    if (++count < 4) {
      return;
    }
    count = 0;
    // Очищаем игровое поле
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.x += snake.dx;
    snake.y += snake.dy;
    if (snake.x < 0) {
      snake.x = canvas.width - grid;
    }
    else if (snake.x >= canvas.width) {
      snake.x = 0;
    }
    if (snake.y < 0) {
      snake.y = canvas.height - grid;
    }
    else if (snake.y >= canvas.height) {
      snake.y = 0;
    }
    snake.cells.unshift({ x: snake.x, y: snake.y });
    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
    }
    
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {
      context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
      if (cell.x === apple.x && cell.y === apple.y) {
        snake.maxCells++;
        apple.x = getRandomInt(0, 15) * grid;
        apple.y = getRandomInt(0, 15) * grid;
      }
      for (let i = index + 1; i < snake.cells.length; i++) {
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
          snake.x = 160;
          snake.y = 160;
          snake.cells = [];
          snake.maxCells = 4;
          snake.dx = grid;
          snake.dy = 0;

          apple.x = getRandomInt(0, 15) * grid;
          apple.y = getRandomInt(0, 15) * grid;
        }
      }
    });
  }

  keyLeft.addEventListener('click', function(event) {
    snake.dx = -grid;
    snake.dy = 0;
  })

  keyUp.addEventListener('click', function(event) {
    snake.dy = -grid;
    snake.dx = 0;
  })

  keyRight.addEventListener('click', function(event) {
    snake.dx = grid;
    snake.dy = 0;
  })

  keyDown.addEventListener('click', function(event) {
    snake.dy = grid;
    snake.dx = 0;
  })

  requestAnimationFrame(loop);

  //        Управление с клавиатуры
//   
// document.addEventListener('keydown', function (e) {
//     if (e.which === 37 && snake.dx === 0) {
//       snake.dx = -grid;
//       snake.dy = 0;
//     }
//     // Стрелка вверх
//     else if (e.which === 38 && snake.dy === 0) {
//       snake.dy = -grid;
//       snake.dx = 0;
//     }
//     // Стрелка вправо
//     else if (e.which === 39 && snake.dx === 0) {
//       snake.dx = grid;
//       snake.dy = 0;
//     }
//     // Стрелка вниз
//     else if (e.which === 40 && snake.dy === 0) {
//       snake.dy = grid;
//       snake.dx = 0;
//     }
//   });