"use strict";

const canvas = document.getElementById("game"); //захватываем область
const ctx = canvas.getContext("2d"); //контекст - указываем формат игры

//рисуем игровое поле
const gameBoard = new Image();
gameBoard.src = "img/board_for_snake.jpg";

//рисуем еду (яблоко)
const apple = new Image();
apple.src = "img/apple.png";

//рисуем камень
const stone = new Image();
stone.src = "img/stone_small.png";

const stone2 = new Image();
stone2.src = "img/stone_small.png";

//Вводим переменную для определения размера квадратов поля
let box = 32;

//Вводим переменную для счетчика
let score = 0;

//Задание начальных координат еды на поле
let food = {
    x: Math.floor(Math.random() * 21 + 1) * box,

    y: Math.floor(Math.random() * 19 + 3) * box,
};

//Задание координат камня
let stonePos = {
    x: Math.floor(Math.random() * 21 + 1) * box,

    y: Math.floor(Math.random() * 19 + 3) * box,
};

let stonePos2 = {
    x: Math.floor(Math.random() * 21 + 1) * box,

    y: Math.floor(Math.random() * 19 + 3) * box,
};

//сама змейка представленна массивом
let snake = [];

//определяем начальное положение змейки
snake[0] = {
    x: 11 * box,
    y: 12 * box,
};

//Движение змейки
document.addEventListener("keydown", direction);

//переменная, отвечающая за направление движения
let dir;

function direction(event) {
    if (event.keyCode == 65 && dir != "right") {
        dir = "left";
    } else if (event.keyCode == 87 && dir != "down") {
        dir = "up";
    } else if (event.keyCode == 68 && dir != "left") {
        dir = "right";
    } else if (event.keyCode == 83 && dir != "up") {
        dir = "down";
    }
}

//функция отвечающая за остановку игры при поедании хвоста
function eatingTail(head, body) {
    for (let i = 0; i < body.length; i++) {
        if (head.x == body[i].x && head.y == body[i].y) {
            clearInterval(showGame);
        }
    }
}

//Функция отвечающая за отображение объектов
function drawGame() {
    ctx.drawImage(gameBoard, 0, 0); //отображение игрового поля

    ctx.drawImage(apple, food.x, food.y); //отображение еды

    ctx.drawImage(stone, stonePos.x, stonePos.y); //отображение камня
    ctx.drawImage(stone2, stonePos2.x, stonePos2.y);

    //текстовое табло
    ctx.fillStyle = "white";
    ctx.font = "35px Arial";
    ctx.fillText(score, box * 2.1, box * 1.4);

    //определяем текущие координаты головы змеи
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //прорисовка самой змеи
    //цикл позволит нарисовать длинную змею с головой другого цвета
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "orange" : "yellow";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    //условие поражения, установка границ
    if (snakeX < box || snakeX > box * 21 ||
        snakeY < box * 3 || snakeY > box * 21) {
            clearInterval(showGame);
    }

    //удар о камень
    if (snakeX == stonePos.x && snakeY == stonePos.y) {
        clearInterval(showGame);
    }
    if (snakeX == stonePos2.x && snakeY == stonePos2.y) {
        clearInterval(showGame);
    }

    //ответ на нажатие клавиш
    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;

    //поедание еды
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 21 + 1) * box,
        
            y: Math.floor(Math.random() * 19 + 3) * box,
        };
    } else {
        snake.pop(); // это удаляет старое положение змеи
    }

    //создание змейки в новом месте при перемещении
    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    eatingTail(newHead, snake);

    snake.unshift(newHead);
}

//запуск отображения

let showGame = setInterval(drawGame, 100);


