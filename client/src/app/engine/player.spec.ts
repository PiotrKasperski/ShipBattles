import {Player} from './player';
import {Directions} from "./directions";


describe('Player', () => {
  beforeEach(() => {
    let player = new Player('p1', {width: 5, high: 5}, [{
      size: 2,
      position: {x: 2, y: 2},
      directions: Directions.VERTICAL
    }]);
    //spyOn(player, 'hitShip').and.callThrough();
  })
  it('should create an instance', () => {
    expect(new Player('')).toBeTruthy();
  });
  it('should create player with test name', function () {
    let testName = 'test'
    expect(new Player(testName).name).toBe(testName);
  });
});
