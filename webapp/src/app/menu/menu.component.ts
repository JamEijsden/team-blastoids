import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {StoreService} from "../_service/store-service";
import {Router} from "@angular/router";
import { MatDrawer } from "@angular/material/sidenav";
import {ViewService} from "../_service/view-service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChild('menu', { static: true }) menu: MatDrawer;

  constructor(private router: Router, private _view: ViewService) {

  }

  ngOnInit() {
  }

  navigateToHome(){
    this.router.navigate(['']);
    this.menu.close();
  }

  isChatMenuOpen(menu){
    return menu.opened;
  }

  onMenuOpenChange(state) {
    console.log(state);
    this._view.setMenuOpenState(state);
  }

}
