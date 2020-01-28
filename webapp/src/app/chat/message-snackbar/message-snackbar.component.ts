import {Component, Inject, OnInit} from '@angular/core';
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";

@Component({
  selector: 'app-message-snackbar',
  templateUrl: './message-snackbar.component.html',
  styleUrls: ['./message-snackbar.component.css']
})
export class MessageSnackbarComponent implements OnInit {

  message;
  name;
  color;
  textColor;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = data.message;
    this.name = data.name;
    this.color = data.color;
    this.textColor = data.textColor;
  }

  ngOnInit() {
  }

}
