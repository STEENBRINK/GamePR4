/// <reference path="gameobject.ts"/>

class RoadObject extends GameObject {
    constructor(element:string, lane:number, x:number, y:number, xSpeed:number=0, ySpeed:number=0){
        super(element, lane, x, y, xSpeed, ySpeed)
    }

    checkOutOfBounds():void{
        if(this.getRectangle().left < -100){
            document.body.removeChild(this.div)
        }
        super.move()
    }
}