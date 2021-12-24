window.onload = function () {
   const canvas = document.getElementById('playGround');
   const context = canvas.getContext('2d');

   let discr = document.querySelector('.discr'),
      reset = document.querySelector('.reset'),
      hiden = 0;


   const groundImage = new Image();
   groundImage.src = 'img/ground.png';

   const foodImage = new Image();
   foodImage.src = 'img/food.png';

   const box = 32;


   let food = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box,
   };

   let snake = [],
      score = 0,
      maxScore = 0,
      dir,
      flag = true,
      pause = "active";



   snake[0] = {
      x: 9 * box,
      y: 10 * box,
   };

   document.addEventListener('keydown', keyDown);

   function keyDown(e) {

      if (pause == 'lost') {                    //Перезапуск игры
         if (e.keyCode == 32) {
            resetGame();
         }
         return;
      };

      if (e.keyCode == 27) {                 //Остановка игры
         if (pause == 'active') {
            pause = "paused";
         } else {
            pause = "active";
         };
         return
      };


      if (!flag) { return };                 //Блокировка нажатия 

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
      flag = false;

      if (hiden == 0) {                            //Убрать начальный экран
         discr.classList.add('hide');
         hiden = 1;
      };


      pause = "active";
   };


   function eatTail(newHead) {

      for (let i = 0; i < snake.length; i++) {
         if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
            pause = 'lost';
            yourLost();
         };
      };



   };


   function gameLoop() {



      if (pause == 'lost') { return };           //Блокировка игры

      context.drawImage(groundImage, 0, 0);

      context.drawImage(foodImage, food.x, food.y);


      for (let i = 0; i < snake.length; i++) {
         context.fillStyle = i == 0 ? 'white' : 'black';
         context.fillRect(snake[i].x, snake[i].y, box, box);
      };


      context.fillStyle = 'white';
      context.font = '30px Areal';
      context.fillText(score, 1.8 * box, 1.55 * box);
      context.fillText('Max: ' + maxScore, 15 * box, 1.55 * box);

      if (score > maxScore) {
         maxScore = score;
      };


      if (pause == 'paused') { return };     //Пауза


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
         pause = 'lost';
         yourLost();
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


      flag = true;

   };

   let loop = setInterval(gameLoop, 100);



   function yourLost() {
      reset.classList.add('active');


   };

   function resetGame() {

      snake.length = 0;
      snake[0] = {
         x: 9 * box,
         y: 10 * box,
      };
      food = {
         x: Math.floor((Math.random() * 17 + 1)) * box,
         y: Math.floor((Math.random() * 15 + 3)) * box,
      };
      pause = 'active';
      score = 0;
      dir = 0;


      reset.classList.remove('active');
   };

};