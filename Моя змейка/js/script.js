const canvas = document.getElementById('playGround');
const context = canvas.getContext('2d');


const groundImage = new Image();
groundImage.src = 'img/ground.png';

const foodImage = new Image();
foodImage.src = 'img/food.png';

const box = 32;


let food = {
   x: Math.floor((Math.random() * 17 + 1)) * box,
   y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
   x: 9 * box,
   y: 10 * box,
};

let score = 0;

let dir;


document.addEventListener('keydown', keyDown);

function keyDown(e) {
   if (e.keyCode == 37 && dir != 'right') {
      dir = 'left';
   }
   else if (e.keyCode == 38 && dir != 'down') {
      dir = 'up';
   }
   else if (e.keyCode == 39 && dir != 'left') {
      dir = 'right';
   }
   else if (e.keyCode == 40 && dir != 'up') {
      dir = 'down';
   };
};


function eatTail(newHead) {

   for (let i = 0; i < snake.length; i++) {
      if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
         clearInterval(loop);
      };
   };



};




function gameLoop() {

   context.drawImage(groundImage, 0, 0);

   context.drawImage(foodImage, food.x, food.y);


   for (let i = 0; i < snake.length; i++) {
      context.fillStyle = i == 0 ? 'white' : 'black';
      context.fillRect(snake[i].x, snake[i].y, box, box);
   };


   context.fillStyle = 'white';
   context.font = '30px Areal';
   context.fillText(score, 1.8 * box, 1.55 * box);


   let snakeX = snake[0].x;            //Координаты для дальнейшего спавна головы
   let snakeY = snake[0].y;            //Координаты для дальнейшего спавна головы





   if (food.x == snakeX && food.y == snakeY) {
      score++;
      food = {
         x: Math.floor((Math.random() * 17 + 1)) * box,
         y: Math.floor((Math.random() * 15 + 3)) * box,
      };
   } else {
      snake.pop();
   };

   if (snakeX > 17 * box || snakeX < box || snakeY < 3 * box || snakeY > 17 * box) {
      clearInterval(loop);
   };

   if (dir == 'left') snakeX -= box;
   if (dir == 'right') snakeX += box;
   if (dir == 'up') snakeY -= box;
   if (dir == 'down') snakeY += box;

   let newHead = {
      x: snakeX,
      y: snakeY,
   };


   eatTail(newHead);

   snake.unshift(newHead);





}

let loop = setInterval(gameLoop, 100);