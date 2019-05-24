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
let topScore =0;
let brick = [];
brick[0] = {x: 0, y: 0};
let coin = {x: 350, y: 0};
let carX = 220;
const CARY = 528;
const CARWIDTH = 60;
const CARHEIGHT = 100;
const ROADSIZEWIDTH = 100;
const DISTANCE = 200;
const DISTANCEHEIGHT = 300;
const BRICKWIDTH = 250;
const BRICKHEIGHT = 50;
const COINWIDTH = COINHEIGHT = 30;
const SPEEDMIN = 5;
const SPEEDMAX = 10;
const PIXELS = 20;
const STARTINGPOINT = -350;
const PLUSPOINT = 500;
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
    ctx.drawImage(car, carX, CARY, CARWIDTH, CARHEIGHT);
}

function draw() {
    screen();
    //CAR
    if (rightPressed && carX <= context.width - ROADSIZEWIDTH - CARWIDTH)
        carX += SPEEDMIN;
    else if (leftPressed && carX >= ROADSIZEWIDTH)
        carX -= SPEEDMIN;

    if (controlPressed && rightPressed && carX <= context.width - ROADSIZEWIDTH - CARWIDTH)
        carX += SPEEDMAX;
    else if (controlPressed && leftPressed && carX >= ROADSIZEWIDTH)
        carX -= SPEEDMAX;
    //COIN
    ctx.drawImage(coinGod, coin.x, coin.y, COINWIDTH, COINHEIGHT);

    if (controlPressed)
        coin.y += SPEEDMAX;
    else
        coin.y += SPEEDMIN;
    // PHÁT HIỆN VA CHẠM COIN
    if ((CARY <= coin.y + COINHEIGHT) && (CARY+CARHEIGHT >= coin.y) &&
        (carX + CARWIDTH > coin.x) && (carX < coin.x + COINWIDTH)) {
        point++;
        score.play();
        coin = {x: Math.floor(Math.random() * context.width - ROADSIZEWIDTH - COINWIDTH - ROADSIZEWIDTH ) + ROADSIZEWIDTH, y: STARTINGPOINT}
    }
    // TRƯỜNG HỢP XẢY RA LỖI COIN
    if (coin.y > context.height) {
        coin = {x: Math.floor(Math.random() * context.width - ROADSIZEWIDTH - COINWIDTH- ROADSIZEWIDTH ) + ROADSIZEWIDTH, y: STARTINGPOINT}
    }
    //BRICK
    for (let i = 0; i < brick.length; i++) {
        ctx.drawImage(brick1, brick[i].x, brick[i].y, BRICKWIDTH, BRICKHEIGHT);
        constant = brick1.width + DISTANCE;
        ctx.drawImage(brick2, brick[i].x + constant, brick[i].y, BRICKWIDTH, BRICKHEIGHT);

        if (controlPressed)
            brick[i].y += SPEEDMAX;
        else
            brick[i].y += SPEEDMIN;

        if (brick[i].y === DISTANCEHEIGHT) {
            brick.push({x: Math.floor(Math.random() * brick1.width) - brick1.width, y: - BRICKHEIGHT});
        }
        if (brick[i].y === PLUSPOINT) {
            point++;
        }
        //PHÁT HIỆN VA CHẠM BRICK
        if ((CARY <= brick[i].y + brick1.height) && (CARY + CARHEIGHT>= brick[i].y + PIXELS)
            && ((carX + PIXELS <= brick[i].x + brick1.width) ||
                (carX + car.width >= brick[i].x + constant +PIXELS))) {
            lose.play();
            alert("Game Over");
            location.reload();
        }
        // TRƯỜNG HỢP XẢY RA LỖI BRICK
        if (brick[brick.length - 1].y > context.height) {
            brick.push({x: Math.floor(Math.random() * brick1.width) - brick1.width, y: - BRICKHEIGHT});
        }
    }
    //ROADSIZE
    ctx.drawImage(roadsizeLeft, context.width - ROADSIZEWIDTH , 0, ROADSIZEWIDTH, context.height);
    ctx.drawImage(roadsizeRight, 0, 0, ROADSIZEWIDTH, context.height);
    //SCORE
    ctx.fillText("Score : " + point, 5, context.height - 20);
    ctx.font = "18px Verdana";
    ctx.fillStyle = "white";
    //ANIMATION DRAW
    requestAnimationFrame(draw);
}
//UPDATE DRAW AFTER 10 SECONDS
setInterval(draw, 20000);
