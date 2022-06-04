/**
 * THIS SERVICE IS A GAME ENGINE. HERE I WANT TO HAVE ALL MY GAME LOGIC.
 * IN THE FUTURE, I PROBABLY MOVE THIS TO SERVER REPLACING IT BY INTERNET INTERFACE
 * I THINK GOOD IDEA IS TO MAKE ALL PUBLIC FUNCTIONS AS AN OBSERVABLES
 *
 * IF YOU KNOW HOW I CAN MAKE THIS BETTER PLEASE LET ME KNOW HOW TODO: MAIL TO ME!
 *
 *
 */
import {Injectable} from '@angular/core';
import {Player} from "./player";
import {FieldState} from "./field-state";
import {Position} from "./position";
import {Ship} from "./ship";
import {Directions} from "./directions";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  currentPlayer: Player = new Player('p1', {width: 10, high: 10}, [{
    size: 4,
    position: {x: 3, y: 5},
    directions: Directions.HORIZONTAl
  }]);
  _waitingPlayer: Player = new Player('p1', {width: 10, high: 10}, [{
    size: 4,
    position: {x: 3, y: 5},
    directions: Directions.HORIZONTAl
  }]);
  _roundTime: number = 10000

  constructor() {
  }

  hit({x, y}: Position): void {
    if (this.checkMovementPossibility({x, y})) {
      if (this._waitingPlayer.board.fields[y][x].state === FieldState.SHIP) this.onShipHit({x, y});
      if (this._waitingPlayer.board.fields[y][x].state === FieldState.EMPTY) this.onFieldHit({x, y});
      this.currentPlayer.canMove = false;
      setTimeout(() => this.nextPlayer(), 500);
    }
  }

  onShipHit({x, y}: Position) {
    this._waitingPlayer.board.fields[y][x].state = FieldState.HITEDSHIP
    for (const ship of this._waitingPlayer.ships) {
      if (ship.isOnPosition({x, y})) {
        if (this.isShipSink(ship)) {
          this.onShipSink(ship);
        }
        console.log('is sink', this.isShipSink(ship), this._waitingPlayer.board.getFields(ship.positions))
      }
    }

  }

  isShipSink(ship: Ship) {
    return this._waitingPlayer.board.getFields(ship.positions).every((field) => {
      return field.state === FieldState.HITEDSHIP;
    })
  }

  onShipSink(ship: Ship) {
    for (const position of ship.positions) {
      for (let i = position.x - 1; i <= position.x + 1; i++) {
        for (let j = position.y - 1; j <= position.y + 1; j++) {
          if (this._waitingPlayer.board.fields[i][j].state === FieldState.SHIP) this.onShipHit({x: j, y: i});
          if (this._waitingPlayer.board.fields[i][j].state === FieldState.EMPTY) this.onFieldHit({x: j, y: i});
        }
      }
    }
  }

  onFieldHit({x, y}: Position) {
    this._waitingPlayer.board.fields[y][x].state = FieldState.HITED
  }

  checkMovementPossibility({x, y}: Position): boolean {
    return this.currentPlayer.canMove && this._waitingPlayer.board.fields[y][x].state !== FieldState.HITED;
  }

  nextPlayer() {
    const tmp = this.currentPlayer;
    this.currentPlayer = this._waitingPlayer;
    this.currentPlayer.canMove = true;
    this._waitingPlayer = tmp;
  }
}
