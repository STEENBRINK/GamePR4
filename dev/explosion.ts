/// <reference path="gameobject.ts"/>

class Explosion extends GameObject {
    constructor(x: number, y:number, lane:number){
        super("explosion", lane, x, y, -3)
    }

    checkOutOfBounds():void{
        if(this.getRectangle().left < -100){
            document.body.removeChild(this.div)
        }
        super.move()
    }
}