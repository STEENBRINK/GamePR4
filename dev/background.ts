/// <reference path="gameobject.ts"/>

class Background extends GameObject {
    constructor(x:number, i:string){
        super("background", x, 0, -5);
        this.div.setAttribute("id", i)
        this.y = 0
    }
}