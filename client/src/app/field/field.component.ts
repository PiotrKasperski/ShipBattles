import {Component, Input, OnInit} from '@angular/core';
import {Field} from "../engine/field";
import {FieldState} from "../engine/field-state";
import {GameService} from "../engine/game.service";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() field: Field = new Field({x: 0, y: 0});

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
  }

  setBackground(): { [klass: string]: any; } {
    if (this.field.state === FieldState.EMPTY) return {'background': 'aqua'};
    if (this.field.state === FieldState.SHIP) return {'background': 'grey'};
    if (this.field.state === FieldState.HITED) return {'background': 'red'};
    if (this.field.state === FieldState.HITEDSHIP) return {'background': 'darkred'};
    return {'background': 'aqua'};
  }

  onClick(e: Event): void {
    console.log(e);
    this.gameService.hit(this.field.position);
  }
}
