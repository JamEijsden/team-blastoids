import {Injectable} from "@angular/core";
import {WebSocketSubject} from "rxjs/webSocket";

import * as io from 'socket.io-client';
import {environment} from '../../environments/environment'
@Injectable()
export class ViewService {

  private menuOpenState = false;

  constructor() {}


  isMenuOpen() {
    return this.menuOpenState;
  }

  setMenuOpenState(state) {
    this.menuOpenState = state;
  }

}
