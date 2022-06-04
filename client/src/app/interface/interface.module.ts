import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoardComponent} from "./board/board.component";
import {FieldComponent} from "./field/field.component";
import {MenuComponent} from "./menu/menu.component";
import {SettingComponent} from "./setting/setting.component";
import {GameComponent} from './game/game.component';


@NgModule({
  declarations: [
    BoardComponent,
    FieldComponent,
    MenuComponent,
    SettingComponent,
    GameComponent],
  imports: [
    CommonModule
  ]
})
export class InterfaceModule {
}
