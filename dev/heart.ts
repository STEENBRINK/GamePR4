/// <reference path="roadobjects.ts"/>

class Heart extends RoadObject{
    constructor(y:number, lane:number){
        super("heart", lane, 1280, y, -8)
    }
}