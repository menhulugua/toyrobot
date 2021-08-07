const { UpdateTable, checkOnTable, moveToGrid, checkInput, checkIsInteger, checkPlace, turn, takeUserInput } = require('./functions');
const { DIMENSION_X, DIMENSION_Y, EMPTY_GRID, ROBOT_GRID, LEFT, RIGHT, NORTH, SOUTH, WEST, EAST, REPORT, MOVE, PLACE, ERROR_INVALID, ERROR_INVALID_PLACE, WARNING_FALL, WARNING_NOT_PLACED } = require('./constants');

describe("test the application", () => {
  it ("should show Output: 0,1,NORTH", () => {
    expect(takeUserInput(`PLACE 0,0,NORTH
                          MOVE
                          REPORT`)).toBe(`Output: 0,1,NORTH`);
  });
  it ("should show Output: 3,3,NORTH", () => {
    expect(takeUserInput(`PLACE 1,2,EAST
                          MOVE
                          MOVE
                          LEFT
                          MOVE
                          REPORT`)).toBe(`Output: 3,3,NORTH`);
  });
});

describe("test update table function", () => {
  it ("update 3,4", () => {
    const [table, x, y] = UpdateTable(3, 4);
    expect(x).toBe(3);
    expect(y).toBe(4);
    expect(table[DIMENSION_Y - y - 1][x]).toBe(1);
  });
});

describe("test check on table function", () => {
  it("0,0 should be true", () => {
    expect(checkOnTable(0,0)).toBe(true);
  });
  it("2,5 should be false", () => {
    expect(checkOnTable(2, 5)).toBe(false);
  });
});

describe("test move to grid function", () => {
  it ("3,4, NORTH should become 3,5", () => {
    const [x, y] = moveToGrid(3, 4, NORTH);
    expect(x).toBe(3);
    expect(y).toBe(5);
  });
});

describe("test turn function", () => {
  it ("LEFT, NORTH should become WEST", () => {
    expect(turn(LEFT, NORTH)).toBe(WEST);
  });
});

describe("test check input function", () => {
  it ("westt should return false", () => {
    expect(checkInput('westt')[0]).toBe(false);
  });
  it ("place 0,0,north should return true", () => {
    expect(checkInput('place 0,0,north')[0]).toBe(true);
  });
});

describe("test check place function", () => {
  it ("place 0,,north should return false", () => {
    expect(checkPlace('place 0,,north')).toBe(false);
  });
});

describe("test check is integer function", () => {
  it ("3 should return true", () => {
    expect(checkIsInteger('3')).toBe(true);
  });
  it ("mathematical expression should return false", () => {
    expect(checkIsInteger('2e3')).toBe(false);
  });
  it ("2.3 should return false", () => {
    expect(checkIsInteger('2.3')).toBe(false);
  });
});

