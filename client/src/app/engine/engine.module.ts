import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameService} from "./game.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
})
export class EngineModule {
  public static forRoot(): ModuleWithProviders<EngineModule> {
    return {
      ngModule: EngineModule,
      providers: [GameService]
    };
  }
}


