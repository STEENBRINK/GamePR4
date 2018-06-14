class PlayScreen {

    private screenElement:HTMLElement
    private bombCounter: number
    private car:Car
    private bombs:Array<Bomb>
    private explosions:Array<Explosion>
    private healthELement:HTMLElement
    private speed:number
    private health:number
    private heart:Heart
    private scoreModifier:number
    private game:Game
    private startTime:number

    constructor(game:Game) {
        this.screenElement = document.createElement("playscreen")
        document.body.appendChild(this.screenElement)
        this.game = game
        this.health=3
        this.speed = 2000
        this.scoreModifier = 0
        this.explosions = new Array<Explosion>()
        let date = new Date()
        this.startTime = date.getTime()
        //create score element
        this.healthELement = document.createElement("health")
        this.screenElement.appendChild(this.healthELement)
        this.healthELement.innerHTML = "Health: " + this.health
        //create car
        this.car = new Car(this.screenElement)
        //create bombs
        this.bombs = new Array<Bomb>()
        this.bombCounter = document.getElementsByTagName("bomb").length
        this.checkBomb()
        this.createHeart()
    }
    
    private update(){
        //console.log(this.health)
        if(this.health>0){
            this.checkBombCollision()
            this.car.move()
            for(let k of this.bombs){
                k.checkOutOfBounds();
            }
            for(let explosion of this.explosions){
                explosion.checkOutOfBounds();
            }
            this.registerScore()

            if(this.heart){
                this.checkHeartCollision()
                this.heart.checkOutOfBounds()
            }

        }else{
            for(let bomb of this.bombs){
                bomb.getDiv().remove()
                this.bombs.splice(this.bombs.indexOf(bomb), 1)
            }
            this.heart.getDiv().remove()
            this.car.removeMe()
            let audio = new SoundPlayer(this.game.getAudioElement(), this.game.getAudioFiles()[1])
            this.game.gameover()
                    
        }
    }

    private createHeart():void{
        if(this.health > 0){
            let temp: number = Math.random()*3
            //console.log(temp)
            if(temp<1){
                this.heart = new Heart(this.screenElement, 75, 0)
            }else if (temp<2){
                this.heart = new Heart(this.screenElement, 300, 1)
            }else{
                this.heart = new Heart(this.screenElement, 535, 2)
            }
            setTimeout(()=>this.createHeart(), 20000)
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
        //console.log(temp)
        if(temp<1){
            this.bombs.push(new Bomb(this.screenElement, 75, 0))
        }else if (temp<2){
            this.bombs.push(new Bomb(this.screenElement, 300, 1))
        }else{
            this.bombs.push(new Bomb(this.screenElement, 535, 2))
        }
        this.bombCounter = document.getElementsByTagName("bomb").length
    }

    private registerScore():void{
        let time:number = new Date().getTime()
        this.game.setScore(time-this.startTime+this.scoreModifier)
        //console.log(this.score)
        let modifier:string
        if(this.scoreModifier < 0){
            modifier = " - " + (this.scoreModifier*-1)
        }else{
            modifier = " + " + this.scoreModifier
        }
        this.speed = 2000-(this.game.getScore()/1000)
    }

    private checkBombCollision():void {
        for(let bomb of this.bombs){
            if(bomb.getLane() == this.car.getLane()){
                if((bomb.getRectangle().left < (this.car.getRectangle().left+this.car.getRectangle().width))&&((bomb.getRectangle().left) > this.car.getRectangle().left)){
                    this.explosions.push(new Explosion(this.screenElement, bomb.getRectangle().left, bomb.getRectangle().top, bomb.getLane()))
                    bomb.getDiv().remove()
                    this.bombs.splice(this.bombs.indexOf(bomb), 1);
                    let audio = new SoundPlayer(this.game.getAudioElement(), this.game.getAudioFiles()[0])
                    this.health--
                    this.healthELement.innerHTML = "Health: " + this.health
                    this.scoreModifier -= 3000
                    this.game.setModifier(-3000)
                }
            }
        }
    }
    
    private checkHeartCollision():void {
        if(this.heart.getLane() == this.car.getLane() && this.health > 0){
            if((this.heart.getRectangle().left < (this.car.getRectangle().left+this.car.getRectangle().width))&&((this.heart.getRectangle().left) > this.car.getRectangle().left)){
                this.heart.getDiv().remove()
                let audio = new SoundPlayer(this.game.getAudioElement(), this.game.getAudioFiles()[3])
                this.health++
                this.healthELement.innerHTML = "Health: " + this.health
                this.scoreModifier += 5000
                this.game.setModifier(5000)
            }
        }
    }

    public removeMe():void{
        this.screenElement.remove()
    }

}
