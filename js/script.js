const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const b1 = document.querySelector(".b1");
const b2 = document.querySelector(".b2");
const b3 = document.querySelector(".b3");
const b4 = document.querySelector(".b4");

const ground = new Image();
ground.src = "img/ground.png"

const foodImg = new Image();
foodImg.src = "img/food.png";

const snakeHeadRight = new Image();
snakeHeadRight.src = "img/snakeHeadRight.png";

const snakeHeadLeft = new Image();
snakeHeadLeft.src = "img/snakeHeadLeft.png";

const snakeHeadUp = new Image();
snakeHeadUp.src = "img/snakeHeadUp.png";

const snakeHeadDown = new Image();
snakeHeadDown.src = "img/snakeHeadDown.png";

const snakeBody = new Image();
snakeBody.src = "img/snakeBody.png";

const arrowLeft = new Image();
arrowLeft.src = "img/left.png";

const arrowRight = new Image();
arrowRight.src = "img/right.png";

const arrowUp = new Image();
arrowUp.src = "img/up.png";

const arrowDown = new Image();
arrowDown.src = "img/down.png";

let box = 32;

let score = 0;

let food = {
    x: Math.floor((Math.random() * 15 + 2)) * box,
    y: Math.floor((Math.random() * 14 + 3)) * box,
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

document.addEventListener("keydown", direction);

let dir = '';

b4.onclick = () => {
    dir = 'up';
}
b1.onclick = () => {
    dir = 'left';
}
b2.onclick = () => {
    dir = 'down';
}
b3.onclick = () => {
    dir = 'right';
}


function direction(event) {
    if(event.keyCode == 37 && dir != 'right') {
        dir = 'left';
    }
    else if(event.keyCode == 38 && dir != 'down') {
        dir = 'up';
    }
    else if(event.keyCode == 39 && dir != 'left') {
        dir = 'right'
    }
    else if(event.keyCode == 40 && dir != 'up') {
        dir = 'down';
    }
}

function eatTail(head, arr) {
    for( let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
            alert(`Игра окончена. Вы набрали ${score} очков!`)
            location.reload();
        }

    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y);

    for(let i = 0; i < snake.length; i++) {
        if (i == 0) {
            if(dir == 'left') {
                ctx.drawImage(snakeHeadLeft, snake[i].x, snake[i].y)
            }
            else if (dir == 'right') {
                ctx.drawImage(snakeHeadRight, snake[i].x, snake[i].y)
            }
            else if (dir == 'up') {
                ctx.drawImage(snakeHeadUp, snake[i].x, snake[i].y)
            }
            else if (dir == 'down') {
                ctx.drawImage(snakeHeadDown, snake[i].x, snake[i].y)
            }

        }
        else {
            ctx.drawImage(snakeBody, snake[i].x, snake[i].y)
            
        }
        
        
    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.8, box * 1.8);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 15 + 2)) * box,
            y: Math.floor((Math.random() * 14 + 3)) * box,
        };
        
    } else {
        snake.pop()
    }

    if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
        clearInterval(game);
        alert(`Игра окончена. Вы набрали ${score} очков!`)
        location.reload();
        
    }

    if(dir == 'left') snakeX -= box;
    if(dir == 'right') snakeX += box;
    if(dir == 'up') snakeY -= box;
    if(dir == 'down') snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };
    
    eatTail(newHead, snake);

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 200);
