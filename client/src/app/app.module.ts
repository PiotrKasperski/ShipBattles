import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';

import {EngineModule} from "./engine/engine.module";

import {AppRoutingModule} from './app-routing.module';
import {InterfaceModule} from "./interface/interface.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    EngineModule.forRoot(),
    InterfaceModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
