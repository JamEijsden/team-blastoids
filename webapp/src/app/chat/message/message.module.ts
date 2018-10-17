import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material";
import {MessageComponent} from "./message.component";

@NgModule({
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [MessageComponent],
  declarations: [MessageComponent]
})
export class MessageModule { }
