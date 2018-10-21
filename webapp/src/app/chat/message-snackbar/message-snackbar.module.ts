import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MessageSnackbarComponent} from "./message-snackbar.component";
import {MatSnackBar, MatSnackBarContainer, MatSnackBarModule} from "@angular/material";
import {MessageSnackbarService} from "./message-snackbar-service";
import {OverlayModule} from "@angular/cdk/overlay";

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    OverlayModule
  ],
  exports: [MessageSnackbarComponent],
  declarations: [MessageSnackbarComponent],
  providers: [MatSnackBar, MatSnackBarContainer],
  entryComponents: [MessageSnackbarComponent]
})
export class MessageSnackbarModule { }
