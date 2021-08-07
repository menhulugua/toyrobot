const { DIMENSION_X, DIMENSION_Y, EMPTY_GRID, ROBOT_GRID, LEFT, RIGHT, NORTH, SOUTH, WEST, EAST, REPORT, MOVE, PLACE, ERROR_INVALID, ERROR_INVALID_PLACE, WARNING_FALL, WARNING_NOT_PLACED } = require('./constants');

// whether to show warning messages, false by default
const showWarning = process.argv[0] && process.argv[2] === 'log'? true: false;

// robot is placed or not
let robotPlaced = false;

// facing direction
let facingDirection;

// input location
let inputX = -1;
let inputY = -1;

// current location
let currentX = -1;
let currentY = -1;

let commandType;

// initiate table, fill with 0, robot location will be changed to 1
let table = [...Array(DIMENSION_Y)].map(a => Array(DIMENSION_X).fill(EMPTY_GRID));


const UpdateTable = (x, y) => {
  // clear table
  table = [...Array(DIMENSION_Y)].map(a => Array(DIMENSION_X).fill(EMPTY_GRID));
  // because 0, 0 is south-west corner
  table[DIMENSION_Y - y - 1][x] = ROBOT_GRID;
  currentX = x;
  currentY = y;
}

// check if on table
const checkOnTable = (x, y) => {
  if (x > DIMENSION_X - 1 || y > DIMENSION_Y - 1 || x < 0 || y < 0)
    return false;
  else
    return true;
}

// check if input is valid
const checkInput = (input) => {
  input = input.toLowerCase();
  if (input.includes(PLACE)) {
    let checkPlaceResult = checkPlace(input);
    if (!checkPlaceResult)
      return [false, ERROR_INVALID_PLACE];
    else {
      inputX = parseInt(checkPlaceResult[0]);
      inputY = parseInt(checkPlaceResult[1]);
      facingDirection = checkPlaceResult[2];
      commandType = PLACE;
      return [true];
    }
  }
  else if (![MOVE, LEFT, RIGHT, REPORT].includes(input))
    return [false, ERROR_INVALID];
  else {
    commandType = input;
    return [true];
  }
}

const checkPlace = (input) => {
  let inputArray = input.toLowerCase().split(' ');
  if (inputArray.length != 2)
    return false;
  if (inputArray[0] !== PLACE)
    return false;

  let data = inputArray[1].split(',');
  if (data.length !== 3)
    return false;

  if (!checkIsInteger(data[0]))
    return false;

  if (!checkIsInteger(data[1]))
    return false;

  if (![NORTH, SOUTH, WEST, EAST].includes(data[2]))
    return false;

  return [data[0], data[1], data[2]];
}

const checkIsInteger = (input) => {
  if (isNaN(input))
    return false;
  if  (input.includes('.'))
    return false;
  if (!input.length)
    return false;
  return true;
}

// get the location after move, doesn't mean the robot will move
const moveToGrid = () => {
  let x = currentX;
  let y = currentY;
  switch (facingDirection) {
    case NORTH:
      return [x, y + 1];
    case SOUTH:
      return [x, y - 1];
    case EAST:
      return [x + 1, y];
    case WEST:
      return [x - 1, y];
    default:
      return [x, y];
  }
}

const turn = (direction) => {
  switch (facingDirection) {
    case NORTH:
      if (direction === LEFT)
        facingDirection = WEST;
      else
        facingDirection = EAST;
      break;
    case SOUTH:
      if (direction === LEFT)
        facingDirection = EAST;
      else
        facingDirection = WEST;
      break;
    case EAST:
      if (direction === LEFT)
        facingDirection = NORTH;
      else
        facingDirection = SOUTH;
      break;
    case WEST:
      if (direction === LEFT)
        facingDirection = SOUTH;
      else
        facingDirection = NORTH;
      break;
    default:
      break;
  }
}

const report = () => {
  console.log(`Output: ${currentX}, ${currentY}, ${facingDirection.toUpperCase()}`);
}



////////////////////////////////////////////////////////////

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const takeUserInput = function() {
  rl.question("Input next command:", function(command) {
    const [checkResult, error] = checkInput(command);
    if (!checkResult)
      console.log(error);
    else {
      if (!robotPlaced && !command.includes(PLACE)) {
        if (showWarning)
          console.log(WARNING_NOT_PLACED);
      } else {
        robotPlaced = true;
        switch(commandType) {
          case PLACE:
            if (checkOnTable(inputX, inputY))
              UpdateTable(inputX, inputY);
            else {
              if (showWarning)
                console.log(WARNING_FALL)
            }
            break;
          case MOVE:
            const [x, y] = moveToGrid();
            if (checkOnTable(x, y)) {
              UpdateTable(x, y);
            } else {
              if (showWarning)
                console.log(WARNING_FALL);
            }
            break;
          case LEFT:
          case RIGHT:
            turn(commandType);
            break;
          case REPORT:
            report();
            break;
          default:
            break;
        }
      }
    }
    takeUserInput();
  });
}

takeUserInput();