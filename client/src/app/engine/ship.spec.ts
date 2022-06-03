import {Ship} from './ship';
import {Directions} from "./directions";

describe('Ship', () => {
  it('should create an instance', () => {
    expect(new Ship(4)).toBeTruthy();
  });
  it('should set proper horizontal ships locations', function () {
    let mock = new Ship(2);
    mock.setShipPosition({x:0,y:0}, Directions.HORIZONTAl);
    expect(mock.positions.length).toEqual(2);
    expect(mock.positions[0].x).toEqual(0);
    expect(mock.positions[1].x).toEqual(1);
    expect(mock.positions[0].y).toEqual(0);
    expect(mock.positions[1].y).toEqual(0);
  });
  it('should set proper vertical ships locations', function () {
    let mock = new Ship(2);
    mock.setShipPosition({x:0,y:0}, Directions.VERTICAL);
    expect(mock.positions.length).toEqual(2);
    expect(mock.positions[0].y).toEqual(0);
    expect(mock.positions[1].y).toEqual(1);
    expect(mock.positions[0].x).toEqual(0);
    expect(mock.positions[1].x).toEqual(0);
  });
});
