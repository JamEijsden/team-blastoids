import {Key} from "./key";

export class Keyboard {
  constructor(){}

  newKeyEvent(keyCode) {
  //Attach event listeners
    const key: Key = new Key(keyCode);
    window.addEventListener(
      "keydown", key.downHandler.bind(key), true
    );
    window.addEventListener(
      "keyup", key.upHandler.bind(key), true
    );

    return key;
  }
}

