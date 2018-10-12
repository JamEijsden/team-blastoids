import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatButton, MatButtonModule, MatFormFieldModule, MatInputModule} from "@angular/material";
import {ViewTemplateModule} from "../view-template/view-template.module";

const routes: Routes = [{
  path: '', component: HomeComponent
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    ViewTemplateModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
