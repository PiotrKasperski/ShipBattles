import {TestBed} from '@angular/core/testing';

import {GameService} from './game.service';
import {FieldState} from "./field-state";
import {Player} from "./player";
import {Directions} from "./directions";

describe('GameService', () => {
  let service: GameService;
  let waitingPlayer: Player;
  let currentPlayer: Player;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
    service._waitingPlayer = new Player('p1', {width: 5, high: 5}, [{
      size: 2,
      position: {x: 2, y: 2},
      directions: Directions.VERTICAL
    }]);
    service.currentPlayer = new Player('p2', {width: 5, high: 5}, [{
      size: 2,
      position: {x: 2, y: 2},
      directions: Directions.VERTICAL
    }]);
    waitingPlayer = service._waitingPlayer;
    currentPlayer = service.currentPlayer;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should create 2 players', function () {
    expect(currentPlayer).toBeTruthy();
    expect(waitingPlayer).toBeTruthy();
  });
  it('should deploy ship properly', () => {
    expect(waitingPlayer.board.fields[2][2].state).toEqual(FieldState.SHIP);
  })
  it('should hit waiting player field', function () {
    let hitPosition = {x: 2, y: 4};
    service.hit(hitPosition);
    expect(service._waitingPlayer.board.fields[hitPosition.y][hitPosition.x].state).toEqual(FieldState.HITED);
  });
  it('should change field state to hitted ship', function () {
    let hitPosition = {x: 2, y: 2};
    console.log(waitingPlayer.board.fields[hitPosition.y][hitPosition.x].state, 'STATE OF SHIP')
    service.hit(hitPosition);
    expect(waitingPlayer.board.fields[hitPosition.y][hitPosition.x].state).toEqual(FieldState.HITEDSHIP);
  });
  it("'shouldn't hit twice a turn'", function () {
    let hitPosition1 = {x: 0, y: 0};
    let hitPosition2 = {x: 0, y: 1};
    waitingPlayer.board.fields[hitPosition1.y][hitPosition1.x].state = FieldState.EMPTY;
    waitingPlayer.board.fields[hitPosition2.y][hitPosition2.x].state = FieldState.EMPTY;
    service.hit(hitPosition1);
    service.hit(hitPosition2);
    expect(waitingPlayer.board.fields[hitPosition2.y][hitPosition2.x].state).toEqual(FieldState.EMPTY);
  });
  it("shouldn't hit twice same field", function () {
    let hitPosition = {x: 2, y: 4};
    waitingPlayer.board.fields[hitPosition.y][hitPosition.x].state = FieldState.HITED;
    service.hit(hitPosition);
    expect(currentPlayer.canMove).toBeTruthy();
  });
  it('should change player', function () {
    const p1 = waitingPlayer.name;
    const p2 = currentPlayer.name;
    service.nextPlayer();
    expect(service.currentPlayer.name).toEqual(p1);
    expect(service._waitingPlayer.name).toEqual(p2);
  });
  it('should sink the ship', function () {
    let hitPosition1 = {x: 2, y: 2}
    let hitPosition2 = {x: 3, y: 2}
    service.onShipHit(hitPosition1);
    service.onShipHit(hitPosition2);
    for (const ship of waitingPlayer.ships) {
      console.log(ship, waitingPlayer.ships, service.isShipSink(ship))
      expect(service.isShipSink(ship)).toBeTruthy();
      for (const position of ship.positions) {
        for (let i = position.x - 1; i <= position.x + 1; i++) {
          for (let j = position.y - 1; j <= position.y + 1; j++) {
            expect(waitingPlayer.board.findField({x: i, y: j}).state).toBeGreaterThanOrEqual(FieldState.HITED);
          }

        }

      }
    }
  });

});
