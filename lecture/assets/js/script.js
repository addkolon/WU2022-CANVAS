const canvasEl = document.querySelector("#canvas");
const ctx = canvasEl.getContext("2d");
// Constants
const CANVAS_WIDTH = canvasEl.getBoundingClientRect().width;
const CANVAS_HEIGHT = canvasEl.getBoundingClientRect().height;

// BG MAP
// mapBg = new Image();
// mapBg.src = "./assets/images/sand-map.png";
// mapWidth = CANVAS_WIDTH;
// mapHeight = CANVAS_HEIGHT;

const KEYS = {
  // Player 1
  arrowUp: { isPressed: false },
  arrowDown: { isPressed: false },
  arrowLeft: { isPressed: false },
  arrowRight: { isPressed: false },
  k: { isPressed: false },
  l: { isPressed: false },

  // Player 2
  w: { isPressed: false },
  s: { isPressed: false },
  a: { isPressed: false },
  d: { isPressed: false },
};

// CREATE MAPS
const sandMap = new Map({
  imageSrc: "./assets/images/sand-map.png", 
  borders: {
    top: 150,
    left: 0,
    right: 0,
    bottom: 120,
  },
  width: CANVAS_WIDTH, 
  height: CANVAS_HEIGHT, 
  player1StartingCordinates: {
    x: 140,
    y: 180,
  },
  player2StartingCordinates: {
    x: 620,
    y: 180,
  },
});

const winterMap = new Map({
  imageSrc: "./assets/images/snow-map.png", 
  borders: {
    top: 125, 
    left: 0, 
    right: 230, 
    bottom: 0
  },
  width: CANVAS_WIDTH, 
  height: CANVAS_HEIGHT, 
  player1StartingCordinates: {
    x: 90,
    y: 180,
  },
  player2StartingCordinates: {
    x: 300,
    y: 400,
  },
});

const orientalMap = new Map({
  imageSrc: "./assets/images/oriental-map.png", 
  borders: {
    top: 0, 
    left: 0, 
    right: 490, 
    bottom: 0
  },
  width: CANVAS_WIDTH, 
  height: CANVAS_HEIGHT, 
  player1StartingCordinates: {
    x: 90,
    y: 180,
  },
  player2StartingCordinates: {
    x: 90,
    y: 180,
  },
});


let currentMap = sandMap;

// create player 1
const player1 = new Player(currentMap.player1StartingCordinates.x, currentMap.player1StartingCordinates.y, "transparent", "./assets/images/punk_guy_green.png"); // Objekt skapas med x,y,width,height som kan ritas ut, som kan flytta sin position

// create player 2
const player2 = new Player(currentMap.player2StartingCordinates.x, currentMap.player2StartingCordinates.y, "transparent", "./assets/images/punk_guy_red.png"); // Objekt skapas med x,y,width,height som kan ritas ut, som kan flytta sin position
function handleInput(keys, map) {
  // DONE: make a barriers such that the players cannot move
  // out of the canvas bounds
  // DONE 1: Stop the player 1 from moving top above the canvas
  // DONE 2: Stop the player 1 from moving down below the canvas
  // DONE 3: Stop the player 1 from moving left outside the canvas
  // DONE 4: Stop the player 1 from moving right outside the canvas
  // DONE 5: Stop the player 2 as well from all directions

  const borders = map.borders; 
  // player 1

  // ArrowUp
  if (keys.arrowUp.isPressed && player1.y > borders.top) {
    player1.move(0, -5, 3);
  }
  // ArrowDown
  if (keys.arrowDown.isPressed && player1.y + player1.height < CANVAS_HEIGHT - borders.bottom) {
    player1.move(0, 5, 0);
  }
  // ArrowLeft
  if (keys.arrowLeft.isPressed && player1.x > borders.left) {
    player1.move(-5, 0, 1);
  }
  // ArrowRight
  if (keys.arrowRight.isPressed && player1.x + player1.width < CANVAS_WIDTH - borders.right) {
    player1.move(5, 0, 2);
  }
  // K
  if (keys.k.isPressed) {
    player1.move(0, 0, 4);
  }
  // L
  if (keys.l.isPressed) {
    player1.move(0, 0, 5, true, 11);
  }

  // player 2
  if (keys.w.isPressed && player2.y > borders.top) {
    player2.move(0, -5, 3);
  }
  if (keys.s.isPressed && player2.y + player2.height < CANVAS_HEIGHT - borders.bottom) {
    player2.move(0, 5, 0);
  }
  if (keys.a.isPressed && player2.x > borders.left) {
    player2.move(-5, 0, 1);
  }
  if (keys.d.isPressed && player2.x + player2.width < CANVAS_WIDTH - borders.right) {
    player2.move(5, 0, 2);
  }
}

