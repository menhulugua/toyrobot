module.exports = {
  // size of table
  DIMENSION_X: 5,
  DIMENSION_Y: 5,
  // table grid state
  EMPTY_GRID: 0,
  ROBOT_GRID: 1,
  //commands
  LEFT: 'left',
  RIGHT: 'right',
  NORTH: 'north',
  SOUTH: 'south',
  WEST: 'west',
  EAST: 'east',
  MOVE: 'move',
  REPORT: 'report',
  PLACE: 'place',
  // error types
  ERROR_INVALID: `Invalid command, valid commands are: 
                  PLACE X,Y,F
                  MOVE
                  LEFT
                  RIGHT
                  REPORT
                  commands are case insensative`,
  ERROR_INVALID_PLACE: `Invalid place command, should be:
                        PLACE X,Y,F
                        X,Y are integers >= 0 and < table dimension
                        F is one of NORTH, SOUTH, EAST, WEST`,       
  // warning types
  WARNING_FALL: "This command will cause robot to fall, robot won't execute this command",
  WARNING_NOT_PLACED: "Robot has not been placed, this command will be ignored."
};