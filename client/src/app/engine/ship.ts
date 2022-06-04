import {Position} from "./position";
import {Directions} from "./directions";

export class Ship {
  private readonly _size: number;

  constructor(size: number) {
    this._size = size;
  }

  private _positions: Position[] = [];

  get positions(): Position[] {
    return this._positions;
  }

  setShipPosition(position: Position, direction: Directions) {
    for (let i = 0; i < this._size; i++) {
      direction === Directions.HORIZONTAl ? this._positions.push({
        x: position.x + i,
        y: position.y
      }) : this._positions.push({x: position.x, y: position.y + i});
    }

  }

  isOnPosition({x, y,}: Position): boolean {
    return this._positions.filter(position => position.x === y && position.y === x).length > 0;
  }
}
