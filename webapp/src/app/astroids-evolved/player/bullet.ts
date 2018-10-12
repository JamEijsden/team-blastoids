import * as PIXI from 'pixi.js/dist/pixi.js';
import {Player} from './player';
declare var PIXI;

export class Bullet {

  constructor() {

  }

  static create(player: Player, startPosition, color, speed, type='STANDARD'){
    const bullet = new PIXI.Graphics();
    const props = this.getBulletTypeProperties(type)
    bullet.lineStyle(props.lineStyle, props.lineColor, props.lineOpacity);
    bullet.beginFill(color, props.fillOpacity);
    bullet.drawCircle(0, 0, props.radius);
    bullet.endFill();
    bullet.x = startPosition.x;
    bullet.y = startPosition.y;
    bullet.vx = 0;
    bullet.vy = 0;
    bullet.radius =  props.radius;
    bullet.rotation = player.rotation - Math.PI/2;
    bullet.count = 0;
    bullet.velocity = speed;
    return bullet;
  }

  static animateBullet(bullet, change){
    bullet.clear();
    bullet.radius = 5 * change;
    bullet.lineStyle(change);
    bullet.beginFill(0xFF000C, 1);
    bullet.drawCircle(0, 0, bullet.radius);
    bullet.endFill();
  }

  private static getBulletTypeProperties(type){
    return {
      lineStyle: 0,
      lineColor: 0xFFFFFF,
      lineOpacity: 0,
      fillOpacity: 1,
      radius: 10,
    };
  }
}
