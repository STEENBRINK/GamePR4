/// <reference path="gameobject.ts"/>

class Car extends GameObject{

    private upkey:number;
    private downkey:number;
    public lane: number;
    public prevLane: number;

    constructor(){
        super("car", 100, 75);
        this.lane = 0;
        this.prevLane = 0;
        this.upkey = 38
        this.downkey = 40

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
    }

    onKeyDown(e:KeyboardEvent): void {
        switch (e.keyCode) {
            case this.upkey:
                //console.log("up")
                switch(this.lane){
                    case 0:
                        break
                    case 1:
                        this.lane--
                        break
                    case 2:
                        this.lane--
                        break
                }
                break
            case this.downkey:
                //console.log("down")
                switch(this.lane){
                    case 2:
                        break
                    case 1:
                        this.lane++
                        break
                    case 0:
                        this.lane++
                        break
                }
                break
        }
        this.moveCar()
    }

    moveCar(): void {
        switch(this.lane){
            case(0):
                if(!(this.prevLane == 0)){
                    this.y = 75
                }
                break
            case(1):
                if(!(this.prevLane == 1)){
                    this.y = 300
                }
            break
            case(2):
                if(!(this.prevLane == 1)){
                    this.y = 535
                }
                break
        }
        this.prevLane = this.lane
    }
}