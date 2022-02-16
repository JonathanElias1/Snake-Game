const grid = document.querySelector(`.grid`);
const startBtn = document.getElementById(`start`);
const scoreDisplay = document.getElementById(`score`);
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;
//squares[currentSnake[0]] represents the head

function createGrid() {
  //create 100 of these elements with a for loop
  for (let i = 0; i < 100; i++) {
    //create element
    const square = document.createElement(`div`);

    //add styling to these elements
    square.classList.add("square");
    //put the elemtne into our grid
    grid.appendChild(square);
    //push it into a new squares array
    squares.push(square);
  }
}
createGrid();

currentSnake.forEach((index) => squares[index].classList.add(`snake`));

function startGame() {
  //remove the snake
  currentSnake.forEach((index) => squares[index].classList.remove(`snake`));
  //remove the apple
  squares[appleIndex].classList.remove(`apple`);
  clearInterval(timerId);
  currentSnake = [2, 1, 0];
  score = 0;
  //re-add new score to browser
  scoreDisplay.textContent = score;
  direction = 1;
  intervalTime = 1000;
  generateApples();
  //re-add the class of snake to our new current snake
  currentSnake.forEach((index) => squares[index].classList.add(`snake`));
  timerId = setInterval(move, intervalTime);
}

function move() {
  if (
    //if snake has hit bottom
    (currentSnake[0] + width >= 100 && direction === width) ||
    //if snake has hit right wall
    (currentSnake[0] % width === 9) & (direction === 1) ||
    //if snake has hit left wall
    (currentSnake[0] % width === 0) & (direction === -1) ||
    //if snake has hit top wall
    (currentSnake[0] - width < 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains(`snake`)
  )
    return clearInterval(timerId);

  //remove last element from our currentSnake array
  const tail = currentSnake.pop();

  //remove styling from last element
  squares[tail].classList.remove(`snake`);

  //add square in direction we are heading
  currentSnake.unshift(currentSnake[0] + direction);

  //add styling so we can see it
  squares[currentSnake[0]].classList.add(`snake`);

  //deal with snake head getting the apple
  if (squares[currentSnake[0]].classList.contains(`apple`)) {
    //remove the class of apple
    squares[currentSnake[0]].classList.remove(`apple`);

    //grow our snake by adding class of snake to it
    squares[tail].classList.add(`snake`);

    //grow our snake array
    currentSnake.push(tail);
    //generate a new apple
    generateApples();

    //add one to the score
    score++;

    //display our score
    scoreDisplay.textContent = ` ${score}`;
    //speed up our snake
    clearInterval(timerId);
    intervalTime = intervalTime * speed;
    timerId = setInterval(move, intervalTime);
  }
}

function generateApples() {
  do {
    //generate a random number
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains(`snake`));
  squares[appleIndex].classList.add(`apple`);
}
generateApples();
//keycode for 39 is right arrow on keyboard
//38 is for up arrow
//37 is left arrow
//40 is for down arrow

function control(e) {
  if (e.keyCode === 39) {
    console.log(`right pressed`);
    direction = 1;
  } else if (e.keyCode === 38) {
    console.log(`up pressed`);
    direction = -width;
  } else if (e.keyCode === 37) {
    console.log(`left pressed`);
    direction = -1;
  } else if (e.keyCode === 40) {
    console.log(`down pressed`);
    direction = direction + width;
  }
}

document.addEventListener(`keydown`, control);
//keydown is prefered over keyup and keypressed because
//it starts as soon as user presses button whereas
//the others work upon release of the key

// switch (event.key) {
//   case "Down":
//   case "ArrowDown":
//     break;
//   case "Up":
//   case "ArrowUp":
//     break;
//   case "Left":
//   case "ArrowLeft":
//     break;
//   default:
//     return;
// }
startBtn.addEventListener(`click`, startGame);
