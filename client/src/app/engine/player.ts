import {Board} from "./board";
import {Ship} from "./ship";
import {Directions} from "./directions";

export class Player {
  get board(): Board {
    return this._board;
  }

  private _board:Board= new Board(10,10);
  private _ships:Array<Ship>=[];
  constructor() {

    this._ships.push(new Ship(4));
    this._ships.push(new Ship(3));
    this._ships.push(new Ship(3));

    this._ships[0].setShipPosition({x:1,y:6},Directions.VERTICAL);
    this._ships[1].setShipPosition({x:2,y:4},Directions.HORIZONTAl);
    this._ships[1].setShipPosition({x:8,y:2},Directions.VERTICAL);

  }

}
