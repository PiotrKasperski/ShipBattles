import {Component, OnInit} from '@angular/core';
import {Player} from "../../engine/player";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit {
  winner: Player = new Player();

  constructor(private router: Router) {
    console.log(router.getCurrentNavigation()?.extras.state)
    if (!router.getCurrentNavigation()?.extras.state) router.navigateByUrl('/menu');


  }

  ngOnInit(): void {
    this.winner = new Player(history.state.player._name);

  }

  onRematchClick() {
    this.router.navigateByUrl('/game');
  }

  onMenuClick() {
    this.router.navigateByUrl('/menu');
  }
}
