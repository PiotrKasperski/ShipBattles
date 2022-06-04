import {Component, OnInit} from '@angular/core';
import {GameService} from "../../engine/game.service";
import {Router} from '@angular/router';
import {GameSettings} from "../../engine/game-settings";
import {GameStates} from "../../engine/game-states";

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
    this.gameService.gameState.subscribe(gameState => {
      if (gameState === GameStates.GAME_OVER) this.router.navigateByUrl('/gameover', {state: {player: this.gameService.winner}})
    })
  }

}
