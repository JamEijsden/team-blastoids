import {EventEmitter, Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class StoreService {

  private playerKey = "player";

  playerChanged: EventEmitter<any> = new EventEmitter<any>();

  private player = {
    name: "GabeTheBork",
    color: {
      color: "0x0FF000",
      textColor: "#FFFFFF"
    }
  };

  constructor() {
    if(!this.getPlayer()){
      this.setPlayer();
    }
  }

  private setPlayer() {
    localStorage.setItem(this.playerKey, JSON.stringify(this.player));
  }

  private getPlayer(){
    return JSON.parse(localStorage.getItem(this.playerKey));
  }

  getPlayerName(){
    return this.getPlayer().name;

  }

  updatePlayerName(name) {
    this.player = this.getPlayer();
    this.player.name= name;
    this.setPlayer();
    this.playerChanged.emit({name: name});
  }

  updatePlayerColer(color: any) {
    this.player = this.getPlayer();
    this.player.color = color;
    this.setPlayer();
    this.playerChanged.emit({color: color});
  }

  getPlayerColor() {
    return this.getPlayer().color;
  }
}
