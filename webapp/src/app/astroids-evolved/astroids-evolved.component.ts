import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as PIXI from 'pixi.js/dist/pixi.js';
import {Keyboard} from './player/keyboard';
import {Player} from './player/player';
import {Bullet} from './player/bullet';
import {Bomb} from './player/bomb';
import {StoreService} from "../_service/store-service";
import {WebsocketService} from "../_service/websocket-service";
import { timer } from 'rxjs';
declare var PIXI;


@Component({
  selector: 'app-astroids-evolved',
  templateUrl: './astroids-evolved.component.html',
  styleUrls: ['./astroids-evolved.component.scss']
})
export class AstroidsEvolvedComponent implements OnInit, OnDestroy {

  private STATE = this.play;
  playerId: string = '';
  playerColor: any;
  updatingInitated = false;
  players: Map<String, Player> = new Map();
  app: PIXI.Application;
  @ViewChild('container') container: ElementRef;
  viewLoading = true;
  score = 0;
  highscore = 0;
  difficultyModifier = 1;
  scoreText: PIXI.Text;
  highscoreText: PIXI.Text;
  asteroidsDestroyed = 0;
  baseSpawnTime = 250;
  spawnTime = 2000;
  private movementVelocity = 15;
  private maxVelocity = 12.5;
  private minVelocity = 0;
  private acceleration = 0.5;
  private isHost: boolean = true;
  private maxFramerate: number = 60;

  constructor(private _websocket: WebsocketService, private _store: StoreService) {
    this.playerId = _store.getPlayerName();
    this.playerColor = _store.getPlayerColor();
  }

  connectToServer(){
    const c = this._websocket.connect('game');
    c.on('connect', ()=>{
        c.emit('join', {name: this.playerId, color: this.playerColor.color, textColor: this.playerColor.textColor});
    });

    c.on('join_data', (players: Map<string, any>) => {
      players = new Map(players);
      this.initPlayers(players);
      this.initPlayer(players.get("HOST").pos.x, players.get("HOST").pos.y)
        .setConnection(c);
      c.emit('player_ready', this.getPlayerObject(this.playerId));
      this.init();
      if(!this.updatingInitated){
        timer(0, 100)
          .subscribe(
            tick => {
              c.emit('position_update', this.getPlayerObject(this.playerId));
            });
        this.updatingInitated = true;
      }
      c.on('position_update', (data)=>{
        const players = new Map(data);
        this.updatePlayers(players);
      });

      c.on('bomb_used', (player)=> {
        this.players.get(player.id).activateBomb();
      });

      c.on('player_shoot', (player)=> {
        this.shoot(player, {
          x: player.pos.x,
          y: player.pos.y
        });
      });
    });

    c.on('join', ()=>{

    });

    /*c.on('disconnect', (player)=>{

      this.players.get(player.id).removePlayer();
      this.players.delete(player.id);
    });*/
  }

  getPlayerObject(id){
    const player = {
      id: id,
      color: this.playerColor.color,
      textColor: this.playerColor.textColor,
      pos: {
        x: this.players.get(id).x,
        y: this.players.get(id).y
      },
      rotation: 0
    };
    return player;
  }

  initUpdateToServer(c){
  }


  ngOnInit() {
    this.initApp();
    this.app.stage.interactive = true;

    this.connectToServer();
  }

  initStageOnClickListener(){
    this.container.nativeElement.addEventListener("pointerdown", (event) => {this.onStageClick(event)});
  }

  init() {

    //this.initPlayer();
    this.initStageOnClickListener();
    this.initAnimations();
    this.scoreText = this.createScoreText();
    this.app.ticker.add(delta => this.gameLoop(delta));
    this.viewLoading = false;
    if(this.isHost) {
      //setTimeout(()=>{this.spawnAsteroid()}, this.baseSpawnTime);
    }
  }

  initApp(){
    this.app = new PIXI.Application(window.innerWidth, window.innerHeight, {
      backgroundColor: 0x000000,
      antialias: true,
      anchor: 0.5
    });

    this.container.nativeElement.appendChild(this.app.view);
    window.addEventListener("resize", (e) => {
      this.app.renderer.resize(window.innerWidth, window.innerHeight);
    });
  }

