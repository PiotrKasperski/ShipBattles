import {Component, OnInit} from '@angular/core';
import {GameService} from "../../engine/game.service";
import {Router} from '@angular/router';
import {GameSettings} from "../../engine/game-settings";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  settings: GameSettings = {board: {high: 0, width: 0}, player1: {name: ""}, player2: {name: ""}, ships: []};

  constructor(public gameService: GameService, private router: Router) {
    if (!router.getCurrentNavigation()?.extras.state) router.navigateByUrl('/settings');
  }

  ngOnInit(): void {
    this.settings = {...this.settings, ...history.state};
    this.gameService.init(this.settings);
  }

}
