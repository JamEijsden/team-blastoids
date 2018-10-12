import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as PIXI from 'pixi.js/dist/pixi.js';

declare var PIXI;

@Component({
  selector: 'app-space-background',
  templateUrl: './space-background.component.html',
  styleUrls: ['./space-background.component.css']
})
export class SpaceBackgroundComponent implements OnInit {

  app: PIXI.Application;
  @ViewChild('container') container: ElementRef;
  constructor() { }

  ngOnInit() {


    this.initApp();
    this.app.ticker.add((tick)=>{this.play(tick)});
    setInterval(()=>{this.spawnRandomStars()}, 200);
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

  spawnRandomStars() {
    this.app.stage.addChild(this.createStar());
  }

  isInBoundsX(object){
    return (this.app.screen.width > object.x + object.vx + object.radius && 0 < object.x + object.vx - object.radius);
  }

  stars = [];
  createStar(){
    const star = new PIXI.Graphics();
    star.radius = ((Math.random()*3) + 1);
    star.width = star.radius * 2;
    star.lineStyle(0, 0xFFFFFF, 0);
    star.beginFill(0xFFFFFF, 1);
    star.drawCircle(0, 0, star.radius);
    star.endFill();
    star.shouldAnimate = false;
    setTimeout(()=>star.shouldAnimate=true, (Math.random()*3000) + 1);
    star.x = -5;
    star.y = Math.random() * this.app.screen.height;
    star.vx = 5;
    star.change = 0;
    this.stars.push(star);
    return star;
  }

  starTwinkle(star) {
    star.change += 0.05;
    star.clear();
    star.beginFill(0xFFFFFF, 0.5 * (Math.sin(star.change) + 1));
    star.drawCircle(0, 0, star.radius);
    star.endFill();

  }

  play(tick){
    this.stars.forEach(
      star => {
        star.x += star.vx;
        if(star.shouldAnimate){
          this.starTwinkle(star);
        }
        if(!this.isInBoundsX(star)){
          this.removeObjectFromStage(star, this.stars);
        }
      })
  }

  removeObjectFromStage(object, array){
    object.clear();
    this.app.stage.removeChild(object);
    array.splice(array.indexOf(object), 1);
  }

}
