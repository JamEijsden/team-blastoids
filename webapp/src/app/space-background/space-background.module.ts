import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpaceBackgroundComponent} from "./space-background.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SpaceBackgroundComponent],
  exports: [SpaceBackgroundComponent]
})
export class SpaceBackgroundModule { }
