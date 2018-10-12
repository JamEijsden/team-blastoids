import * as PIXI from 'pixi.js/dist/pixi.js';
declare var PIXI;

export class Bomb {
  static create(radius, x, y, fillColor, opacity) {
    console.log("CREAT BOMB", radius, x, y);
    const bomb = new PIXI.Graphics();
    bomb.radius = radius;
    bomb.opacity = opacity;
    bomb.lineStyle(2, fillColor, bomb.opacity);
    bomb.beginFill(fillColor, 0.1);
    bomb.drawCircle(0, 0, bomb.radius - 2);
    bomb.endFill();
    bomb.vx = 0;
    bomb.vy = 0;
    bomb.x = x;
    bomb.y = y;
    return bomb;
  }
}
