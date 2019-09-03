//Kevin Pham
//This file adds functionality to snake.html, including user input and gameplay.

"use strict";

(function() {
  let timer = null; //updates frames every 100 ms
  let canvas;       //DOM controlling HTML element with game

  //Snake
  let max = 10;  //max length of snake
  let snake = [ //coordinates of blocks of snake
    {x:0, y:0}
  ]

  let vx = 1;
  let vy = 0;

  let foodx = Math.floor(Math.random() * 50);
  let foody = Math.floor(Math.random() * 50);

  let thirdPlace = 0;

  window.addEventListener("load", function() {
    $("pause").addEventListener("click", pause);
    canvas = $("canvas").getContext("2d");
    document.addEventListener("keydown", changeDirection);
  });

  function pause() {
    if (timer == null) {
      timer = setInterval(frame, 100);
      $("pause").innerText = "Pause";
    } else {
      clearInterval(timer);
      timer = null;
      $("pause").innerText = "Play";
    }
  }

  function frame() {
    clear();
    draw();
    update();
  }

  function draw() {
    for (let i = 0; i < snake.length - 1; i++) {
      drawBox(snake[i].x, snake[i].y);
    }

    drawBox(foodx, foody);

    let newHead
  }

  function clear() {
    canvas.clearRect(0, 0, 500, 500);
  }

  function update() {
    let newHead = {x:((getHead().x + vx + 50) % 50),
                   y:((getHead().y + vy + 50) % 50)};
    if (snake.length >= max) {
      snake.shift();
    }
    snake[snake.length] = newHead;

    if (foodx == newHead.x && foody == newHead.y) {
      max++;
      foodx = Math.floor(Math.random() * 50);
      foody = Math.floor(Math.random() * 50);
    }

    for (let i = 0; i < snake.length - 1; i++) {
      if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
        endGame();
      }
    }
  }

  function endGame() {
    draw();
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
      $("pause").innerText = "Play";
    }
    console.log("what's up dawg");
    alert("Thanks for playing, your score was " + max + "!");
    if (max > thirdPlace) {
      updateBoard();
    }
    max = 10;  //max length of snake
    snake = [ //coordinates of blocks of snake
      {x:0, y:0}
    ]
    foodx = Math.floor(Math.random() * 50);
    foody = Math.floor(Math.random() * 50);
  }


  function changeDirection(key) {
    let code = key.keyCode;
    if (code == 37) {
      vx = -1;
      vy = 0;
    } else if (code == 38) {
      vx = 0;
      vy = -1;
    } else if (code == 39) {
      vx = 1;
      vy = 0;
    } else if (code == 40) {
      vx = 0;
      vy = 1;
    }
  }


  //----------------------Helper Functions---------------------//
  function $(id) {
    return document.getElementById(id);
  }

  function qs(selector) {
    return document.querySelector(selector);
  }

  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  function drawBox(x, y) {
    canvas.fillRect(x * 10, y * 10, 10, 10);
  }

  function getHead() {
    return snake[snake.length - 1];
  }

  function updateBoard() {
    let board = qsa(".row");
    let board2 = [];
    for (let i = 0; i < board.length; i++) {
      board2.push(board[i]);
    }
    board2.push(createRow(prompt("Name:", "Jeremy Bearimy"), max));
    board2.sort(function(a,b) {return b.querySelector(".score").innerText - a.querySelector(".score").innerText});
    let container = $("leaderboard");
    clearChildren(container);
    for (let i = 0; i < board2.length - 1; i++) {
      container.appendChild(board2[i]);
    }
  }

  function createRow(name, score) {
    let result = document.createElement("div");
    let nameBox = document.createElement("div");
    let scoreBox = document.createElement("div");
    result.classList.add("row");

    nameBox.classList.add("name");
    nameBox.appendChild(document.createTextNode(name));

    scoreBox.classList.add("score");
    scoreBox.appendChild(document.createTextNode(score));

    result.appendChild(nameBox);
    result.appendChild(scoreBox);
    return result;
  }

  function clearChildren(parent) {
    while (parent.hasChildNodes()) {
      parent.removeChild(parent.firstChild);
    }
  }
}) ();
