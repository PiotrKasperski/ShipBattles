import {Board} from "./board";
import {Ship} from "./ship";
import {Directions} from "./directions";
import {Position} from "./position";

export class Player {
  private _isDeployed: boolean = false;

  constructor(name: string = '', board: { width: number, high: number } = {
    width: 0,
    high: 0
  }, ships: Array<{ size: number, position: Position, directions: Directions }> = []) {

    this._name = name;
    this._board = new Board(board.width, board.high);
    this._ships = this.setShips(ships);
    this._canMove = true;

    this.deployShips();
  }

  private _ships: Array<Ship>;

  get ships(): Array<Ship> {
    return this._ships;
  }

  private _board: Board;

  get board(): Board {
    return this._board;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  private _canMove: boolean;

  get canMove(): boolean {
    return this._canMove;
  }

  set canMove(value: boolean) {
    this._canMove = value;
  }

  setShips(ships: Array<{ size: number, position: Position, directions: Directions }>): Array<Ship> {
    let _ships: Array<Ship> = []
    for (let ship of ships) {
      let _ship = new Ship(ship.size);
      _ship.setShipPosition(ship.position, ship.directions)
      _ships.push(_ship);
    }
    return _ships;
  }

  deployShips() {
    for (const ship of this._ships) {
      this._board.deployShip(ship);
    }
  }
}
