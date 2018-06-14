
class Background {
    private div : HTMLElement
    private x : number
    private y : number
    private speedX: number

    constructor(x:number, i:string){
        this.div = document.createElement("background")
        document.body.appendChild(this.div)

        this.x = x
        this.y = 0
        this.speedX = -5
        this.div.setAttribute("id", i)
        this.y = 0
    }
    
    public move() : void {
        this.x += this.speedX

        this.draw()
    }

    private draw() : void {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    public getRectangle():ClientRect {
        return this.div.getBoundingClientRect()
    }

    public getDiv():HTMLElement{
        return this.div
    }
}