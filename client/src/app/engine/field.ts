import {FieldState} from "./field-state";
import {Position} from "./position";

export class Field {
  private readonly _position: Position = {x: 0, y: 0};

  constructor(position: Position) {
    this._position = position;
  }

  get position(): Position {
    return this._position;
  }


  private _state: FieldState = FieldState.EMPTY;

  get state(): FieldState {
    return this._state;
  }

  set state(value: FieldState) {
    this._state = value;
  }
}
