/// <reference path="gameobject.ts"/>

class RoadObject extends GameObject {
    constructor(playscreen:HTMLElement, element:string, lane:number, x:number, y:number, xSpeed:number=0, ySpeed:number=0){
        super(playscreen, element, lane, x, y, xSpeed, ySpeed)
    }

    public checkOutOfBounds():void{
        if(this.getRectangle().left < -100){
            this.div.remove()
        }
        super.move()
    }
}