let lastTime = 0

function gameLoop(timeStamp) {

  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  // console.log(lastTime)
  // Clear Canvas
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

//   DRAW BACKGROUND
  currentMap.draw(ctx);

  // Do movements based on which key is pressed
  handleInput(KEYS, currentMap);
  // Draw Player 1
  // ctx.fillStyle = "blue";
  // ctx.fillRect(player1x, player1y, 25, 25);
  player1.draw(ctx, deltaTime);
  // Draw Player 2
  // ctx.fillStyle = "red";
  // ctx.fillRect(player2x, player2y, 25, 25);
  player2.draw(ctx, deltaTime);
  // Do gameLoop again
  requestAnimationFrame(gameLoop);
}
window.addEventListener("keydown", (event) => {
  console.log("KeyDown event trigged. key", event.key, "has been pressed");
  // Player 1
  if (event.key === "ArrowUp") {
    KEYS.arrowUp.isPressed = true;
  } else if (event.key === "ArrowDown") {
    KEYS.arrowDown.isPressed = true;
  } else if (event.key === "ArrowLeft") {
    KEYS.arrowLeft.isPressed = true;
  } else if (event.key === "ArrowRight") {
    KEYS.arrowRight.isPressed = true;
  } else if (event.key === "k") {
    KEYS.k.isPressed = true;
  } else if (event.key === "l") {
  KEYS.l.isPressed = true;
  }
  // Player 2
  if (event.key === "w") {
    KEYS.w.isPressed = true;
  } else if (event.key === "s") {
    KEYS.s.isPressed = true;
  } else if (event.key === "a") {
    // player2.move(-1, 0);
    KEYS.a.isPressed = true;
  } else if (event.key === "d") {
    // player2.move(1, 0);
    KEYS.d.isPressed = true;
  }
});
window.addEventListener("keyup", (event) => {
  console.log("KeyUp event trigged. key", event.key, "has been released");
  // Player 1
  if (event.key === "ArrowUp") {
    player1.move(0, 0, 3, false);
    KEYS.arrowUp.isPressed = false;
  } else if (event.key === "ArrowDown") {
    player1.move(0, 0, 0, false);
    KEYS.arrowDown.isPressed = false;
  } else if (event.key === "ArrowLeft") {
    player1.move(0, 0, 1, false);
    KEYS.arrowLeft.isPressed = false;
  } else if (event.key === "ArrowRight") {
    player1.move(0, 0, 2, false);
    KEYS.arrowRight.isPressed = false;
  } else if (event.key === "k") {
    player1.move(0, 0, 0, false);
    KEYS.k.isPressed = false;
  } else if (event.key === "l") {
    player1.move(0, 0, 0, false, 3);
    KEYS.l.isPressed = false;
  }
  // Player 2
  if (event.key === "w") {
    player2.move(0, 0, 3, false);
    KEYS.w.isPressed = false;
  } else if (event.key === "s") {
    player2.move(0, 0, 0, false);
    KEYS.s.isPressed = false;
  } else if (event.key === "a") {
    player2.move(0, 0, 1, false);
    KEYS.a.isPressed = false;
  } else if (event.key === "d") {
    player2.move(0, 0, 2, false);
    KEYS.d.isPressed = false;
  }
});
gameLoop(0);
