import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
} from "@angular/material";
import {ViewTemplateModule} from "../view-template/view-template.module";
import {WebsocketService} from "../_service/websocket-service";
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