  updatePlayers(players){
    players.forEach(
      player => {
        if(!this.players.has(player.id)){
          this.addNewPlayer(player)
        } else {
          if(player.id == this.playerId){return;}
          const p = this.players.get(player.id);
          p.updatePlayerPosition(player.pos.x, player.pos.y);
        }
      });
  }

  initPlayer(x, y, interactive = true){
    const player = new Player(this.playerId, this.movementVelocity, this.acceleration, interactive);
    player.color = +this.playerColor.color;
    const spawn = {
      x: x,
      y: y
    };
    this.addToScene(player.createPlayerGraphic(spawn));
    this.addToScene(player.bomb);
    this.addToScene(player.nameTag);
    this.players.set(player.id, player);
    return player;
  }

  addNewPlayer(p){
    const player = new Player(p.id, this.movementVelocity, this.acceleration, false);
    player.color = + p.color;
    const spawn = {
      x: p.pos.x,
      y: p.pos.y
    };
    this.addToScene(player.createPlayerGraphic(spawn));
    this.addToScene(player.bomb);
    this.addToScene(player.nameTag);
    this.players.set(player.id, player);
  }

  initPlayers(players){
    players.forEach(
      p => {

      });
  }

  addToScene(object){
    this.app.stage.addChild(object);
  }

  getPlayer(){
    return this.players.get(this.playerId);
  }

  gameLoop(delta) {
    this.STATE(delta);
  }


  removeObjectFromStage(object, array){
    object.clear();
    this.app.stage.removeChild(object);
    array.splice(array.indexOf(object), 1);
  }

  initAnimations(){
    let count = 0;
    this.app.ticker.add(delta => {
      count += 0.2;
      this.players.forEach(
        player => {
          player.animatePlayer(count);
        });
    });
    this.bullets.forEach(
      bullet => {
        bullet.count += 0.004;
        const change = 1*(Math.sin(bullet.count*100) + 2);
        Bullet.animateBullet(bullet, change);
      })
  }

  play(tick) {
    if(!this.isAtMaxFramerate()) return;

    const pos = this.app.renderer.plugins.interaction.mouse.global;
    this.getPlayer().rotation = this.rotateToPoint(pos.x, pos.y, this.getPlayer().x, this.getPlayer().y);

    this.players.forEach(
      player => {
        if(!!player.isBombActive){
          this.redrawActivatedBomb(player);
        }
      });


    this.bullets.forEach(bullet => {
      bullet.x += Math.cos(bullet.rotation)*bullet.velocity;
      bullet.y += Math.sin(bullet.rotation)*bullet.velocity;
      if(!this.isInBounds(bullet, bullet.radius)){
        this.removeObjectFromStage(bullet, this.bullets);
        return;
      }
    });

    this.asteroids.forEach(asteroid => {
      const newSpeed = this.difficultyModifier * (this.difficultyModifier/2);
      asteroid.x += Math.cos(asteroid.rotation)*(asteroid.velocity) + newSpeed;
      asteroid.y += Math.sin(asteroid.rotation)*(asteroid.velocity) + newSpeed;
      this.bullets.forEach(bullet => {
        if(this.checkForCircleCollision(bullet, asteroid)){
          this.score += Math.floor(asteroid.radius/10);
          this.removeObjectFromStage(asteroid, this.asteroids);
          this.removeObjectFromStage(bullet, this.bullets);
          this.asteroidsDestroyed++;
          return;
        }
      });
      this.players.forEach(
        player => {
          if(player.isBombActive && this.checkForCircleCollision(player.bomb, asteroid)){
            this.removeObjectFromStage(asteroid, this.asteroids);
            this.score++;
            this.asteroidsDestroyed++;
            return;
          }
          if(player.isAlive && this.checkForCollision(player, asteroid)){
            //this.app.stage.removeChild(this.player);
            this.onPlayerDeath(player);
          }
        });
    });

    this.players.forEach(
      player => {
        if(this.isInBoundsX(player)){
         player.updatePLayerPositionX();
        }
        if(this.isInBoundsY(player)){
         player.updatePlayerPositionY();
        }
      });

    this.updateScore();
  }

