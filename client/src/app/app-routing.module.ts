import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SettingComponent} from "./interface/setting/setting.component";
import {MenuComponent} from "./interface/menu/menu.component";
import {GameComponent} from "./interface/game/game.component";

const routes: Routes = [
  {path: 'settings', component: SettingComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'game', component: GameComponent, data: {settings: {}}},

  {path: '', redirectTo: '/menu', pathMatch: 'full'},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
