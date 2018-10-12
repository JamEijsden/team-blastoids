export class Key {
  code;
  isDown:boolean = false;
  isUp:boolean = true;
  press:any = undefined;
  release:any = undefined;

  constructor(private keyCode){
    this.code = keyCode;
  }

  downHandler = event => {
    if (event.keyCode === this.code) {
      if (this.isUp && this.press) this.press();
      this.isDown = true;
      this.isUp = false;
    }
    //event.preventDefault();
  };
  upHandler = event => {
    if (event.keyCode === this.code) {
      if (this.isDown && this.release) this.release();
      this.isDown = false;
      this.isUp = true;
    }
  }
}
