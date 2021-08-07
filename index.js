const { DIMENSION_X, DIMENSION_Y, EMPTY_GRID, ROBOT_GRID, LEFT, RIGHT, NORTH, SOUTH, WEST, EAST, REPORT, MOVE, PLACE, ERROR_INVALID, ERROR_INVALID_PLACE, WARNING_FALL, WARNING_NOT_PLACED } = require('./constants');

const { UpdateTable, checkOnTable, moveToGrid, checkInput, turn } = require('./functions');

// whether to show warning messages, false by default
const showWarning = process.argv[0] && process.argv[2] === 'log'? true: false;

// robot is placed or not
let robotPlaced = false;

// facing direction
let facingDirection;
let inputFacingDirection;

// input location
let inputX = -1;
let inputY = -1;

// current location
let currentX = -1;
let currentY = -1;

let commandType;

// initiate table, fill with 0, robot location will be changed to 1
let table = [...Array(DIMENSION_Y)].map(a => Array(DIMENSION_X).fill(EMPTY_GRID));

////////////////////////////////////////////////////////////

const readline = require("readline");
const { exit } = require('process');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', function(chunk, key){
  if (key.name === 'escape')
    exit();
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const takeUserInput = function() {
  rl.question("Input next command:", function(cmd) {
    let command = cmd.trim().toLowerCase();
    const [checkResult, payload] = checkInput(command);
    if (!checkResult) // invalid input, show errors
      console.log(payload);
    else {
      if (!robotPlaced && !command.includes(PLACE)) {
        // robot is not placed, ignore the command
        if (showWarning)
          console.log(WARNING_NOT_PLACED);
      } else {
        commandType = payload.commandType;
        switch(commandType) {
          case PLACE:
            inputX = payload.inputX;
            inputY = payload.inputY;
            inputFacingDirection = payload.inputFacingDirection;
            if (checkOnTable(inputX, inputY)) {
              [table, currentX, currentY] = UpdateTable(inputX, inputY);
              facingDirection = inputFacingDirection;
              robotPlaced = true;
            }
            else {
              if (showWarning)
                console.log(WARNING_FALL)
            }
            break;
          case MOVE:
            const [x, y] = moveToGrid(currentX, currentY, facingDirection);
            if (checkOnTable(x, y)) {
              [table, currentX, currentY] = UpdateTable(x, y);
            } else {
              if (showWarning)
                console.log(WARNING_FALL);
            }
            break;
          case LEFT:
          case RIGHT:
            facingDirection = turn(commandType, facingDirection);
            break;
          case REPORT:
            console.log(`Output: ${currentX},${currentY},${facingDirection.toUpperCase()}`);
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
