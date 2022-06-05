import {Component, OnInit} from '@angular/core';
import {GameService} from "../../engine/game.service";
import {Router} from '@angular/router';
import {GameSettings} from "../../engine/game-settings";
import {GameStates} from "../../engine/game-states";
import {DeployingService} from "../deploying.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  settings: GameSettings = {board: {high: 0, width: 0}, player1: {name: ""}, player2: {name: ""}, ships: []};

  constructor(public gameService: GameService, private deployingService: DeployingService, private router: Router) {
    if (!router.getCurrentNavigation()?.extras.state) router.navigateByUrl('/settings');
  }

  ngOnInit(): void {
    console.log('state', history.state);

    this.settings = {...this.settings, ...history.state};

    //this.devMock();

    this.gameService.init(this.settings);

    this.gameService.gameState.subscribe(gameState => {
      if (gameState === GameStates.GAME_OVER) this.router.navigateByUrl('/gameover', {state: {player: this.gameService.winner}})
    })
    this.deploy();
  }

  deploy() {
    this.gameService.gameState.next(GameStates.DEPLOYING);
    this.deployingService.shipMove.subscribe((newPosition) => {
      console.log(this.gameService.currentPlayer)
      this.gameService.currentPlayer.moveShip(newPosition);
    })
  }

  // //TODO DELETE THIS AFTER DEVELOPMENT
  // devMock(){
  //   if(!history.state.board) this.settings = {
  //     "board": {
  //       "high": 7,
  //       "width": 7
  //     },
  //     "player1": {
  //       "name": "p1"
  //     },
  //     "player2": {
  //       "name": "p2"
  //     },
  //     "ships": [
  //       {
  //         "size": 2,
  //         "position": {
  //           "x": 5,
  //           "y": 0
  //         },
  //         "directions": 0
  //       }
  //     ]
  //   }
  // }
}
