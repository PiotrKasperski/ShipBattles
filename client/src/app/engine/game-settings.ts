import {Directions} from "./directions";
import {Position} from "./position";

export interface ShipSetting {
  size: number,
  position: Position,
  directions: Directions
}

export interface GameSettings {
  player1: { name: string },
  player2: { name: string },
  board: { width: number, high: number },
  ships: Array<ShipSetting>;
}

