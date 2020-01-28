import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatComponent} from "./chat.component";
import {MessageModule} from "./message/message.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import {MessageSnackbarService} from "./message-snackbar/message-snackbar-service";
import {MessageSnackbarComponent} from "./message-snackbar/message-snackbar.component";
import {OverlayModule} from "@angular/cdk/overlay";
import {MessageSnackbarModule} from "./message-snackbar/message-snackbar.module";

@NgModule({
  imports: [
    CommonModule,
    MessageModule,
    MatFormFieldModule,
    MatInputModule,
    MessageSnackbarModule,
    MatProgressSpinnerModule

  ],
  exports: [ChatComponent],
  declarations: [ChatComponent],
  providers: [MessageSnackbarService],
  entryComponents: [MessageSnackbarComponent]
})
export class ChatModule { }
