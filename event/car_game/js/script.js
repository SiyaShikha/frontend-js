// const createPlayer = (lane) => {
//   const player = document.createElement("div");
//   player.classList.add("playerCar");
//   let laneNum = 0;
//   lane[laneNum].append(player);

//   const movePlayer = (event) => {
//     if (event.key === "ArrowRight" && laneNum < lane.length - 1) {
//       laneNum++;
//       lane[laneNum].appendChild(player);
//       console.log("You pressed", event.key);
//     }

//     if (event.key === "ArrowLeft" && laneNum > 0) {
//       laneNum--;
//       lane[laneNum].appendChild(player);
//       console.log("You pressed", event.key);
//     }
//   };

//   document.addEventListener("keydown", movePlayer);
//   return player;
// };

// const randomBetween = (from, to) =>
//   from + Math.floor(Math.random() * (to - from));

// const moveObstacle = (obstacle, top) => {
//   if (top === 100) {
//     obstacle.remove();
//   }

//   obstacle.style.top = `${top}%`;
// };

// const createObstacle = (lane) => {
//   let top = 0;
//   const obstacle = document.createElement("div");
//   obstacle.classList.add("obstacleCar");
//   const laneNum = randomBetween(0, lane.length);
//   lane[laneNum].appendChild(obstacle);

//   setInterval(() => {
//     moveObstacle(obstacle, top);
//     top += 5;
//   }, 60);
// };

// const startGame = () => {
//   const lane = document.getElementsByClassName("lane");

//   alert("start game");
//   const player = createPlayer(lane);
//   setInterval(() => createObstacle(lane), 500);
// };

// startGame();

class Player {
  #lanes;
  #laneNum;
  #player;

  constructor(lanes) {
    this.#lanes = lanes;
    this.#laneNum = 0;
    this.#player = document.createElement("div");
    this.#player.classList.add("playerCar");

    this.#lanes[this.#laneNum].appendChild(this.#player);

    this.move = this.move.bind(this);
    document.addEventListener("keydown", this.move);
  }

  move(event) {
    if (event.key === "ArrowRight" && this.#laneNum < this.#lanes.length - 1) {
      this.#laneNum++;
      this.#lanes[this.#laneNum].appendChild(this.#player);
      console.log("You pressed", event.key);
    }

    if (event.key === "ArrowLeft" && this.#laneNum > 0) {
      this.#laneNum--;
      this.#lanes[this.#laneNum].appendChild(this.#player);
      console.log("You pressed", event.key);
    }
  }
}

class Obstacle {
  constructor(lanes) {
    this.lanes = lanes;
    this.top = 0;
    this.laneNum = Obstacle.randomBetween(0, lanes.length);
    this.obstacle = document.createElement("div");
    this.obstacle.classList.add("obstacleCar");
    this.lanes[this.laneNum].appendChild(this.obstacle);

    // this.interval = setInterval(this.move.bind(this), 60);
    this.interval = setInterval(() => {
      this.move();
      this.detectCollision();
    }, 50);
  }

  static randomBetween(from, to) {
    return from + Math.floor(Math.random() * (to - from));
  }

  move() {
    this.top += 5;
    if (this.top >= 100) {
      this.obstacle.remove();
      clearInterval(this.interval);
    } else {
      this.obstacle.style.top = `${this.top}%`;
    }
  }

  detectCollision() {
    const obstacleRect = this.obstacle.getBoundingClientRect();
    this.player = document.querySelector(".playerCar");

    const playerRect = this.player.getBoundingClientRect();
    if (
      obstacleRect.top < playerRect.bottom &&
      obstacleRect.bottom > playerRect.top &&
      obstacleRect.left < playerRect.right &&
      obstacleRect.right > playerRect.left
    ) {
      console.log("Collision detected!");
      this.obstacle.remove();
      this.handleCollision();
    }
  }

  handleCollision() {
    clearInterval(this.interval);
    alert("Game Over!");
  }
}

class CarGame {
  constructor() {
    this.lanes = document.getElementsByClassName("lane");
    // console.log(this.lanes);
  }

  start() {
    alert("start game");
    this.player = new Player(this.lanes);
    setInterval(() => new Obstacle(this.lanes), 500);
  }
}

const main = () => {
  const game = new CarGame();
  game.start();
};

main();
