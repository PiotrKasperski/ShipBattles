import { Injectable } from '@angular/core';
import {Player} from "./player";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  currentPlayer:Player=new Player();
  waitingPlayer:Player=new Player();

  constructor() { }
}
