const canvasEl = document.querySelector("#canvas");
const ctx = canvasEl.getContext("2d");

// Constants
const CANVAS_WIDTH = canvasEl.getBoundingClientRect().width;
const CANVAS_HEIGHT = canvasEl.getBoundingClientRect().height;

function checkMapChangeCollision(
  player,
  mapChangeX,
  mapChangeY,
  mapChangeWidth,
  mapChangeHeight,
  map
) {
  return (
    player.x >= mapChangeX &&
    player.x + player.width <= mapChangeX + mapChangeWidth &&
    player.y >= mapChangeY &&
    player.y + player.height <= mapChangeY + mapChangeHeight
  );
}

const KEYS = {
  arrowUp: { isPressed: false },
  arrowDown: { isPressed: false },
  arrowLeft: { isPressed: false },
  arrowRight: { isPressed: false },
  k: { isPressed: false },
  l: { isPressed: false },

  w: { isPressed: false },
  s: { isPressed: false },
  a: { isPressed: false },
  d: { isPressed: false },
};

// MATTIAS WINTERMAP
const beachMap = new Map({
  backgroundImage: "./assets/images/sand-map.png",
  borders: {
    top: 150,
    left: 0,
    right: 0,
    bottom: 110,
  },
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  player1StartingPosition: { x: 90, y: 180 },
  player2StartingPosition: { x: 620, y: 180 },
  nextMap: null,
  nextMapCollisionBox: {
    x: 0,
    y: 8,
    width: 13,
    height: 2,
  },
});

const winterMap = new Map({
  backgroundImage: "./assets/images/snow-map.png",
  borders: {
    top: 125,
    left: 0,
    right: 230,
    bottom: 0,
  },
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  player1StartingPosition: { x: 100, y: 200 },
  player2StartingPosition: { x: 200, y: 400 },
  nextMap: null,
  nextMapCollisionBox: {
    x: 9,
    y: 2.25,
    width: 2,
    height: 2,
  },
});

const orientalMap = new Map({
  backgroundImage: "./assets/images/oriental-map.png",
  borders: {
    top: 0,
    left: 0,
    right: 480,
    bottom: 0,
  },
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  player1StartingPosition: { x: 100, y: 200 },
  player2StartingPosition: { x: 200, y: 300 },
  nextMap: null,
  nextMapCollisionBox: {
    x: 1,
    y: 0,
    width: 2,
    height: 2,
  },
});

// Set the next maps in a loop
orientalMap.nextMap = winterMap;
winterMap.nextMap = beachMap;
beachMap.nextMap = orientalMap;

let currentMap = orientalMap;

// create player 1
// let player1x = 50;
// let player1y = 100;
// ctx.fillStyle = "blue";
// ctx.fillRect(player1x, player1y, 25, 25);
const player1 = new Player(
  currentMap.player1StartingPosition.x,
  currentMap.player1StartingPosition.y,
  "transparent",
  "./assets/images/punk_guy_green.png"
); // Objekt skapas med x,y,width,height som kan ritas ut, som kan flytta sin position

// player 2
// let player2x = 150;
// let player2y = 100;
// ctx.fillStyle = "red";
// ctx.fillRect(player2x, player2y, 25, 25);
const player2 = new Player(
  currentMap.player2StartingPosition.x,
  currentMap.player2StartingPosition.y,
  "transparent",
  "./assets/images/punk_guy_red.png"
); // Objekt skapas med x,y,width,height som kan ritas ut, som kan flytta sin position

function handleInput(keys, map) {
  // DONE: make a barriers such that the players cannot move
  // out of the canvas bounds

  // MATTIAS BORDERS
  const borders = map.borders;
  

  // MATTIAS 2. ADD different frameY values
  // player 1
  if (keys.arrowUp.isPressed && player1.y > borders.top) {
    player1.move(0, -10, 3);
  }
  if (
    keys.arrowDown.isPressed &&
    player1.y + player1.height < CANVAS_HEIGHT - borders.bottom
  ) {
    player1.move(0, 10, 0);
  }
  if (keys.arrowLeft.isPressed && player1.x > borders.left) {
    player1.move(-10, 0, 1);
  }
  if (
    keys.arrowRight.isPressed &&
    player1.x + player1.width < CANVAS_WIDTH - borders.right
  ) {
    player1.move(10, 0, 2);
  }
  if (keys.k.isPressed && player1.y > borders.top) {
    player1.move(0, 0, 4);
  }
  if (keys.l.isPressed && player1.y > borders.top) {
    player1.move(0, 0, 10);
    player1.maxFrames = 11;
  }
  // player 2
  if (keys.w.isPressed && player2.y > borders.top) {
    player2.move(0, -10, 3);
  }
  if (
    keys.s.isPressed &&
    player2.y + player2.height < CANVAS_HEIGHT - borders.bottom
  ) {
    player2.move(0, 10, 0);
  }
  if (keys.a.isPressed && player2.x > borders.left) {
    player2.move(-10, 0, 1);
  }
  if (
    keys.d.isPressed &&
    player2.x + player2.width < CANVAS_WIDTH - borders.right
  ) {
    player2.move(10, 0, 2);
  }
}

