import { Component, OnInit } from '@angular/core';
import {StoreService} from "../_service/store-service";

@Component({
  selector: 'app-chat-menu',
  templateUrl: './chat-menu.component.html',
  styleUrls: ['./chat-menu.component.css']
})
export class ChatMenuComponent implements OnInit {

  name;
  colorProperties;


  constructor(private _store: StoreService) {
    this.name = this._store.getPlayerName();
    this.colorProperties = this._store.getPlayerColor();
  }

  ngOnInit() {
  }

}
