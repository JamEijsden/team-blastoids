import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AstroidsEvolvedModule} from './astroids-evolved/astroids-evolved.module';
import {RouterModule, Routes} from "@angular/router";
import {HomeModule} from "./home/home.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {StoreService} from "./_service/store-service";
import {WebsocketService} from "./_service/websocket-service";
import {ChatMenuModule} from "./chat-menu/chat-menu.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AstroidsEvolvedModule,
    RouterModule,
    HomeModule,
    ChatMenuModule
  ],
  providers: [
    StoreService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
