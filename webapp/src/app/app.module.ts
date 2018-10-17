import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AstroidsEvolvedModule} from './astroids-evolved/astroids-evolved.module';
import {RouterModule, Routes} from "@angular/router";
import {HomeModule} from "./home/home.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {StoreService} from "./_service/store-service";
import {WebsocketService} from "./_service/websocket-service";
import { MenuComponent } from './menu/menu.component';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './chat/message/message.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AstroidsEvolvedModule,
    RouterModule,
    HomeModule
  ],
  providers: [
    StoreService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
