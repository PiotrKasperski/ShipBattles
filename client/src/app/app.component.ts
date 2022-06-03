import { Component } from '@angular/core';
import {GameService} from "./engine/game.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  constructor(public gameService: GameService) {
  }

}
