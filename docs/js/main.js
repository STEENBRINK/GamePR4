var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Background = (function () {
    function Background(x, i) {
        this.div = document.createElement("background");
        document.body.appendChild(this.div);
        this.x = x;
        this.y = 0;
        this.speedX = -5;
        this.div.setAttribute("id", i);
        this.y = 0;
    }
    Background.prototype.move = function () {
        this.x += this.speedX;
        this.draw();
    };
    Background.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Background.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Background.prototype.getDiv = function () {
        return this.div;
    };
    return Background;
}());
var GameObject = (function () {
    function GameObject(playscreen, element, lane, x, y, speedX, speedY) {
        if (speedX === void 0) { speedX = 0; }
        if (speedY === void 0) { speedY = 0; }
        this.div = document.createElement(element);
        playscreen.appendChild(this.div);
        this.lane = lane;
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
    }
    GameObject.prototype.move = function () {
        this.y += this.speedY;
        this.x += this.speedX;
        this.draw();
    };
    GameObject.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    GameObject.prototype.getLane = function () {
        return this.lane;
    };
    GameObject.prototype.getDiv = function () {
        return this.div;
    };
    GameObject.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return GameObject;
}());
var RoadObject = (function (_super) {
    __extends(RoadObject, _super);
    function RoadObject(playscreen, element, lane, x, y, xSpeed, ySpeed) {
        if (xSpeed === void 0) { xSpeed = 0; }
        if (ySpeed === void 0) { ySpeed = 0; }
        return _super.call(this, playscreen, element, lane, x, y, xSpeed, ySpeed) || this;
    }
    RoadObject.prototype.checkOutOfBounds = function () {
        if (this.getRectangle().left < -100) {
            this.div.remove();
        }
        _super.prototype.move.call(this);
    };
    return RoadObject;
}(GameObject));
var Bomb = (function (_super) {
    __extends(Bomb, _super);
    function Bomb(p, y, lane) {
        return _super.call(this, p, "bomb", lane, 1280, y, -8) || this;
    }
    return Bomb;
}(RoadObject));
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(p) {
        var _this = _super.call(this, p, "car", 0, 100, 75) || this;
        _this.upkey = 38;
        _this.downkey = 40;
        _this.onEventListener = function (e) { return _this.onKeyDown(e); };
        window.addEventListener("keydown", _this.onEventListener);
        return _this;
    }
    Car.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                console.log(this.lane);
                switch (this.lane) {
                    case 0:
                        break;
                    case 1:
                        this.y -= 235;
                        this.lane--;
                        break;
                    case 2:
                        this.y -= 235;
                        this.lane--;
                        break;
                }
                break;
            case this.downkey:
                switch (this.lane) {
                    case 2:
                        break;
                    case 1:
                        this.y += 235;
                        this.lane++;
                        break;
                    case 0:
                        this.y += 235;
                        this.lane++;
                        break;
                }
                break;
        }
    };
    Car.prototype.removeMe = function () {
        window.removeEventListener("keydown", this.onEventListener);
        this.div.remove();
    };
    return Car;
}(GameObject));
var Explosion = (function (_super) {
    __extends(Explosion, _super);
    function Explosion(p, x, y, lane) {
        return _super.call(this, p, "explosion", lane, x, y, -3) || this;
    }
    return Explosion;
}(RoadObject));
var Game = (function () {
    function Game() {
        this.modifier = 0;
        this.audioElement = document.createElement("audio");
        document.body.appendChild(this.audioElement);
        this.audioFiles = new Array("explosion.flac", "gameover.wav", "car.wav", "heart.wav");
        var audio = new SoundPlayer(this.audioElement, this.audioFiles[2]);
        this.backgrounds = new Array();
        this.backgrounds.push(new Background(0, "0"));
        this.backgrounds.push(new Background(1280, "1"));
        this.bgCounter = 2;
        this.score = 0;
        this.scoreElement = document.createElement("score");
        document.body.appendChild(this.scoreElement);
        this.scoreElement.innerHTML = "";
        this.gamescreen = new PauseScreen(this, "Welcome <br> Start Game");
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.checkBackgrounds();
        this.gamescreen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.checkBackgrounds = function () {
        for (var back = 0; back < (this.backgrounds.length); back++) {
            if (this.backgrounds[back].getRectangle().left <= -1280) {
                document.body.removeChild(this.backgrounds[back].getDiv());
                this.backgrounds.splice(back, 1);
                this.backgrounds.push(new Background(1280, this.bgCounter.toString()));
                this.bgCounter++;
            }
            else {
                this.backgrounds[back].move();
            }
        }
    };
    Game.prototype.getAudioFiles = function () {
        return this.audioFiles;
    };
    Game.prototype.setScore = function (score) {
        this.score = score;
        this.scoreElement.innerHTML = "Score: " + this.score + " (" + this.modifier + " bonus points!)";
    };
    Game.prototype.getScore = function () {
        return this.score;
    };
    Game.prototype.setModifier = function (modifier) {
        this.modifier += modifier;
    };
    Game.prototype.gameover = function () {
        if (this.gamescreen instanceof PlayScreen) {
            this.gamescreen.removeMe();
        }
        this.gamescreen = new PauseScreen(this, "Gameover <br> Try Again");
    };
    Game.prototype.startGame = function () {
        if (this.gamescreen instanceof PauseScreen) {
            this.gamescreen.removeMe();
        }
        this.gamescreen = new PlayScreen(this);
    };
    Game.prototype.getAudioElement = function () {
        return this.audioElement;
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Heart = (function (_super) {
    __extends(Heart, _super);
    function Heart(p, y, lane) {
        return _super.call(this, p, "heart", lane, 1280, y, -8) || this;
    }
    return Heart;
}(RoadObject));
var PauseScreen = (function () {
    function PauseScreen(g, text) {
        this.div = document.createElement("pausescreen");
        document.body.appendChild(this.div);
        this.div.innerHTML = text;
        this.div.style.top = (350) + "px";
        this.div.style.left = (640 - this.getRectangle().width / 2) + "px";
        this.onEventListener = (function () { return (g.startGame()); });
        this.div.addEventListener("click", this.onEventListener);
    }
    PauseScreen.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    PauseScreen.prototype.update = function () {
    };
    PauseScreen.prototype.removeMe = function () {
        this.div.removeEventListener("click", this.onEventListener);
        this.div.remove();
    };
    return PauseScreen;
}());
var PlayScreen = (function () {
    function PlayScreen(game) {
        this.screenElement = document.createElement("playscreen");
        document.body.appendChild(this.screenElement);
        this.game = game;
        this.health = 3;
        this.speed = 2000;
        this.scoreModifier = 0;
        this.explosions = new Array();
        var date = new Date();
        this.startTime = date.getTime();
        this.healthELement = document.createElement("health");
        this.screenElement.appendChild(this.healthELement);
        this.healthELement.innerHTML = "Health: " + this.health;
        this.car = new Car(this.screenElement);
        this.bombs = new Array();
        this.bombCounter = document.getElementsByTagName("bomb").length;
        this.checkBomb();
        this.createHeart();
    }
    PlayScreen.prototype.update = function () {
        if (this.health > 0) {
            this.checkBombCollision();
            this.car.move();
            for (var _i = 0, _a = this.bombs; _i < _a.length; _i++) {
                var k = _a[_i];
                k.checkOutOfBounds();
            }
            for (var _b = 0, _c = this.explosions; _b < _c.length; _b++) {
                var explosion = _c[_b];
                explosion.checkOutOfBounds();
            }
            this.registerScore();
            if (this.heart) {
                this.checkHeartCollision();
                this.heart.checkOutOfBounds();
            }
        }
        else {
            for (var _d = 0, _e = this.bombs; _d < _e.length; _d++) {
                var bomb = _e[_d];
                bomb.getDiv().remove();
                this.bombs.splice(this.bombs.indexOf(bomb), 1);
            }
            this.heart.getDiv().remove();
            this.car.removeMe();
            var audio = new SoundPlayer(this.game.getAudioElement(), this.game.getAudioFiles()[1]);
            this.game.gameover();
        }
    };
    PlayScreen.prototype.createHeart = function () {
        var _this = this;
        if (this.health > 0) {
            var temp = Math.random() * 3;
            if (temp < 1) {
                this.heart = new Heart(this.screenElement, 75, 0);
            }
            else if (temp < 2) {
                this.heart = new Heart(this.screenElement, 300, 1);
            }
            else {
                this.heart = new Heart(this.screenElement, 535, 2);
            }
            setTimeout(function () { return _this.createHeart(); }, 20000);
        }
    };
    PlayScreen.prototype.checkBomb = function () {
        var _this = this;
        if (this.bombCounter < 15 && this.health > 0) {
            this.createBomb();
        }
        setTimeout(function () { return _this.checkBomb(); }, this.speed);
    };
    PlayScreen.prototype.createBomb = function () {
        var temp = Math.random() * 3;
        if (temp < 1) {
            this.bombs.push(new Bomb(this.screenElement, 75, 0));
        }
        else if (temp < 2) {
            this.bombs.push(new Bomb(this.screenElement, 300, 1));
        }
        else {
            this.bombs.push(new Bomb(this.screenElement, 535, 2));
        }
        this.bombCounter = document.getElementsByTagName("bomb").length;
    };
    PlayScreen.prototype.registerScore = function () {
        var time = new Date().getTime();
        this.game.setScore(time - this.startTime + this.scoreModifier);
        var modifier;
        if (this.scoreModifier < 0) {
            modifier = " - " + (this.scoreModifier * -1);
        }
        else {
            modifier = " + " + this.scoreModifier;
        }
        this.speed = 2000 - (this.game.getScore() / 1000);
    };
    PlayScreen.prototype.checkBombCollision = function () {
        for (var _i = 0, _a = this.bombs; _i < _a.length; _i++) {
            var bomb = _a[_i];
            if (bomb.getLane() == this.car.getLane()) {
                if ((bomb.getRectangle().left < (this.car.getRectangle().left + this.car.getRectangle().width)) && ((bomb.getRectangle().left) > this.car.getRectangle().left)) {
                    this.explosions.push(new Explosion(this.screenElement, bomb.getRectangle().left, bomb.getRectangle().top, bomb.getLane()));
                    bomb.getDiv().remove();
                    this.bombs.splice(this.bombs.indexOf(bomb), 1);
                    var audio = new SoundPlayer(this.game.getAudioElement(), this.game.getAudioFiles()[0]);
                    this.health--;
                    this.healthELement.innerHTML = "Health: " + this.health;
                    this.scoreModifier -= 3000;
                    this.game.setModifier(-3000);
                }
            }
        }
    };
    PlayScreen.prototype.checkHeartCollision = function () {
        if (this.heart.getLane() == this.car.getLane() && this.health > 0) {
            if ((this.heart.getRectangle().left < (this.car.getRectangle().left + this.car.getRectangle().width)) && ((this.heart.getRectangle().left) > this.car.getRectangle().left)) {
                this.heart.getDiv().remove();
                var audio = new SoundPlayer(this.game.getAudioElement(), this.game.getAudioFiles()[3]);
                this.health++;
                this.healthELement.innerHTML = "Health: " + this.health;
                this.scoreModifier += 5000;
                this.game.setModifier(5000);
            }
        }
    };
    PlayScreen.prototype.removeMe = function () {
        this.screenElement.remove();
    };
    return PlayScreen;
}());
var SoundPlayer = (function () {
    function SoundPlayer(html, name) {
        var audio = document.createElement("audio");
        audio.src = "../docs/audio/" + name;
        audio.loop = false;
        audio.play();
        html.appendChild(audio);
    }
    return SoundPlayer;
}());
//# sourceMappingURL=main.js.map