import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StoreService} from "../_service/store-service";
import * as colorpicker from 'angular-color-picker';
import {map, takeUntil} from "rxjs/operators/";
import {WebsocketService} from "../_service/websocket-service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild('colorDiv') colorDiv;
  @ViewChild('colorDivGText') colorDivText;

  viewReady = false;
  ngDestroy = new Subject<boolean>();
  gameLinks = [
    {value: 'Solo', link: 'play'},
    {value: 'Host', link: 'host'},
    {value: 'Join', link: 'join'},
  ];

  playerName = "";
  playerColor;
  playerTextColor;
  constructor(private _store: StoreService, private _websocket: WebsocketService) {
    this.playerName = this._store.getPlayerName();
    console.log( this._store.getPlayerColor());
    this.playerColor = this._store.getPlayerColor().color.replace("0x", "#");
    this.playerTextColor = this._store.getPlayerColor().textColor;
  }

  ngOnInit(){
      this.updatePlayerName();
      this.setBackgroundColor();
      this.viewReady = true;
    }

  updatePlayerName(){
    this._store.updatePlayerName(this.playerName);
  }

  publishNameChange(event) {
    //this._websocket.publish("echo","name", this.playerName);
  }

  updateShipColor(color) {
    this._store.updatePlayerColer(color);
  }

  setBackgroundColor(){
    this.colorDiv.nativeElement.style.background = this.playerColor;
    this.colorDiv.nativeElement.style.color = this.invertColor(this.playerColor, true);
  }

  setBackgroundColorByEvent(event){
    this.playerColor =  event.srcElement.value;
    this.playerTextColor = this.invertColor(this.playerColor, true);
    this.colorDiv.nativeElement.style.background = this.playerColor;
    this.colorDiv.nativeElement.style.color = this.playerTextColor;

    this.updateShipColor({
      color: this.playerColor.replace("#", "0x"),
      textColor: this.playerTextColor
    });
  }

  padZero(str, len?) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }

  invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
    let r: any = parseInt(hex.slice(0, 2), 16),
      g: any = parseInt(hex.slice(2, 4), 16),
      b: any = parseInt(hex.slice(4, 6), 16);
    if (bw) {
      return (r * 0.299 + g * 0.587 + b * 0.114) > 186
        ? '#000000'
        : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" +this.padZero(r) + this.padZero(g) + this.padZero(b);
  }

  ngOnDestroy(): void {
    this.ngDestroy.next(true);
    this.ngDestroy.complete();
  }

}
