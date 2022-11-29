const ctx = document.getElementById("canvas").getContext("2d");

let ballX = 375,
  ballY = 210,
  ballSpeed = [200, 200];

let leftPaddleY = 150,
  rightPaddleY = 150,
  leftScore = 0,
  rightScore = 0;

function drawLeftPaddle(y) {
  ctx.fillStyle = "#000";

  ctx.fillRect(0, y, 25, 150);
}

function drawRightPaddle(y) {
  ctx.fillStyle = "#000";

  ctx.fillRect(775, y, 25, 150);
}

function drawBall(x, y) {
  ctx.fillStyle = "#000";

  ctx.fillRect(x, y, 30, 30);
}

function checkPaddleBorderTopCollision(y, h) {
  return y < 0
}

function checkPaddleBorderBottomCollision(y, h) {
  return y + 150 > 450
}

function checkBallSideBorderCollision(x) {
  return x > 785 || x < 0
}

function checkBallVerticalBorderCollision(y) {
  return y > 422 || y < 0
}

function checkLeftPaddleCollision(paddleX, paddleY, paddleW, paddleH, ballX, ballY, ballW, ballH) {
  return (ballX < paddleX + ballW - 5) && (ballY > paddleY && ballY < paddleY + paddleH)
}

function checkRightPaddleCollision(paddleX, paddleY, paddleW, paddleH, ballX, ballY, ballW, ballH) {
  return (ballX > paddleX - ballW) && (ballY > paddleY && ballY < paddleY + paddleH)
}

function reset() {
  leftScore = 0
  rightScore = 0

  ballX = 375 
  ballY = 210
  leftPaddleY = 150, rightPaddleY = 150

  document.getElementById("left-score").innerHTML = leftScore
  document.getElementById("right-score").innerHTML = rightScore
}

function handleScore(side) {
  if (side == "r") {
    leftScore++
    document.getElementById("left-score").innerHTML = leftScore
  } else if (side == "l") {
    rightScore++
    document.getElementById("right-score").innerHTML = rightScore
  }
  ballX = 375
  ballY = 210

  leftPaddleY = 150
  rightPaddleY = 150
}

window.addEventListener("keydown", (e) => {
    console.log("press " + e.key);
    switch(e.key) {
        case 'w':
          if (checkPaddleBorderTopCollision(leftPaddleY, 150)) return
          leftPaddleY -= 750 * timePassed
          break;
        case 's':
          if (checkPaddleBorderBottomCollision(leftPaddleY, 150)) return
          leftPaddleY += 750 * timePassed
          break;
        case 'ArrowUp':
          if (checkPaddleBorderTopCollision(rightPaddleY, 150)) return
          rightPaddleY -= 750 * timePassed
          break;
        case 'ArrowDown':
          if (checkPaddleBorderBottomCollision(rightPaddleY, 150)) return
          rightPaddleY += 750 * timePassed
          break;
        case 'r':
          reset();
          break;
          
    }
})

let t

let timePassed

function main() {
    timePassed = (Date.now() - t) / 1000;

    t = Date.now();

    ctx.clearRect(0, 0, 800, 450);

    drawLeftPaddle(leftPaddleY);

    drawRightPaddle(rightPaddleY);

    if (checkBallSideBorderCollision(ballX)) {
      if (ballX > 700) {
        handleScore("r")
      } else {
        handleScore('l')
      }

    } else if (checkBallVerticalBorderCollision(ballY)) {

      ballSpeed[1] *= -1

    } else if (checkLeftPaddleCollision(0, leftPaddleY, 25, 150, ballX, ballY, 30, 30)) {

      ballSpeed[0] *= -1
    } else if (checkRightPaddleCollision(775, rightPaddleY, 25, 150, ballX, ballY, 30, 30)) {

      ballSpeed[0] *= -1
    }

    ballX += ballSpeed[0] * timePassed

    ballY += ballSpeed[1] * timePassed

    drawBall(ballX, ballY);

    window.requestAnimationFrame(main)
}


window.onload = function() {
  reset()
  main()
}