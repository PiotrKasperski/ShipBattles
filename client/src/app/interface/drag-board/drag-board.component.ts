import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CdkDragEnd, CdkDragMove} from "@angular/cdk/drag-drop";
import {DeployingService} from "../deploying.service";
import {Position} from "../../engine/position";
import {Ship} from "../../engine/ship";
import {GameService} from "../../engine/game.service";

@Component({
  selector: 'app-drag-board',
  templateUrl: './drag-board.component.html',
  styleUrls: ['./drag-board.component.scss']
})
export class DragBoardComponent implements OnInit {
  height: number;
  width: number;

  ships: Array<Ship>;
  @ViewChild('dragboard') board!: ElementRef;

  constructor(private deployingService: DeployingService, private gameService: GameService) {
    this.height = gameService.currentPlayer.board.height;
    this.width = gameService.currentPlayer.board.width;
    this.ships = gameService.currentPlayer.ships;
    console.log(this.ships);
  }

  ngOnInit(): void {
    this.height = this.gameService.currentPlayer.board.height;
    this.width = this.gameService.currentPlayer.board.width;
    this.ships = this.gameService.currentPlayer.ships;
  }

  onDragEnded(event: CdkDragEnd, ship: Ship) {
    this.deployingService.shipMoveEnded.next({
      id: ship.id,
      position: this.getPosition({x: event.dropPoint.x, y: event.dropPoint.y})
    })
  }

  onDragMoved(event: CdkDragMove, ship: { id: number }) {
    this.deployingService.shipMove.next({
      id: ship.id,
      position: this.getPosition({x: event.pointerPosition.x, y: event.pointerPosition.y})
    })
  }

  getPosition({x, y}: Position): Position {
    let size = {width: this.board.nativeElement.offsetWidth, height: this.board.nativeElement.offsetHeight};
    let rowHeight = size.height / this.height;
    let columnWidth = size.width / this.width;
    return {
      x: Math.floor(x / columnWidth),
      y: Math.floor(y / rowHeight),
    }
  }
}
