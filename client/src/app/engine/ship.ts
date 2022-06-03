import {Position} from "./position";
import {Directions} from "./directions";

export class Ship {
  get positions(): Position[] {
    return this._positions;
  }
  private readonly _size:number;
  private _positions: Position[]=[];

  constructor(size:number) {
    this._size = size;
  }
  setShipPosition(position:Position, direction:Directions){

    for (let i = 0; i < this._size; i++) {
      direction===Directions.HORIZONTAl?this._positions.push({x:position.x+i,y:position.y}):this._positions.push({x:position.x,y:position.y+i});
    }
}
}
