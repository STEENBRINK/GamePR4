/// <reference path="roadobjects.ts"/>

class Bomb extends RoadObject {
    constructor(y:number, lane:number){
        super("bomb", lane, 1280, y, -8)
    }
}