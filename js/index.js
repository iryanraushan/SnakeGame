// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");

let speed = 4;
let hiscoreval = 0;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];

console.log("start");

food = { x: 5, y: 5 };

// Game Functions
function main(ctime) {
  console.log("main staer");
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  // If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // If you bump into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }

  return false;
}

function popupDesign() {
  console.log("popupDesign start");
  const scoreDisplay = document.getElementById("scoreDisplay");
  const levelDisplay = document.getElementById("levelDisplay");
  const speedDisplay = document.getElementById("speedDisplay");
  const acchive = document.getElementById("acchive");
  let funMessage = "";
  if (score < 10) {
    funMessage = "LOL 😄 You're just getting started!";
  } else if (score <= 30 && score >= 10) {
    funMessage = "Not Bad 🤩 Keep it up!";
  } else if (score >= 31 && score <= 100) {
    funMessage = "Good job Champ 🎉 You're on fire!";
  } else if (score >= 100 && score <= 200) {
    funMessage = "You Are a Legend 🏆 Unleash the champion in you!";
  } else if (score >= 200) {
    funMessage = "Our Snake Mania Maestro 🥇 You're a true Snake Whisperer!";
  }
  acchive.innerHTML = funMessage;
  scoreDisplay.innerHTML = "Your score: " + score;
  levelDisplay.innerHTML = "Level: " + gameLevel;
  speedDisplay.innerHTML = "Snake speed: " + speed;
}

function showGameOverPopup() {
  document.getElementById("overlay").style.display = "block";
  const popup = document.getElementById("popup");
  popup.style.display = "block";
  popupDesign();
}

function gameEngine() {
  console.log("gameEngine start");
  // Part 1: Updating the snake array & Food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    gameOverSound.pause();
    inputDir = { x: 0, y: 0 };
    showGameOverPopup();
    return;
  }

  // If you have eaten the food, increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;

    if (score >= 1 && score <= 3) {
      gameLevel = 1;
      speed = 4;
      localStorage.setItem("level", JSON.stringify(gameLevel));
      level__box.innerHTML = "Level : " + gameLevel;
    } else if (score >= 4 && score <= 8) {
      gameLevel = 2;
      speed = 5;
      localStorage.setItem("level", JSON.stringify(gameLevel));
      level__box.innerHTML = "Level : " + gameLevel;
    }

    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
    }

    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part 2: Display the snake and Food
  // Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Function to reset scores and level
function resetScoresAndLevel() {
  console.log("resetScoresAndLevel");
  speed = 4;
  gameLevel = 1;
  hiscoreval = 0;
  score = 0;

  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
  localStorage.setItem("level", JSON.stringify(gameLevel));
  hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
  level__box.innerHTML = "Level : " + gameLevel;
  scoreBox.innerHTML = "Score: " + score;
}

// Main logic starts here
musicSound.play();

let hiscore = localStorage.getItem("hiscore");
let level = localStorage.getItem("level");
startGame();

function startGame() {
  console.log("startGame");
  popup.style.display = "none";
  document.getElementById("overlay").style.display = "none";
  snakeArr = [{ x: 13, y: 15 }];
  musicSound.play();
  score = 0;
  scoreBox.innerHTML = "Score: " + score;

  if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
  } else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
  }

  if (level === null) {
    gameLevel = 1;
    localStorage.setItem("level", JSON.stringify(gameLevel));
  } else {
    gameLevel = JSON.parse(level);
    level__box.innerHTML = "Level : " + gameLevel;
  }

  window.requestAnimationFrame(main);
  window.addEventListener("keydown", (e) => {
    inputDir = { x: 0, y: 1 }; // Start the game
    moveSound.play();
    switch (e.key) {
      case "ArrowUp":
        inputDir.x = 0;
        inputDir.y = -1;
        break;

      case "ArrowDown":
        inputDir.x = 0;
        inputDir.y = 1;
        break;

      case "ArrowLeft":
        inputDir.x = -1;
        inputDir.y = 0;
        break;

      case "ArrowRight":
        inputDir.x = 1;
        inputDir.y = 0;
        break;
      default:
        break;
    }
  });
}

// Add an event listener to the button
const resetButton = document.getElementById("button");
resetButton.addEventListener("click", resetScoresAndLevel);

const restartButton = document.getElementById("restartbutton");
restartButton.addEventListener("click", startGame);
