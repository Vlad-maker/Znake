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

const score = document.querySelector(".info__block")

let keyUp = document.querySelector('.button__up')
let keyDown = document.querySelector('.button__down')
let keyRight = document.querySelector('.button__right')
let keyLeft = document.querySelector('.button__left')

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
}

function loop() {
    requestAnimationFrame(loop);
    if (++count < 7) {
      return;
    }
    count = 0;
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
    
    context.fillStyle = 'lightgreen';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    context.fillStyle = 'skyblue';
    snake.cells.forEach(function (cell, index) {
      context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
      if (cell.x === apple.x && cell.y === apple.y) {
        snake.maxCells++;
        //Set Score
        score.textContent = snake.maxCells * 3;
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
          score.textContent = snake.maxCells * 3;
          apple.x = getRandomInt(0, 15) * grid;
          apple.y = getRandomInt(0, 15) * grid;
        }
      }
    });
  }

  keyLeft.addEventListener('click', function(event) {
    if (snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }})

  keyUp.addEventListener('click', function(event) {
    if (snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }})

  keyRight.addEventListener('click', function(event) {
    if (snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }})

  keyDown.addEventListener('click', function(event) {
    if (snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }})

  requestAnimationFrame(loop);
