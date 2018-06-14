/// <reference path="gameobject.ts"/>

class Explosion extends RoadObject {
    constructor(p:HTMLElement, x: number, y:number, lane:number){
        super(p, "explosion", lane, x, y, -3)
    }
}