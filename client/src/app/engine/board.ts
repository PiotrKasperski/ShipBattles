import {Field} from "./field";
import {Ship} from "./ship";
import {FieldState} from "./field-state";
import {Position} from "./position";

export class Board {
  width: number;
  height: number;

  constructor(width: number, high: number) {
    this.width = width;
    this.height = high;
    this._fields = [];
    for (let j = 0; j < high; j++) {
      let row: Array<Field> = [];
      for (let i = 0; i < width; i++) {
        row.push(new Field({x: i, y: j}))
      }
      this._fields.push(row);
    }
  }

  private _fields: Array<Array<Field>>;

  get fields(): Array<Array<Field>> {
    return this._fields;
  }

  set fields(value: Array<Array<Field>>) {
    this._fields = value;
  }

  deployShip(ship: Ship) {
    for (const shipPosition of ship.positions) {
      if (shipPosition.x >= this.width) shipPosition.x = this.width - 1;
      if (shipPosition.y >= this.height) shipPosition.y = this.height - 1;
      //TODO x<=width
      console.log(shipPosition.x, shipPosition.y)
      this._fields[shipPosition.x][shipPosition.y].state = FieldState.SHIP;
    }
  }

  getFields(positions: Array<Position>): Array<Field> {

    let fields: Array<Field> = [];
    for (let position of positions) {
      fields.push(this.findField(position));
    }

    return fields
  }

  findField({x, y}: Position): Field {
    let _field = new Field({x: 0, y: 0});
    for (const fields of this._fields) {
      for (const field of fields) {
        if (field.position.y === x && field.position.x === y) {
          return field
        }
      }
    }
    return _field;

  }

  clear() {
    for (const row of this._fields) {
      for (const field of row) {
        field.state = FieldState.EMPTY;
      }
    }
  }
}
