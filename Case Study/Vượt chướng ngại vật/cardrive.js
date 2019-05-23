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
let carX = 220;
const carY = 528;
const DISTANCE = 200;
const RIGHT = 39;
const LEFT = 37;
const CONTROL = 17;
let constant;
let point = 0;
let topScore =0;
let brick = [];
brick[0] = {x: 0, y: 0};
let coin = {x: 350, y: 0};

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

function draw() {
    //SCREEN
    ctx.drawImage(road, 0, 0, 500, 678);
    //CAR
    ctx.drawImage(car, carX, carY, 60, 100);
    if (rightPressed && carX <= context.width - 160)
        carX += 5;
    else if (leftPressed && carX >= 100)
        carX -= 5;

    if (controlPressed && rightPressed && carX <= context.width - 160)
        carX += 10;
    else if (controlPressed && leftPressed && carX >= 100)
        carX -= 10;

    //COIN
    ctx.drawImage(coinGod, coin.x, coin.y, 30, 30);

    if (controlPressed)
        coin.y += 10;
    else
        coin.y += 5;
    // PHÁT HIỆN VA CHẠM COIN
    if ((528 <= coin.y + 30) && (628 >= coin.y) &&
        (carX + 60 > coin.x) && (carX < coin.x + 30)) {
        point++;
        score.play();
        coin = {x: Math.floor(Math.random() * 300) + 100, y: -350}
    }
    // TRƯỜNG HỢP XẢY RA LỖI COIN
    if (coin.y > 678) {
        coin = {x: Math.floor(Math.random() * 300) + 100, y: -350}
    }
    //BRICK
    for (let i = 0; i < brick.length; i++) {
        ctx.drawImage(brick1, brick[i].x, brick[i].y, 250, 50);
        constant = brick1.width + DISTANCE;
        ctx.drawImage(brick2, brick[i].x + constant, brick[i].y, 250, 50);

        if (controlPressed)
            brick[i].y += 10;
        else
            brick[i].y += 5;

        if (brick[i].y === 300) {
            brick.push({x: Math.floor(Math.random() * brick1.width) - brick1.width, y: -100});
        }
        if (brick[i].y === 500) {
            point++;
        }
        //PHÁT HIỆN VA CHẠM BRICK
        if ((528 <= brick[i].y + brick1.height) && (608 >= brick[i].y)
            && ((carX + 20 <= brick[i].x + brick1.width) ||
                (carX + car.width - 20 >= brick[i].x + constant))) {
            lose.play();
            alert("Game Over");
            location.reload();
        }
        // TRƯỜNG HỢP XẢY RA LỖI BRICK
        if (brick[brick.length - 1].y > 678) {
            brick.push({x: Math.floor(Math.random() * brick1.width) - brick1.width, y: -100});
        }
    }
    //ROADSIZE
    ctx.drawImage(roadsizeLeft, 400, 0, 100, 678);
    ctx.drawImage(roadsizeRight, 0, 0, 100, 678);
    //SCORE
    ctx.fillText("Score : " + point, 5, context.height - 20);
    ctx.font = "18px Verdana";
    ctx.fillStyle = "white";
    //ANIMATION DRAW
    requestAnimationFrame(draw);

}
//UPDATE DRAW AFTER 10 SECONDS
setInterval(draw, 10000);
