import * as PIXI from 'pixi.js/dist/pixi.js';
import {Keyboard} from './keyboard';
import {Bomb} from './bomb';
declare var PIXI;

export class Player{
  id: string;
  graphic: PIXI.Sprite = new PIXI.Graphics();

  keyObject = new Keyboard();
  isBombActive = false;
  isBombAvailable = true;
  bomb;
  isAlive = true;
  color = 0x5BFF2D;
  private left;
  private up;
  private right;
  private down;
  private space;
  private interactive: boolean;
  private movementVelocity = 7;
  private maxVelocity = 12.5;
  private minVelocity = 0;
  private acceleration = 0.5;
  nameTag: PIXI.Text;
  pastPosition = {x: null, y: null, diff_x: null, diff_y: null};
  socketConnection;


  constructor(playerId: string,  movementVelocity, acceleration, interactive: boolean) {
    this.id = playerId;
    this.interactive = interactive;
    this.movementVelocity = movementVelocity;
    this.acceleration = acceleration;
    if(this.interactive) {
      this.initKeyListeners();
    }
  }

  setConnection(c) {
    this.socketConnection = c;
  }

  initKeyListeners(){
    this.left = this.keyObject.newKeyEvent(65);
    this.up = this.keyObject.newKeyEvent(87);
    this.right = this.keyObject.newKeyEvent(68);
    this.down = this.keyObject.newKeyEvent(83);
    this.space = this.keyObject.newKeyEvent(32);
  }

  animatePlayer(tick){
      tick += 0.2;
      this.graphic.clear();
      const change = 0.5*(Math.sin(tick) + 0.5);
      if(this.isAlive){
        this.graphic.lineStyle(3 + change*3, this.color, this.graphic.opacity - change);
      } else {
        this.graphic.lineStyle(3, this.color, this.graphic.opacity);
      }
      this.graphic.beginFill(this.color, 0);
      this.graphic.drawRect(-15, -15, 30, 30);
  }


  createPlayerGraphic(spawn){
    //let player = new PIXI.Graphics();//PIXI.Sprite.fromImage('/assets/img/square.png');

    //player.texture.baseTexture.on('loaded', ()=>{this.floor = this.app.screen.height - player.height/2});
    this.graphic.opacity = 1;
    this.graphic.lineStyle(1, this.color, this.graphic.opacity);
    this.graphic.beginFill(this.color, 0);
    this.graphic.drawRect(-15, -15, 30, 30);


    this.graphic.anchor = 0;
    //this.graphic.scale.set(0.3);
    this.graphic.x = spawn.x;
    this.graphic.y = spawn.y;
    this.pastPosition.x = spawn.x;
    this.pastPosition.y = spawn.y;
    this.graphic.ax = 0;
    this.graphic.vx = 0;
    this.graphic.ay = 0;
    this.graphic.vy = 0;
    this.isBombAvailable = true;
    this.isBombActive = false;
    this.isAlive = true;
    this.graphic.interactive = true;
    this.graphic.buttonMode = false;

    //player.anchor.set(0.5);
    // Pointers normalize touch and mouse

    this.createBomb();
    this.createNameTag()

    if(this.interactive){
      this.initKeyboardListeners();
    }
    return this.graphic;
  }

  updatePlayerPosition(x, y){
    this.graphic.vx = (this.pastPosition.x == x) ? 0 : (x - this.pastPosition.x)/12.5;
    this.graphic.vy = (this.pastPosition.y == y) ? 0 : (y - this.pastPosition.y)/12.5;
    this.pastPosition.x = x;
    this.pastPosition.y = y;
    this.x = x;
    this.y = y;
    if(!this.isBombActive) {
      this.bomb.x = x;
      this.bomb.y = y;
    };
    this.updateNameTagPosition();
  }

  updatePLayerPositionX(){
    this.x += this.vx;
    if(!this.isBombActive) this.bomb.x += this.vx;
    this.updateNameTagPosition();
  }

  updatePlayerPositionY(){
    this.y += this.vy;
    if(!this.isBombActive) this.bomb.y += this.vy;
    this.updateNameTagPosition();
  }

  updateNameTagPosition(){
    this.nameTag.x = this.x;
    this.nameTag.y = this.y - 50;
  }

  createNameTag(){
    const text = new PIXI.Text(this.id, {
      //fontWeight: 'bold',
      //fontStyle: 'italic',
      fontSize: 14,
      fontFamily: 'Impact',
      fill: "#FFFFFF",
      fillOpacity: 0,
      align: 'center',
      stroke: '#00d0ff',
      strokeThickness: 0
    });
    text.anchor.x = 0.5;
    text.x = this.x;
    text.y = this.y - 50;
    this.nameTag = text;
  }

  createBomb(){
    this.bomb = Bomb.create(this.graphic.width / 2, this.graphic.x, this.graphic.y, this.color, this.graphic.opacity);
  }

  initKeyboardListeners(){

    this.left.press = () => {
      //Change the cat's velocity when the key is pressed
      this.graphic.vx = -this.movementVelocity;
      this.graphic.ax = -this.acceleration;
      //this.graphic.vy = 0;
    };
    this.left.release = () => {
      if(this.right.isUp){
        this.graphic.vx = 0;
        this.graphic.ax = 0;
      }
    };

    this.up.press = () => {
      this.graphic.vy = -this.movementVelocity;
      this.graphic.ay = -this.acceleration;
    };
    this.up.release = () => {
      if(this.down.isUp){
        this.graphic.vy = 0;
        this.graphic.ay = 0;
      }

    };

    this.right.press = () => {
      this.graphic.vx = this.movementVelocity;
      this.graphic.ax = this.acceleration;
      //this.graphic.vy = 0;
    };
    this.right.release = () => {
      if(this.left.isUp){
        this.graphic.vx = 0;
        this.graphic.ax = 0;
      }
    };

    this.down.press = () => {
      this.graphic.vy = this.movementVelocity;
      this.graphic.ay = this.acceleration;
    };
    this.down.release = () => {
      if(this.up.isUp){
        this.graphic.vy = 0;
        this.graphic.ay = 0;
      }
    };

    this.space.press = () => {
      if(!this.isBombAvailable || !this.isAlive) return;
      this.isBombAvailable = false;
      this.isBombActive = true;
      this.socketConnection.emit('bomb_used', {id: this.id});
    }
    ;
    this.space.release = () => {
    };
  }

  activateBomb() {
    this.isBombAvailable = false;
    this.isBombActive = true;
  }

  // Pixi.Graphics setter and getters

  get rotation() {
    return this.graphic.rotation;
  }
  set rotation(rotation) {
    this.graphic.rotation = rotation;
  }

  get x() {
    return this.graphic.x;
  }

  get y() {
    return this.graphic.y;
  }

  set x(x) {
    this.graphic.x = x;
  }

  set y(y) {
    this.graphic.y = y;
  }

  get vx() {
    return this.graphic.vx;
  }

  get vy() {
    return this.graphic.vy;
  }

  get width() {
    return this.graphic.width;
  }

  get height() {
    return this.graphic.height;
  }

  get opacity() {
    return this.graphic.opacity;
  }

  set opacity(opacity) {
    this.graphic.opacity = opacity;
  }

  removePlayer() {
    this.graphic.clear();
    this.bomb.clear();
    this.nameTag.clear();
    console.log(this.id + " has left the game");
  }
}
