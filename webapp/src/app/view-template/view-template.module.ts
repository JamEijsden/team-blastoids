import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewTemplateComponent} from "./view-template.component";
import {MatCardModule, MatProgressSpinnerModule} from "@angular/material";
import {SpaceBackgroundModule} from "../space-background/space-background.module";

@NgModule({
  imports: [
    CommonModule,
    SpaceBackgroundModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  declarations: [ViewTemplateComponent],
  exports: [ViewTemplateComponent]


})
export class ViewTemplateModule { }
