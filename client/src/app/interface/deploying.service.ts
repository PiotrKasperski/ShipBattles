import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Position} from "../engine/position";

interface newPosition {
  id: number,
  position: Position
}

@Injectable({
  providedIn: 'root'
})
export class DeployingService {
  constructor() {

  }

  private _shipMoveEnded: Subject<newPosition> = new Subject<newPosition>();

  get shipMoveEnded(): Subject<newPosition> {
    return this._shipMoveEnded;
  }

  private _shipMove: Subject<newPosition> = new Subject<newPosition>();

  get shipMove(): Subject<newPosition> {
    return this._shipMove;
  }
}
