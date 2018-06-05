class Game {

    private backgrounds:Array<Background>
    private bgCounter: number
    private bombCounter: number
    private car:Car
    private bombs:Array<Bomb>

    constructor() {
        this.backgrounds = new Array<Background>()
        this.backgrounds.push(new Background(0, "0"))
        this.backgrounds.push(new Background(1280, "1"))
        this.bgCounter = 2
        this.car = new Car()
        this.bombs = new Array<Bomb>()
        this.bombCounter = 0
        this.checkBomb()
        this.gameLoop()

    }
    
    private gameLoop(){
        for(let i = 0; i<(this.backgrounds.length);i++){
            if(this.backgrounds[i].getRectangle().left <= -1280){
                console.log("i: " + i)
                document.body.removeChild(this.backgrounds[i].div)
                this.backgrounds.splice(i,1)
                this.backgrounds.push(new Background(1280, this.bgCounter.toString()))
                this.bgCounter++
            }else{
                this.backgrounds[i].move();
            }
        }
        this.car.move()
        for(let k of this.bombs){
            k.checkOutOfBounds();
        }

        requestAnimationFrame(()=>this.gameLoop())
    }

    private checkBomb(): void{
        if (this.bombCounter<3) {
            this.createBomb()
        }
        setTimeout(()=> this.checkBomb(), 1500)
    }

    private createBomb(): void {
        let temp: number = Math.random()*3
        console.log(temp)
        if(temp<1){
            this.bombs.push(new Bomb(75))
        }else if (temp<2){
            this.bombs.push(new Bomb(300))
        }else{
            this.bombs.push(new Bomb(535))
        }
        this.bombCounter++
    }
}

window.addEventListener("load", () => new Game())
