class Game {

    private backgrounds:Array<Background>
    private bgCounter: number
    private bombCounter: number
    private car:Car
    private bombs:Array<Bomb>
    private explosions:Array<Explosion>
    private score:number
    private startTime:number
    private scoreElement:HTMLElement
    private healthELement:HTMLElement
    private speed:number
    private health:number

    constructor() {
        this.health=3
        this.speed = 2000
        this.explosions = new Array<Explosion>()
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
        this.healthELement = document.createElement("health")
        document.body.appendChild(this.scoreElement)
        document.body.appendChild(this.healthELement)
        this.scoreElement.innerHTML = this.score.toString()
        this.healthELement.innerHTML = "Health: " + this.health
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
        //console.log(this.health)
        if(this.health>0){
            this.checkCollision()
            this.checkBackgrounds()
            this.car.move()
            for(let k of this.bombs){
                k.checkOutOfBounds();
            }
            for(let i of this.explosions){
                i.checkOutOfBounds();
            }
            this.registerScore()

            requestAnimationFrame(()=>this.gameLoop())
        }else{
            let gameOver:HTMLElement = document.createElement("gameover")
            document.body.appendChild(gameOver)
            gameOver.addEventListener("click", ()=> location.reload())
            gameOver.innerHTML = "Game Over"
            setTimeout(this.dohSound(), 500)
        }
    }

    private checkBackgrounds():void{
        for(let back = 0; back<(this.backgrounds.length);back++){
            if(this.backgrounds[back].getRectangle().left <= -1280){
                document.body.removeChild(this.backgrounds[back].div)
                this.backgrounds.splice(back,1)
                this.backgrounds.push(new Background(1280, this.bgCounter.toString()))
                this.bgCounter++
            }else{
                this.backgrounds[back].move();
            }
        }
    }

    private checkBomb(): void{
        if (this.bombCounter<15 && this.health > 0) {
            this.createBomb()
        }
        setTimeout(()=> this.checkBomb(), this.speed)
    }

    private createBomb(): void {
        let temp: number = Math.random()*3
        console.log(temp)
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
        this.scoreElement.innerHTML = "Score: " + this.score

        this.speed = 2000-(this.score/1000)
    }

    checkCollision():void {
        for(let i of this.bombs){
            if(i.lane == this.car.lane){
                if((i.getRectangle().left < (this.car.getRectangle().left+this.car.getRectangle().width))&&((i.getRectangle().left) > this.car.getRectangle().left)){
                    this.explosions.push(new Explosion(i.x, i.y, i.lane))
                    document.body.removeChild(i.div)
                    this.explosionSound()
                    this.health--
                    this.healthELement.innerHTML = "Health: " + this.health
                }
            }
        }
    }

    explosionSound():void{
        let audio = document.createElement("audio");
        
        audio.src = "../docs/audio/DeathFlash.flac";
        audio.loop = false;
        audio.play();
        this.car.div.appendChild(audio)
    }

    dohSound():void{
        let audio = document.createElement("audio");
        
        audio.src = "../docs/audio/doh_wav_cut.wav";
        audio.loop = false;
        audio.play();
        this.car.div.appendChild(audio)
    }
}
window.addEventListener("load", () => new Game())
