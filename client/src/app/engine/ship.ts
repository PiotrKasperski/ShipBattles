import {Position} from "./position";
import {Directions} from "./directions";
import {ShipSettings} from "./ship-settings";

export class Ship {
  private readonly _id: number;

  constructor(settings: ShipSettings) {
    this._size = settings.size;
    this._id = Math.floor(Math.random() * 10000);
    this._direction = settings.directions;
    this.setShipPosition(settings.position, settings.directions)
  }

  get size(): number {
    return this._size;
  }

  private readonly _size: number;

  get id(): number {
    return this._id;
  }

  private _positions: Position[] = [];

  private _direction: Directions;

  get direction(): Directions {
    return this._direction;
  }


  get positions(): Position[] {
    return this._positions;
  }

  setShipPosition(position: Position, direction?: Directions) {
    this._positions = [];
    if (!direction) direction = this._direction;
    for (let i = 0; i < this._size; i++) {
      direction === Directions.HORIZONTAl ? this._positions.push({
        x: position.x + i,
        y: position.y
      }) : this._positions.push({x: position.x, y: position.y + i});
    }
    console.log(this._positions);

  }

  isOnPosition({x, y,}: Position): boolean {

    return this._positions.filter(position => position.x === y && position.y === x).length > 0;
  }
}
