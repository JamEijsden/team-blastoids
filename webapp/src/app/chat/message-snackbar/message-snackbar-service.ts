import {Injectable} from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import {MessageSnackbarComponent} from "./message-snackbar.component";

@Injectable()
export class MessageSnackbarService {

  constructor(public snackBar: MatSnackBar) {}

  openSnackBar(message: string, action = 'Dismiss') {
    this.snackBar.openFromComponent(MessageSnackbarComponent,{
      duration: 2000,
      verticalPosition: 'top',
      data: message,
      panelClass: 'custom-snackbar'
    });
  }

}
