import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AstroidsEvolvedModule} from './astroids-evolved/astroids-evolved.module';
import {RouterModule, Routes} from "@angular/router";
import {HomeModule} from "./home/home.module";
import { SpaceBackgroundComponent } from './space-background/space-background.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