// MATTIAS: Last Timestamp
let lastTime = 0;

function gameLoop(timeStamp) {
  // MATTTIAS: deltaTime
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  // Clear Canvas
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // MATTIAS ADDED WINTER MAP
  handleInput(KEYS, currentMap);
  // handleInput(KEYS, beachMap);

  //Map change
let mapChangeX = currentMap.nextMapCollisionBox.x * 64;
let mapChangeY = currentMap.nextMapCollisionBox.y * 64;
let mapChangeWidth = currentMap.nextMapCollisionBox.width * 64;
let mapChangeHeight = currentMap.nextMapCollisionBox.height * 64;

  if (
    checkMapChangeCollision(
      player1,
      mapChangeX,
      mapChangeY,
      mapChangeWidth,
      mapChangeHeight,
      currentMap
    )
) {
  currentMap = currentMap.nextMap; // Change the map accordingly
  player1.x = currentMap.player1StartingPosition.x;
  player1.y = currentMap.player1StartingPosition.y;
  // You may want to reset the position of player2 as well
  player2.x = currentMap.player2StartingPosition.x;
  player2.y = currentMap.player2StartingPosition.y;
}

if (
  checkMapChangeCollision(
  player2,
  mapChangeX,
  mapChangeY,
  mapChangeWidth,
  mapChangeHeight,
  currentMap
)
) {
currentMap = currentMap.nextMap; // Change the map accordingly
player1.x = currentMap.player1StartingPosition.x;
player1.y = currentMap.player1StartingPosition.y;
// You may want to reset the position of player2 as well
player2.x = currentMap.player2StartingPosition.x;
player2.y = currentMap.player2StartingPosition.y;
}

  console.log("Player position:", player1.x, player1.y);
  console.log("Map change coordinates:", mapChangeX, mapChangeY);

  // MATTIAS DRAW BG
  currentMap.draw(ctx);

  // MAP CHANGE AREA
  ctx.fillStyle = "rgba(0,255,0,0.5)";
  ctx.fillRect(mapChangeX, mapChangeY, mapChangeWidth, mapChangeHeight);

  // Draw Player 1
  // MATTIAS: Added delta time
  player1.draw(ctx, deltaTime);

  // Draw Player 2
  player2.draw(ctx, deltaTime);

  // Do gameLoop again
  requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (event) => {
  console.log("KeyDown event trigged. key", event.key, "has been pressed");

  // Player 1
  if (event.key === "ArrowUp") {
    // player1y += -1;
    // player1.move(0, -1);
    KEYS.arrowUp.isPressed = true;
  } else if (event.key === "ArrowDown") {
    // player1.move(0, 1);
    KEYS.arrowDown.isPressed = true;
  } else if (event.key === "ArrowLeft") {
    // player1.move(-1, 0);
    KEYS.arrowLeft.isPressed = true;
  } else if (event.key === "ArrowRight") {
    // player1.move(1, 0);
    KEYS.arrowRight.isPressed = true;
  } else if (event.key === "k") {
    // player1.move(1, 0);
    KEYS.k.isPressed = true;
  } else if (event.key === "l") {
    // player1.move(1, 0);
    KEYS.l.isPressed = true;
  }

  // Player 2
  if (event.key === "w") {
    // player2y += -1;
    // player2.move(0, -1);
    KEYS.w.isPressed = true;
  } else if (event.key === "s") {
    // player2.move(0, 1);
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
    // player1y += -1;
    // player1.move(0, -1);
    KEYS.arrowUp.isPressed = false;
    player1.move(0, 0, 3, false);
  } else if (event.key === "ArrowDown") {
    // player1.move(0, 1);
    KEYS.arrowDown.isPressed = false;
    player1.move(0, 0, 0, false);
  } else if (event.key === "ArrowLeft") {
    // player1.move(-1, 0);
    KEYS.arrowLeft.isPressed = false;
    player1.move(0, 0, 1, false);
  } else if (event.key === "ArrowRight") {
    // player1.move(1, 0);
    KEYS.arrowRight.isPressed = false;
    player1.move(0, 0, 2, false);
  } else if (event.key === "k") {
    // player1.move(1, 0);
    KEYS.k.isPressed = false;
    player1.move(0, 0, 0, false);
    player1.frameY = 0;
  } else if (event.key === "l") {
    // player1.move(1, 0);
    KEYS.l.isPressed = false;
    player1.move(0, 0, 0, false);
    player1.maxFrames = 3;
  }

  // Player 2
  if (event.key === "w") {
    // player2y += -1;
    // player2.move(0, -1);
    KEYS.w.isPressed = false;
    player2.move(0, 0, 3, false);
  } else if (event.key === "s") {
    // player2.move(0, 1);
    KEYS.s.isPressed = false;
    player2.move(0, 0, 0, false);
  } else if (event.key === "a") {
    // player2.move(-1, 0);
    KEYS.a.isPressed = false;
    player2.move(0, 0, 1, false);
  } else if (event.key === "d") {
    // player2.move(1, 0);
    KEYS.d.isPressed = false;
    player2.move(0, 0, 2, false);
  }
});

gameLoop(0);
