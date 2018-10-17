import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatIconModule, MatSidenavModule} from "@angular/material";
import {MenuComponent} from "./menu.component";
import {ChatModule} from "../chat/chat.module";

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    ChatModule
  ],
  exports: [MenuComponent],
  declarations: [MenuComponent]
})
export class MenuModule { }
