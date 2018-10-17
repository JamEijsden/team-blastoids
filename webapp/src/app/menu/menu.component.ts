import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {StoreService} from "../_service/store-service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  name;
  colorProperties;

  constructor(private _store: StoreService) {
    this.name = this._store.getPlayerName();
    this.colorProperties = this._store.getPlayerColor();
  }

  ngOnInit() {
  }

  isChatMenuOpen(menu){
    return menu.opened;
  }

}
