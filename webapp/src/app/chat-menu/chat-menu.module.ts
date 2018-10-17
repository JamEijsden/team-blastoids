import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatModule} from "../chat/chat.module";
import {MenuModule} from "../menu/menu.module";
import {ChatMenuComponent} from "./chat-menu.component";

@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    ChatModule
  ],
  exports: [ChatMenuComponent],
  declarations: [ChatMenuComponent]
})
export class ChatMenuModule { }
