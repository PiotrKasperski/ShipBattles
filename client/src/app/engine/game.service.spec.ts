import {TestBed} from '@angular/core/testing';

import {GameService} from './game.service';
import {FieldState} from "./field-state";
import {Player} from "./player";
import {Directions} from "./directions";
import {Router} from "@angular/router";
import {GameSettings} from "./game-settings";

describe('GameService', () => {
  let service: GameService;
  let waitingPlayer: Player;
  let currentPlayer: Player;
  const router = Router;
  let settings: GameSettings;

  beforeEach(() => {
    const routerMock = {};
    TestBed.configureTestingModule({providers: [{provide: Router, useValue: routerMock}]})
  })
  beforeEach(() => {
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
  it('should return true when player lost all ships', function () {
    expect(service.isGameOver()).toBeFalsy();
    let hitPosition1 = {x: 2, y: 2}
    let hitPosition2 = {x: 3, y: 2}
    service.onShipHit(hitPosition1);
    service.onShipHit(hitPosition2);
    expect(service.isGameOver()).toBeTruthy();
  });
  it('should end game', function () {
    let hitPosition1 = {x: 2, y: 2}
    let hitPosition2 = {x: 3, y: 2}
    service.onShipHit(hitPosition1);
    service.onShipHit(hitPosition2);
    service.onGameOver();
    expect(service.winner).toEqual(currentPlayer);

  });
  beforeEach(() => {
    settings = {
      "board": {
        "high": 7,
        "width": 7
      },
      "player1": {
        "name": "p1"
      },
      "player2": {
        "name": "p2"
      },
      "ships": [
        {
          "size": 2,
          "position": {
            "x": 5,
            "y": 0
          },
          "directions": 0
        }
      ]
    };
  })
  it('should init new players', function () {
    service.init(settings);
    expect(service.currentPlayer.name).toEqual(settings.player1.name);
    expect(service._waitingPlayer.name).toEqual(settings.player2.name);


  });
  it('should create boards', function () {
    service.init(settings);
    console.log(service.currentPlayer);
    expect(service.currentPlayer.board.fields.length).toEqual(settings.board.high);
    expect(service._waitingPlayer.board.fields.length).toEqual(settings.board.high);
    expect(service.currentPlayer.board.fields[0].length).toEqual(settings.board.width);
    expect(service._waitingPlayer.board.fields[0].length).toEqual(settings.board.width);
  });
  it('should create ships', function () {
    service.init(settings);
    expect(service.currentPlayer.ships.length).toEqual(settings.ships.length);
    expect(service._waitingPlayer.ships.length).toEqual(settings.ships.length);
  });
  it('should create ship on proper position', function () {
    service.init(settings);
    expect(service.currentPlayer.ships[0].positions[0].x).toEqual(settings.ships[0].position.x);
    expect(service._waitingPlayer.ships[0].positions[0].x).toEqual(settings.ships[0].position.x);
    expect(service.currentPlayer.ships[0].positions[0].y).toEqual(settings.ships[0].position.y);
    expect(service._waitingPlayer.ships[0].positions[0].y).toEqual(settings.ships[0].position.y);
  });
  it('should create ships in proper orientatin', function () {
    service.init(settings);
    expect(service.currentPlayer.ships[0].positions[1].x).toEqual(settings.ships[0].position.x);
    expect(service._waitingPlayer.ships[0].positions[1].x).toEqual(settings.ships[0].position.x);
    expect(service.currentPlayer.ships[0].positions[1].y).toEqual(settings.ships[0].position.y + 1);
    expect(service._waitingPlayer.ships[0].positions[1].y).toEqual(settings.ships[0].position.y + 1);
  });

});
