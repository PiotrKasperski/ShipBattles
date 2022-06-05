import {Board} from "./board";
import {Ship} from "./ship";
import {Position} from "./position";
import {ShipSettings} from "./ship-settings";

export class Player {
  private _isDeployed: boolean = false;

  constructor(name: string = '', board: { width: number, high: number } = {
    width: 0,
    high: 0
  }, ships: Array<ShipSettings> = []) {

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

  setShips(ships: Array<ShipSettings>): Array<Ship> {
    let _ships: Array<Ship> = []
    for (let ship of ships) {
      _ships.push(new Ship(ship));
    }
    return _ships;
  }

  moveShip({id, position}: { id: number, position: Position }) {
    let shipsSettings: Array<ShipSettings> = [];
    for (const ship of this._ships) {
      if (ship.id === id) ship.positions[0] = position;
      shipsSettings.push({position: ship.positions[0], size: ship.size, directions: ship.direction})
    }
    this.setShips(shipsSettings);
    //this._ships.find(ship=>ship.id===id)?.;
    this.deployShips();
  }

  deployShips() {

    for (const ship of this._ships) {
      this._board.deployShip(ship);
    }
  }
}
