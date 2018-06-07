class SoundPlayer {
    constructor(car:Car, name:string){
        this.playSound(name, car)
    }

    playSound(name:string, car:Car):void{
        let audio = document.createElement("audio");
        
        audio.src = "../docs/audio/" + name;
        audio.loop = false;
        audio.play();
        car.div.appendChild(audio)
    }
    
}