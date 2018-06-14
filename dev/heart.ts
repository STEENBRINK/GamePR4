/// <reference path="roadobjects.ts"/>

class Heart extends RoadObject{
    constructor(p: HTMLElement, y:number, lane:number){
        super(p, "heart", lane, 1280, y, -8)
    }

    
}