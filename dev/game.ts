class Game {

    private backgrounds:Array<Background>
    private bgCounter: number
    private bombCounter: number
    private car:Car
    private bombs:Array<Bomb>
    private score:number
    private startTime:number
    private scoreElement:HTMLElement
    private speed:number

    constructor() {
        this.speed = 2000
        //create backgrounds
        this.backgrounds = new Array<Background>()
        this.backgrounds.push(new Background(0, "0"))
        this.backgrounds.push(new Background(1280, "1"))
        this.bgCounter = 2
        //create score element
        this.score = 0
        let date = new Date()
        this.startTime = date.getTime()
        this.scoreElement = document.createElement("score")
        document.body.appendChild(this.scoreElement)
        this.scoreElement.innerHTML = this.score.toString()
        //create car
        this.car = new Car()
        //create bombs
        this.bombs = new Array<Bomb>()
        this.bombCounter = document.getElementsByTagName("bomb").length
        this.checkBomb()
        //initiate game loop
        this.gameLoop()
    }
    
    private gameLoop(){
        this.checkCollision()
        for(let i = 0; i<(this.backgrounds.length);i++){
            if(this.backgrounds[i].getRectangle().left <= -1280){
                //console.log("i: " + i)
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
        this.registerScore()

        requestAnimationFrame(()=>this.gameLoop())
    }

    private checkBomb(): void{
        if (this.bombCounter<15) {
            this.createBomb()
        }
        setTimeout(()=> this.checkBomb(), this.speed)
    }

    private createBomb(): void {
        let temp: number = Math.random()*3
        //console.log(temp)
        if(temp<1){
            this.bombs.push(new Bomb(75, 0))
        }else if (temp<2){
            this.bombs.push(new Bomb(300, 1))
        }else{
            this.bombs.push(new Bomb(535, 2))
        }
        this.bombCounter = document.getElementsByTagName("bomb").length
    }

    registerScore(){
        let time:number = new Date().getTime()
        this.score=time-this.startTime
        //console.log(this.score)
        this.scoreElement.innerHTML = this.score.toString()

        this.speed = 2000-(this.score/1000)
    }

    checkCollision():void {
        for(let i of this.bombs){
            if(i.lane == this.car.lane){
                if((i.getRectangle().left < (this.car.getRectangle().left+this.car.getRectangle().width))&&((i.getRectangle().left) > this.car.getRectangle().left)){
                    i.div.style.backgroundImage = "url(../images/explosion.png)"
                }
            }
        }
    }
}

window.addEventListener("load", () => new Game())
