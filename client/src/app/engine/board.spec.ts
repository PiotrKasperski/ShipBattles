import {Board} from './board';
import {Ship} from "./ship";
import {FieldState} from "./field-state";
import {Directions} from "./directions";

describe('Board', () => {
  let mockBoard: Board;
  beforeEach(() => {
    mockBoard = new Board(10, 10);
  })
  it('should create an instance', () => {
    expect(mockBoard).toBeTruthy();
    expect(mockBoard.fields.length).toEqual(10);
    expect(mockBoard.fields[0].length).toEqual(10);
  });
  it('should set ship properly', function () {
    let ship: Ship = new Ship({size: 4, position: {x: 5, y: 2}, directions: Directions.HORIZONTAl});
    mockBoard.deployShip(ship);
    for (const shipPosition of ship.positions) {
      expect(mockBoard.fields[shipPosition.x][shipPosition.y].state).toEqual(FieldState.SHIP);
    }
  });
  it('should return array of fields', function () {

    expect(mockBoard.getFields([{x: 0, y: 0}]).length).toEqual(1);
  });
  it('should find fild', function () {
    expect(mockBoard.findField({x: 0, y: 0}).position).toEqual({x: 0, y: 0})
  });
  it('should clear boar', function () {
    mockBoard.fields[0][0].state = FieldState.SHIP;
    mockBoard.clear();
    for (const row of mockBoard.fields) {
      for (const field of row) {
        expect(field.state).toEqual(FieldState.EMPTY);
      }
    }
  });
});
