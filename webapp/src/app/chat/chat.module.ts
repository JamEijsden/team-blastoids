import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatComponent} from "./chat.component";
import {MessageModule} from "./message/message.module";
import {MatFormFieldModule, MatInputModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MessageModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [ChatComponent],
  declarations: [ChatComponent]
})
export class ChatModule { }
