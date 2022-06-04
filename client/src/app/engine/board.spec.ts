import {Board} from './board';
import {Ship} from "./ship";
import {FieldState} from "./field-state";
import {Directions} from "./directions";

describe('Board', () => {

  it('should create an instance', () => {
    let mockBoard = new Board(10, 10);
    expect(mockBoard).toBeTruthy();
    expect(mockBoard.fields.length).toEqual(10);
    expect(mockBoard.fields[0].length).toEqual(10);
  });
  it('should set ship properly', function () {
    let mockBoard = new Board(10, 10);
    let ship: Ship = new Ship(4);
    ship.setShipPosition({x: 5, y: 2}, Directions.HORIZONTAl);
    mockBoard.deployShip(ship);
    for (const shipPosition of ship.positions) {
      expect(mockBoard.fields[shipPosition.x][shipPosition.y].state).toEqual(FieldState.SHIP);
    }
  });
  it('should return array of fields', function () {
    let mockBoard = new Board(10, 10);

    expect(mockBoard.getFields([{x: 0, y: 0}]).length).toEqual(1);
  });
  it('should find fild', function () {
    let mockBoard = new Board(10, 10);
    expect(mockBoard.findField({x: 0, y: 0}).position).toEqual({x: 0, y: 0})
  });
});
