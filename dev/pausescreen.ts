class PauseScreen{
    
    private div:HTMLElement
    private onEventListener:any

    constructor(g:Game, text:string){
        this.div = document.createElement("pausescreen")
        document.body.appendChild(this.div)
        this.div.innerHTML = text
        this.div.style.top = (350) + "px"
        this.div.style.left = (640 - this.getRectangle().width/2) + "px"
        this.onEventListener = (()=>(g.startGame()))
        this.div.addEventListener("click", this.onEventListener)
    }

    public getRectangle() {
        return this.div.getBoundingClientRect()
    }

    public update():void{

    }

    public removeMe():void{
        this.div.removeEventListener("click", this.onEventListener)
        this.div.remove()
    }
}