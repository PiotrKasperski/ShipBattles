import {Component, OnInit} from '@angular/core';
import {GameSettings} from "../../engine/game-settings";
import {Directions} from "../../engine/directions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  settings: GameSettings = {board: {high: 10, width: 10}, player1: {name: "p1"}, player2: {name: "p2"}, ships: []}

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(settings: GameSettings) {

    settings.ships.push({size: 4, position: {x: 2, y: 2}, directions: Directions.VERTICAL},
      // {size: 3, position: {x: 2, y: 0}, directions: Directions.VERTICAL},
      // {size: 3, position: {x: 1, y: 0}, directions: Directions.VERTICAL},
      // {size: 2, position: {x: 3, y: 0}, directions: Directions.VERTICAL},
      // {size: 2, position: {x: 4, y: 0}, directions: Directions.VERTICAL},
      // {size: 2, position: {x: 5, y: 0}, directions: Directions.VERTICAL}
    );
    this.router.navigateByUrl('/game', {state: settings})
  }

}

/*{
  "player1.name": "sdf",
  "player2.name": "sdf",
  "board.width": 1,
  "board.high": 1
}*/
