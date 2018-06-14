class SoundPlayer {
    constructor(html:HTMLElement, name:string){
        let audio = document.createElement("audio");
        
        audio.src = "../docs/audio/" + name;
        audio.loop = false;
        audio.play();
        html.appendChild(audio)
    }
    
}