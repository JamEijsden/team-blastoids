import {Component, OnInit, Input} from '@angular/core';
import {WebsocketService} from "../_service/websocket-service";
import {StoreService} from "../_service/store-service";
import {MessageComponent} from "./message/message.component";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() name;
  @Input("colorProperties") colorProperties;

  textColor;
  connected = false;

  messages: Array<any> = new Array();

  constructor(private _websocket: WebsocketService, private _store: StoreService) {
  }

  ngOnInit() {
    this.colorProperties.color = this.getHexColorValuue(this.colorProperties.color);
    this.textColor = this.colorProperties.textColor;
    if(!this.connected){
      this.connectToServer();
    }
    this.subscribeOnPlayerChange();

    /*
    this._store.playerChanged
      .subscribe((player) => {
        if(!!player.color){
          this.color = player.color;
        } else {
         this.name = player.name;
        }
      })
     */
    //this.genMessages();
  }

  subscribeOnPlayerChange(){
    this._store.playerChanged
      .subscribe(player => {
        if(!!player.name){
          this.name = player.name;
          this.messages.forEach((message: MessageComponent) => {
            if(!!message.isClient){
              message.name = this.name;
            }
          });
        } else {
          this.colorProperties = player.color;
          this.messages.forEach((message: MessageComponent) => {
            if(!!message.isClient){
              message.color = this.getHexColorValuue(this.colorProperties.color);
              message.textColor = this.colorProperties.textColor;
            }
          })
        }
      })
  }

  connectToServer(){
    const chat = this._websocket.connect('chat');
    chat.on('message', (msg) => {
      this.messages.push(msg);
    });
  }

  getHexColorValuue(color){
    if(color.indexOf('#') < 0){
      return color.replace("0x", "#");
    }
    return color;
  }

  sendMessage(elem){
    const value = elem.value;
    if(!value || value == "") return;
    console.log(this.colorProperties.textColor);
    const msg = {
      name: this.name,
      color: this.getHexColorValuue(this.colorProperties.color),
      textColor: this.colorProperties.textColor,
      message: value,
      isClient: null
    };
    this._websocket.publish('chat', 'message', msg);
    msg.isClient = true;
    this.messages.push(msg);
    elem.value = "";
    elem.blur();
  }

}
