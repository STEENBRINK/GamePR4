class GameObject {
    protected div : HTMLElement
    protected x : number
    protected y : number
    protected speedX: number
    protected speedY: number
    protected lane:number
    
    constructor(playscreen:HTMLElement, element:string, lane:number, x:number, y:number, speedX:number=0, speedY:number=0) {
        this.div = document.createElement(element)
        playscreen.appendChild(this.div)
        
        this.lane=lane

        this.x = x
        this.y = y

        this.speedX=speedX
        this.speedY=speedY
    }
    
    public move() : void {
        this.y += this.speedY
        this.x += this.speedX

        this.draw()
    }

    public getRectangle():ClientRect {
        return this.div.getBoundingClientRect()
    }

    public getLane():number{
        return this.lane
    }

    public getDiv():HTMLElement{
        return this.div
    }

    private draw() : void {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}