/// <reference path="roadobjects.ts"/>

class Bomb extends RoadObject {
    constructor(p:HTMLElement, y:number, lane:number){
        super(p, "bomb", lane, 1280, y, -8)
    }
}