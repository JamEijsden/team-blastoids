import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import {MenuComponent} from "./menu.component";
import {ChatModule} from "../chat/chat.module";

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [MenuComponent],
  declarations: [MenuComponent]
})
export class MenuModule { }
