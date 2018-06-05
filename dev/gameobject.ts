class GameObject {
    public div : HTMLElement
    public x : number
    public y : number
    public speedX: number
    protected speedY: number
    public lane:number
    
    constructor(element:string, lane:number, x:number, y:number, speedX:number=0, speedY:number=0) {
        this.div = document.createElement(element)
        document.body.appendChild(this.div)
        
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

    protected draw() : void {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    public getRectangle() {
        return this.div.getBoundingClientRect()
    }
}