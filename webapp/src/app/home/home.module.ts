import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {ViewTemplateModule} from "../view-template/view-template.module";
import {MenuModule} from "../menu/menu.module";


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
    MenuModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  declarations: [HomeComponent]
})
export class HomeModule { }
