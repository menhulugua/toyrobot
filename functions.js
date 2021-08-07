const { DIMENSION_X, DIMENSION_Y, EMPTY_GRID, ROBOT_GRID, LEFT, RIGHT, NORTH, SOUTH, WEST, EAST, REPORT, MOVE, PLACE, ERROR_INVALID, ERROR_INVALID_PLACE, WARNING_FALL, WARNING_NOT_PLACED } = require('./constants');


// update table
const UpdateTable = (x, y) => {
  let table = [...Array(DIMENSION_Y)].map(a => Array(DIMENSION_X).fill(EMPTY_GRID));
  // because 0, 0 is south-west corner
  table[DIMENSION_Y - y - 1][x] = ROBOT_GRID;
  return [table, x, y];
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
  if (input.includes(PLACE)) {
    let checkPlaceResult = checkPlace(input);
    if (!checkPlaceResult)
      return [false, ERROR_INVALID_PLACE];
    else {
      let inputX = parseInt(checkPlaceResult[0]);
      let inputY = parseInt(checkPlaceResult[1]);
      let inputFacingDirection = checkPlaceResult[2];
      let commandType = PLACE;
      return [true, {inputX, inputY, inputFacingDirection, commandType}];
    }
  }
  else if (![MOVE, LEFT, RIGHT, REPORT].includes(input))
    return [false, ERROR_INVALID];
  else {
    let commandType = input;
    return [true, {commandType}];
  }
}

const checkPlace = (input) => {
  let inputArray = input.split(' ');
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

  return [parseInt(data[0]), parseInt(data[1]), data[2]];
}

const checkIsInteger = (input) => {
  if (isNaN(input))
    return false;
  if  (input.includes('.'))
    return false;
  if  (input.includes('e') || input.includes('E'))
    return false;
  if (!input.length)
    return false;
  return true;
}

// get the location after move, doesn't mean the robot will move
const moveToGrid = (x, y, facingDirection) => {
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

const turn = (command, facingDirection) => {
  switch (facingDirection) {
    case NORTH:
      if (command === LEFT)
        return WEST;
      else
        return EAST;
    case SOUTH:
      if (command === LEFT)
        return EAST;
      else
        return WEST;
    case EAST:
      if (command === LEFT)
        return NORTH;
      else
        return SOUTH;
    case WEST:
      if (command === LEFT)
        return SOUTH;
      else
        return NORTH;
    default:
      return facingDirection;
  }
}

module.exports = {
  UpdateTable,
  checkOnTable,
  moveToGrid,
  checkInput,
  turn
}