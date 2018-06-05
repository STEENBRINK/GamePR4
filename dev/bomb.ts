/// <reference path="gameobject.ts"/>

class Bomb extends GameObject {
    constructor(y:number, lane:number){
        super("bomb", lane, 1280, y, -8)
    }

    checkOutOfBounds():void{
        if(this.getRectangle().left < -100){
            document.body.removeChild(this.div)
        }
        super.move()
    }
}