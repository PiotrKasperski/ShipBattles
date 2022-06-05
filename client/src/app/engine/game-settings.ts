import {ShipSettings} from "./ship-settings";


export interface GameSettings {
  player1: { name: string },
  player2: { name: string },
  board: { width: number, high: number },
  ships: Array<ShipSettings>;
}

