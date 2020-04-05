const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

// ctx.fillStyle = "blue";
// ctx.fillRect(0, 0, 100, 100);
let cactus = new Image();
cactus.src = "img/cactus.png";

let dino = new Image();
dino.src = "img/dino.png";

let gap = 90;

let score = 0;

function init() {
  sec = 0;
  setInterval(tick, 1000);
}
function tick() {
  sec++;
  document.getElementById("timer").childNodes[0].nodeValue = sec;
}

function cactusJump() {
  yPos -= 160;
}

let block = [];

block[0] = {
  x: cvs.width,
  y: 0,
};

let xPos = 10;
let yPos = 220;
let grav = 1;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  ctx.fillRect(0, 260, cvs.width, cvs.height - 28);

  for (var i = 0; i < block.length; i++) {
    ctx.drawImage(dino, block[i].x, 220);
    block[i].x--;

    if (block[i].x == 300) {
      block.push({
        x: cvs.width - Math.floor(Math.random() * 110 - 50),
        y: 220,
      });
    }
    if (xPos + cactus.width >= block[i].x && xPos <= block[i].x + 30) {
      if (yPos >= 180) {
        console.log("y-pos of cactus:", yPos);
        console.log("y-pos of dino: ", block[i].y);
        console.log("x-pos of dino: ", block[i].x);
        clearInterval(game);
        document.getElementById("restart").style.display = "flex";
      }
    }
    if (block[i].x == 10) {
      score++;
      console.log("score: ", score);
    }
  }

  ctx.drawImage(cactus, xPos, yPos);

  let jump = 0;

  if (yPos == 220) {
    document.addEventListener("keydown", cactusJump);
  }

  if (yPos < 220) {
    yPos += grav;
    jump = 0;
  }
  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana cursive";
  ctx.fillText("Score: " + score, 10, cvs.height - 220);
}

let game = setInterval(draw, 7);
