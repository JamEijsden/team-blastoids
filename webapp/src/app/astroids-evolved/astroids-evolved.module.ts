import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroidsEvolvedComponent } from './astroids-evolved.component';
import {RouterModule, Routes} from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


const routes: Routes = [
  {
    path: 'play',
    component: AstroidsEvolvedComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    MatProgressSpinnerModule
  ],
  declarations: [AstroidsEvolvedComponent],
  exports: []
})
export class AstroidsEvolvedModule { }