  removeAllBullets(player){
    this.bullets.filter(
      bullet => bullet.playerId == player.id)
      .forEach(
      bullet => this.removeObjectFromStage(bullet, this.bullets)
    );
  }

  onPlayerDeath(player){
    if(player.id == this.getPlayer().id) {
      this.updateHighscore();
    }
    this.setPlayerAlive(player,false, 0.2);
    this.removeAllBullets(player);
    this.destroyBomb(player, true);
    setTimeout(()=>{this.setPlayerAlive(player,true, 1)}, 3000);
  }

  setPlayerAlive(player, isAlive, opacity) {
    player.isAlive = isAlive;
    player.opacity = opacity;
    player.bomb.opacity = opacity;
    this.onlyRedrawBomb(player);
  }

  updateHighscore(){

    if(!this.highscoreText){
      this.highscoreText = this.createHighscoreText(this.score);
      this.highscore = this.score;
    } else {
      if(this.score > this.highscore) {
        this.highscore = this.score;
        this.highscoreText.text = "Highscore: " + this.score;
      }
    }
    this.resetScore();
  }

  updateScore(score?){
    if(!!score) this.score = score;

    this.scoreText.text = "Score: " + this.score;
    this.difficultyModifier = 1 + this.score/100;
    this.spawnTime = this.baseSpawnTime/(this.difficultyModifier)
  }

  resetScore(){
    this.score = 0;
    this.difficultyModifier = 1 + this.score/100;
  }

  createScoreText(){
    const text = new PIXI.Text('Score: 0', {
      //fontWeight: 'bold',
      //fontStyle: 'italic',
      fontSize: 25,
      fontFamily: 'Impact',
      fill: '#000000',
      fillOpacity: 0,
      align: 'center',
      stroke: '#00d0ff',
      strokeThickness: 2
    });
    text.x = (this.app.screen.width / 2) - 100;
    text.y = 30;
    text.anchor.x = 0.5;
    this.app.stage.addChild(text);
    return text;
  }

  createHighscoreText(score){
    const text = new PIXI.Text('Highscore: ' + score, {
      //fontWeight: 'bold',
      //fontStyle: 'italic',
      fontSize: 25,
      fontFamily: 'Impact',
      fill: '#000000',
      fillOpacity: 0,
      align: 'center',
      stroke: '#00d0ff',
      strokeThickness: 2
    });
    text.x = (this.app.screen.width / 2) + 100;
    text.y = 30;
    text.anchor.x = 0.5;
    this.app.stage.addChild(text);
    return text;
  }


  onStageClick(event){
    const player = this.getPlayer();
    if(!player.isAlive) return;
    const playerObj = this.getPlayerObject(player.id);
    playerObj.rotation = player.rotation;
    player.socketConnection.emit('player_shoot', playerObj);
    this.shoot(player, {
      x: player.x,
      y: player.y
    });
  }


  private bullets: Array<any> = new Array();
  private bulletSpeed = 20;

  shoot(player, startPosition){
    if(this.bullets.length > 5) return;
    let bullet = this.createBullet(player, startPosition);
    this.app.stage.addChild(bullet);
    this.bullets.push(bullet);
  }

  createBullet(player, position){
    return Bullet.create(player, position, player.color , this.bulletSpeed)
  }



  rotateToPoint(mx, my, px, py){
    const self = this;
    const dist_Y = my - py;
    const dist_X = mx - px;
    const angle = Math.atan2(dist_Y, dist_X);
    //var degrees = angle * 180/ Math.PI;
    return angle + 1.5;
  }

  getRandomPositiveOrNegative(){
    return Math.random() < 0.5 ? -1 : 1;
  }

