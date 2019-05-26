let context = document.getElementById("canvas");
let ctx = context.getContext("2d");
let car = new Image();
let brick1 = new Image();
let brick2 = new Image();
let road = new Image();
let roadsizeLeft = new Image();
let roadsizeRight = new Image();
let coinGod = new Image();
let score = new Audio();
let lose = new Audio();

car.src = "img/Car.png";
brick1.src = "img/brick.jpg";
brick2.src = "img/brick.jpg";
road.src = "img/road.jpg";
roadsizeLeft.src = "img/roadsizeRigth.png";
roadsizeRight.src = "img/roadsizeLeft.png";
coinGod.src = "img/coin.jpg";
score.src = "sound/score.mp3";
lose.src = "sound/boom.mp3";

let rightPressed = false;
let leftPressed = false;
let controlPressed = false;
let constant;
let point = 0;
let brick = [];
brick[0] = {x: 0, y: 0};
let coin = {x: 350, y: 0};
let carX = 220;
const CAR_Y = 528;
const CAR_WIDTH = 60;
const CAR_HEIGHT = 100;
const ROADSIZE_WIDTH = 100;
const DISTANCE = 200;
const DISTANCE_HEIGHT = 300;
const BRICK_WIDTH = 250;
const BRICK_HEIGHT = 50;
const COIN_WIDTH = COIN_HEIGHT = 30;
const SPEED_MIN = 5;
const SPEED_MAX = 10;
const PIXELS = 20;
const STARTING_POINT = -350;
const PLUS_POINT = 500;
const SCORE_TOP = context.height - 20;
const SCORE_LEFT = 5;
const RIGHT = 39;
const LEFT = 37;
const CONTROL = 17;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(evt) {
    if (evt.keyCode == RIGHT)
        rightPressed = true;
    else if (evt.keyCode == LEFT)
        leftPressed = true;
    if (evt.keyCode == CONTROL)
        controlPressed = true;
}

function keyUpHandler(evt) {
    if (evt.keyCode == RIGHT)
        rightPressed = false;
    else if (evt.keyCode == LEFT)
        leftPressed = false;
    if (evt.keyCode == CONTROL)
        controlPressed = false;
}

function screen() {
    ctx.drawImage(road, 0, 0, context.width, context.height);
    ctx.drawImage(car, carX, CAR_Y, CAR_WIDTH, CAR_HEIGHT);
}

function draw() {
    screen();
    //CAR
    if (rightPressed && carX <= context.width - ROADSIZE_WIDTH - CAR_WIDTH)
        carX += SPEED_MIN;
    else if (leftPressed && carX >= ROADSIZE_WIDTH)
        carX -= SPEED_MIN;

    if (controlPressed && rightPressed && carX <= context.width - ROADSIZE_WIDTH - CAR_WIDTH)
        carX += SPEED_MAX;
    else if (controlPressed && leftPressed && carX >= ROADSIZE_WIDTH)
        carX -= SPEED_MAX;
    //COIN
    ctx.drawImage(coinGod, coin.x, coin.y, COIN_WIDTH, COIN_HEIGHT);

    if (controlPressed)
        coin.y += SPEED_MAX;
    else
        coin.y += SPEED_MIN;
    // PHÁT HIỆN VA CHẠM COIN
    if ((CAR_Y <= coin.y + COIN_HEIGHT) && (CAR_Y + CAR_HEIGHT >= coin.y) &&
        (carX + CAR_WIDTH > coin.x) && (carX < coin.x + COIN_WIDTH)) {
        point++;
        score.play();
        coin = {
            x: Math.floor(Math.random() * context.width - ROADSIZE_WIDTH - COIN_WIDTH - ROADSIZE_WIDTH) + ROADSIZE_WIDTH,
            y: STARTING_POINT
        }
    }
    // TRƯỜNG HỢP XẢY RA LỖI COIN
    if (coin.y > context.height) {
        coin = {
            x: Math.floor(Math.random() * context.width - ROADSIZE_WIDTH - COIN_WIDTH - ROADSIZE_WIDTH) + ROADSIZE_WIDTH,
            y: STARTING_POINT
        }
    }
    //BRICK
    for (let i = 0; i < brick.length; i++) {
        ctx.drawImage(brick1, brick[i].x, brick[i].y, BRICK_WIDTH, BRICK_HEIGHT);
        constant = BRICK_WIDTH + DISTANCE;
        ctx.drawImage(brick2, brick[i].x + constant, brick[i].y, BRICK_WIDTH, BRICK_HEIGHT);

        if (controlPressed)
            brick[i].y += SPEED_MAX;
        else
            brick[i].y += SPEED_MIN;

        if (brick[i].y === DISTANCE_HEIGHT) {
            brick.push({x: Math.floor(Math.random() * BRICK_WIDTH) - BRICK_WIDTH, y: -BRICK_HEIGHT});
        }
        if (brick[i].y === PLUS_POINT) {
            point++;
        }
        //PHÁT HIỆN VA CHẠM BRICK
        if ((CAR_Y <= brick[i].y + BRICK_HEIGHT) && (CAR_Y + CAR_HEIGHT >= brick[i].y + PIXELS)
            && ((carX + PIXELS <= brick[i].x + BRICK_WIDTH) ||
                (carX + CAR_WIDTH >= brick[i].x + constant + PIXELS))) {
            lose.play();
            alert("Game Over");
            location.reload();
        }
        // TRƯỜNG HỢP XẢY RA LỖI BRICK
        if (brick[brick.length - 1].y > context.height) {
            brick.push({x: Math.floor(Math.random() * BRICK_WIDTH) - BRICK_WIDTH, y: -BRICK_HEIGHT});
        }
    }
    //ROADSIZE
    ctx.drawImage(roadsizeLeft, context.width - ROADSIZE_WIDTH, 0, ROADSIZE_WIDTH, context.height);
    ctx.drawImage(roadsizeRight, 0, 0, ROADSIZE_WIDTH, context.height);
    //SCORE
    ctx.fillText("Score : " + point, SCORE_LEFT, SCORE_TOP);
    ctx.font = "18px Verdana";
    ctx.fillStyle = "white";
    //ANIMATION DRAW
    requestAnimationFrame(draw);
}

//UPDATE DRAW AFTER 10 SECONDS
setInterval(draw, 20000);
