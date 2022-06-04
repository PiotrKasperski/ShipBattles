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
import {GameSettings} from "./game-settings";
import {GameStates} from "./game-states";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor() {
    this._gameState.next(GameStates.INITIALIZATION)
  }

  currentPlayer: Player = new Player();
  _waitingPlayer: Player = new Player();

  private _winner: Player = new Player();

  private _gameState: Subject<GameStates> = new Subject<GameStates>();
  _roundTime: number = 10000

  get winner(): Player {
    return this._winner;
  }

  get gameState(): Subject<GameStates> {
    return this._gameState;
  }


  hit({x, y}: Position): void {
    if (this.checkMovementPossibility({x, y})) {
      if (this._waitingPlayer.board.fields[y][x].state === FieldState.SHIP) this.onShipHit({x, y});
      if (this._waitingPlayer.board.fields[y][x].state === FieldState.EMPTY) this.onFieldHit({x, y});
      this.currentPlayer.canMove = false;
      if (!this.isGameOver()) {
        setTimeout(() => this.nextPlayer(), 500);
      } else {
        this.onGameOver()
      }

    }
  }

  onShipHit({x, y}: Position) {
    this._waitingPlayer.board.fields[y][x].state = FieldState.HITEDSHIP
    for (const ship of this._waitingPlayer.ships) {
      if (ship.isOnPosition({x, y})) {
        if (this.isShipSink(ship)) {
          this.onShipSink(ship);
        }

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

  isGameOver() {
    return this._waitingPlayer.ships.every(ship => this.isShipSink(ship));
  }

  onGameOver() {
    this._winner = this.currentPlayer;
    this._gameState.next(GameStates.GAME_OVER);
  }

  init(settings: GameSettings) {

    this.currentPlayer = new Player(settings.player1.name, settings.board, settings.ships);
    this._waitingPlayer = new Player(settings.player2.name, settings.board, settings.ships);
    console.log('initialization', this.currentPlayer, settings);


  }
}
