import {Injectable} from "@angular/core";
import {WebSocketSubject} from "rxjs/webSocket";

import * as io from 'socket.io-client';
import {Observable, Subject} from "rxjs";

@Injectable()
export class WebsocketService {

  sub: WebSocketSubject<any>;

  private sockets: Map<string, any> = new Map();
  private url = '127.0.0.1:8080/';
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
    console.log(nsp, event, msg);
  }

}
