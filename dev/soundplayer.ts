class SoundPlayer {
    constructor(html:HTMLElement, name:string){
        this.playSound(name, html)
    }

    playSound(name:string, html:HTMLElement):void{
        let audio = document.createElement("audio");
        
        audio.src = "../docs/audio/" + name;
        audio.loop = false;
        audio.play();
        html.appendChild(audio)
    }
    
}