/// <reference path="gameobject.ts"/>

class Car extends GameObject{

    public upkey:number;
    private downkey:number;
    private onEventListener:any;

    constructor(p:HTMLElement){
        super(p, "car", 0, 100, 75);
        this.upkey = 38
        this.downkey = 40
        this.onEventListener = (e: KeyboardEvent) => this.onKeyDown(e)
        window.addEventListener("keydown", this.onEventListener)
    }

    onKeyDown(e:KeyboardEvent): void {
        switch (e.keyCode) {
            case this.upkey:
                console.log(this.lane)
                switch(this.lane){
                    case 0:
                        break
                    case 1:
                        this.y -= 235
                        this.lane--
                        break
                    case 2:
                        this.y -= 235
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
                        this.y += 235
                        this.lane++
                        break
                    case 0:
                        this.y += 235
                        this.lane++
                        break
                }
                break
        }
        
    }

    public removeMe(){
        window.removeEventListener("keydown", this.onEventListener)
        this.div.remove()
    }
}