import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BoardComponent} from './board/board.component';
import {FieldComponent} from './field/field.component';
import {EngineModule} from "./engine/engine.module";

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    FieldComponent
  ],
  imports: [
    BrowserModule,
    EngineModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
