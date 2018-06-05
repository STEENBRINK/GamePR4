/// <reference path="gameobject.ts"/>

class Bomb extends GameObject {
    constructor(x:number){
        super("bomb", 1280, x, -5)
    }

    checkOutOfBounds():void{
        if(this.getRectangle().left < -100){
            document.body.removeChild(this.div)
        }
        super.move()
    }
}