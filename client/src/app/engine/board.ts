import {Field} from "./field";
import {Ship} from "./ship";
import {FieldState} from "./field-state";

export class Board {
  get fields(): Array<Array<Field>> {
    return this._fields;
  }

  set fields(value: Array<Array<Field>>) {
    this._fields = value;
  }

  private _fields:Array<Array<Field>>=[];

  constructor(width:number, high:number) {

    for (let j = 0; j < high ; j++) {
      let row:Array<Field>=[];
      for (let i = 0; i < width; i++) {
        row.push(new Field({x:i,y:j}))
      }
      this._fields.push(row);
    }

  }

  deployShip(ship: Ship) {
    for (const shipPosition of ship.positions) {
      this._fields[shipPosition.x][shipPosition.y].state=FieldState.SHIP;
    }
  }
}
