class Game{
    private backgrounds:Array<Background>
    private bgCounter: number
    private gamescreen:any
    private score:number
    private modifier:number
    private scoreElement:HTMLElement
    private audioFiles:Array<string>
    private audioElement:HTMLElement
    
    constructor(){
        this.modifier = 0
        //audio
        this.audioElement = document.createElement("audio")
        document.body.appendChild(this.audioElement)
        this.audioFiles = new Array("explosion.flac", "gameover.wav", "car.wav", "heart.wav")
        let audio = new SoundPlayer(this.audioElement, this.audioFiles[2])
        //create backgrounds
        this.backgrounds = new Array<Background>()
        this.backgrounds.push(new Background(0, "0"))
        this.backgrounds.push(new Background(1280, "1"))
        this.bgCounter = 2
        //create score
        this.score = 0
        this.scoreElement = document.createElement("score")
        document.body.appendChild(this.scoreElement)
        this.scoreElement.innerHTML = ""

        this.gamescreen = new PauseScreen(this, "Welcome <br> Start Game")

        this.gameLoop()
    }

    private gameLoop():void{
        this.checkBackgrounds()

        this.gamescreen.update()

        requestAnimationFrame(()=>this.gameLoop())
    }

    private checkBackgrounds():void{
        for(let back = 0; back<(this.backgrounds.length);back++){
            if(this.backgrounds[back].getRectangle().left <= -1280){
                document.body.removeChild(this.backgrounds[back].getDiv())
                this.backgrounds.splice(back,1)
                this.backgrounds.push(new Background(1280, this.bgCounter.toString()))
                this.bgCounter++
            }else{
                this.backgrounds[back].move();
            }
        }
    }

    public getAudioFiles():Array<string>{
        return this.audioFiles
    }

    public setScore(score:number):void{
        this.score = score
        this.scoreElement.innerHTML = "Score: " + this.score + " (" + this.modifier + " bonus points!)"
    }

    public getScore():number{
        return this.score
    }

    public setModifier(modifier:number):void{
        this.modifier += modifier
    }

    public gameover():void{
        if(this.gamescreen instanceof PlayScreen){
            this.gamescreen.removeMe()
        }
        this.gamescreen = new PauseScreen(this, "Gameover <br> Try Again")
    }

    public startGame():void{
        if(this.gamescreen instanceof PauseScreen){
            this.gamescreen.removeMe()
        }
        this.gamescreen = new PlayScreen(this)
    }

    public getAudioElement():HTMLElement{
        return this.audioElement
    }

}

window.addEventListener("load", () => new Game())