  private asteroids = [];
  private asteroidSpeed = 1;
  private asteroidVariation = 5;
  createAsteroid(x, y, lineStyle=0xFF8E00){
    const radius = 35 * (Math.random() + 0.3);
    const asteroid = new PIXI.Graphics();
    asteroid.lineStyle(2, lineStyle, 1);
    asteroid.beginFill(0xff0f22, 0);
    asteroid.drawCircle(0, 0, radius);
    asteroid.endFill();
    asteroid.vx = this.getRandomPositiveOrNegative();
    asteroid.vy = this.getRandomPositiveOrNegative();
    asteroid.x = this.getAsteroidX(asteroid.vx, asteroid.vy);
    asteroid.y = this.getAsteroidY(asteroid.vy, asteroid.vx);
    asteroid.radius = radius;
    asteroid.width = radius*2;
    asteroid.height = radius*2;
    asteroid.velocity = (Math.random() * this.asteroidVariation) + this.asteroidSpeed;
    asteroid.rotation = Math.atan2( this.getPlayer().y - asteroid.y, this.getPlayer().x - asteroid.x) + (Math.random() * (Math.PI*2)/3) - (Math.PI*2)/3;
    asteroid.count = 0;
    return asteroid;
  }



  spawnAsteroid(){
    const asteroid = this.createAsteroid(this.app.screen.width/2, this.app.screen.height/2);
    this.app.stage.addChild(asteroid);
    this.asteroids.push(asteroid);
    //setTimeout(()=>this.removeObjectFromStage(asteroid, this.asteroids), 15500);
    setTimeout(()=>this.spawnAsteroid(), this.spawnTime);
  }

  getAsteroidX(vx, vy){
    if(vy > 0){
      return Math.random() * this.app.screen.width;
    } else {
      return (vx > 0 ? -50 : this.app.screen.width + 50);
    }
  }
  getAsteroidY(vy, vx){
    if(vy > 0){
      return (vx > 0 ? -50 : this.app.screen.height + 50);
    } else {
      return Math.random() * this.app.screen.height;
    }
  }

  isInBoundsX(object){
    return (this.app.screen.width > object.x + object.vx + object.width/2 && 0 < object.x + object.vx - object.width/2);
  }

  isInBoundsY(object){
    return (this.app.screen.height > object.y + object.vy + object.height/2 && 0 < object.y + object.vy - object.height/2);
  }

  isInBounds(object, radius){
    if(!!radius){
      object.width = radius*2;
      object.height = radius*2;
    }

    if(this.isInBoundsX(object) && this.isInBoundsY(object)){
      return true;
    }

    return false;

  }

  checkForCircleCollision(c1, c2){
    const dx = c1.x - c2.x,
      dy = c1.y - c2.y,
      distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < c1.radius + c2.radius) {
      return true;
    }
    return false;
  }

  checkForCollision(r1, r2){
    if((
        r1.x + r1.width > r2.x && r1.x < r2.x + r2.width &&
        r1.y + r1.height + r1.vy > r2.y &&
        r1.y + r1.vy < r2.y + r2.height
      ) && (
        r1.x + r1.width + r1.vx > r2.x &&
        r1.x + r1.vx < r2.x + r2.width &&
        r1.y + r1.height > r2.y &&
        r1.y < r2.y + r2.height
      )) {
        return true;
      }
      return false;

  }

  destroyBomb(player, available) {
    player.bomb.clear();
    this.app.stage.removeChild(player.bomb);
    player.isBombActive = false;
    //player.isBombAvailable = available;
    setTimeout(()=>{
      player.createBomb();
      this.app.stage.addChild(player.bomb);
      player.isBombAvailable = true;
    }, player.spawnTime + 2000);

  }

  redrawActivatedBomb(player){
    if(player.bomb.radius > 200) {
      this.destroyBomb(player, false);

      return;
    }
    player.bomb.radius += 3;
    this.onlyRedrawBomb(player);
  }

  onlyRedrawBomb(player){
    player.bomb.clear();
    player.bomb.lineStyle(2, player.color, player.bomb.opacity);
    player.bomb.beginFill(player.color, 0.05);
    player.bomb.drawCircle(0, 0, player.bomb.radius);
    player.bomb.endFill();
  }

  private g_Tick=1000/this.maxFramerate;
  private g_Time=0;
  private isAtMaxFramerate() {
    var timeNow = (new Date()).getTime();
    var timeDiff = timeNow - this.g_Time;
    if (timeDiff < this.g_Tick)
      return false;

    // We are now meeting the frame rate, so reset the last time the animation is done
    this.g_Time = timeNow;
    return true;
  }

  ngOnDestroy(): void {

  }
}
