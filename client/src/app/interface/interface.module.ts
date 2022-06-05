import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoardComponent} from "./board/board.component";
import {FieldComponent} from "./field/field.component";
import {MenuComponent} from "./menu/menu.component";
import {SettingComponent} from "./setting/setting.component";
import {GameComponent} from './game/game.component';
import {FormsModule} from "@angular/forms";

import {GameOverComponent} from './game-over/game-over.component';

import {DragBoardComponent} from './drag-board/drag-board.component';
import {ShipComponent} from './ship/ship.component';
import {DragDropModule} from "@angular/cdk/drag-drop";


@NgModule({
  declarations: [
    BoardComponent,
    FieldComponent,
    MenuComponent,
    SettingComponent,
    GameComponent,
    GameOverComponent,
    DragBoardComponent,
    ShipComponent],
  exports: [
    BoardComponent,
    GameComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule
  ]
})
export class InterfaceModule {
}
