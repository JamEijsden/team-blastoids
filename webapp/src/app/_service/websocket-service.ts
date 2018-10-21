import {Injectable} from "@angular/core";
import {WebSocketSubject} from "rxjs/webSocket";

import * as io from 'socket.io-client';
import {environment} from '../../environments/environment'
@Injectable()
export class WebsocketService {

  private sockets: Map<string, any> = new Map();
  private url = environment.wsUrl + ':' + environment.wsPort + '/';
  constructor() {}

  connect(route: string){
      //let subject = new Subject();
      const socket = io.connect(this.url + route);
/*
     socket.on(route, (data) => {
        subject.next(data);
      });

      socket.on('name', (data) => {
        subject.next(data);
      });
*/
      this.sockets.set(route, socket);
      return socket;
  }

  publish(nsp, event, msg, header?) {
    this.sockets.get(nsp).emit(event, msg);
    // console.log(nsp, event, msg);
  }

}
