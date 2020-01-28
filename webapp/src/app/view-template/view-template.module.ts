import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewTemplateComponent} from "./view-template.component";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
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
