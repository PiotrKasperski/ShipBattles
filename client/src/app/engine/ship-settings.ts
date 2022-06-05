import {Position} from "./position";
import {Directions} from "./directions";

export interface ShipSettings {
  size: number,
  position: Position,
  directions: Directions,
}
