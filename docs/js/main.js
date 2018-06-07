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
var GameObject = (function () {
    function GameObject(element, lane, x, y, speedX, speedY) {
        if (speedX === void 0) { speedX = 0; }
        if (speedY === void 0) { speedY = 0; }
        this.div = document.createElement(element);
        document.body.appendChild(this.div);
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
    GameObject.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    GameObject.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    return GameObject;
}());
var Background = (function (_super) {
    __extends(Background, _super);
    function Background(x, i) {
        var _this = _super.call(this, "background", 0, x, 0, -5) || this;
        _this.div.setAttribute("id", i);
        _this.y = 0;
        return _this;
    }
    return Background;
}(GameObject));
var Bomb = (function (_super) {
    __extends(Bomb, _super);
    function Bomb(y, lane) {
        return _super.call(this, "bomb", lane, 1280, y, -8) || this;
    }
    Bomb.prototype.checkOutOfBounds = function () {
        if (this.getRectangle().left < -100) {
            document.body.removeChild(this.div);
        }
        _super.prototype.move.call(this);
    };
    return Bomb;
}(GameObject));
var Car = (function (_super) {
    __extends(Car, _super);
    function Car() {
        var _this = _super.call(this, "car", 0, 100, 75) || this;
        _this.upkey = 38;
        _this.downkey = 40;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
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
    return Car;
}(GameObject));
var Explosion = (function (_super) {
    __extends(Explosion, _super);
    function Explosion(x, y, lane) {
        return _super.call(this, "explosion", lane, x, y, -3) || this;
    }
    Explosion.prototype.checkOutOfBounds = function () {
        if (this.getRectangle().left < -100) {
            document.body.removeChild(this.div);
        }
        _super.prototype.move.call(this);
    };
    return Explosion;
}(GameObject));
var Game = (function () {
    function Game() {
        this.health = 3;
        this.speed = 2000;
        this.explosions = new Array();
        this.audioFiles = new Array("DeathFlash.flac", "doh_wav_cut.wav");
        this.backgrounds = new Array();
        this.backgrounds.push(new Background(0, "0"));
        this.backgrounds.push(new Background(1280, "1"));
        this.bgCounter = 2;
        this.score = 0;
        var date = new Date();
        this.startTime = date.getTime();
        this.scoreElement = document.createElement("score");
        this.healthELement = document.createElement("health");
        document.body.appendChild(this.scoreElement);
        document.body.appendChild(this.healthELement);
        this.scoreElement.innerHTML = this.score.toString();
        this.healthELement.innerHTML = "Health: " + this.health;
        this.car = new Car();
        this.bombs = new Array();
        this.bombCounter = document.getElementsByTagName("bomb").length;
        this.checkBomb();
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        if (this.health > 0) {
            this.checkCollision();
            this.checkBackgrounds();
            this.car.move();
            for (var _i = 0, _a = this.bombs; _i < _a.length; _i++) {
                var k = _a[_i];
                k.checkOutOfBounds();
            }
            for (var _b = 0, _c = this.explosions; _b < _c.length; _b++) {
                var i = _c[_b];
                i.checkOutOfBounds();
            }
            this.registerScore();
            requestAnimationFrame(function () { return _this.gameLoop(); });
        }
        else {
            var gameOver = document.createElement("gameover");
            document.body.appendChild(gameOver);
            gameOver.addEventListener("click", function () { return location.reload(); });
            gameOver.innerHTML = "Game Over";
            setTimeout(function () {
                var audio = new SoundPlayer(_this.car, _this.audioFiles[1]);
            }, 800);
        }
    };
    Game.prototype.checkBackgrounds = function () {
        for (var back = 0; back < (this.backgrounds.length); back++) {
            if (this.backgrounds[back].getRectangle().left <= -1280) {
                document.body.removeChild(this.backgrounds[back].div);
                this.backgrounds.splice(back, 1);
                this.backgrounds.push(new Background(1280, this.bgCounter.toString()));
                this.bgCounter++;
            }
            else {
                this.backgrounds[back].move();
            }
        }
    };
    Game.prototype.checkBomb = function () {
        var _this = this;
        if (this.bombCounter < 15 && this.health > 0) {
            this.createBomb();
        }
        setTimeout(function () { return _this.checkBomb(); }, this.speed);
    };
    Game.prototype.createBomb = function () {
        var temp = Math.random() * 3;
        console.log(temp);
        if (temp < 1) {
            this.bombs.push(new Bomb(75, 0));
        }
        else if (temp < 2) {
            this.bombs.push(new Bomb(300, 1));
        }
        else {
            this.bombs.push(new Bomb(535, 2));
        }
        this.bombCounter = document.getElementsByTagName("bomb").length;
    };
    Game.prototype.registerScore = function () {
        var time = new Date().getTime();
        this.score = time - this.startTime;
        this.scoreElement.innerHTML = "Score: " + this.score;
        this.speed = 2000 - (this.score / 1000);
    };
    Game.prototype.checkCollision = function () {
        for (var _i = 0, _a = this.bombs; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.lane == this.car.lane) {
                if ((i.getRectangle().left < (this.car.getRectangle().left + this.car.getRectangle().width)) && ((i.getRectangle().left) > this.car.getRectangle().left)) {
                    this.explosions.push(new Explosion(i.x, i.y, i.lane));
                    document.body.removeChild(i.div);
                    var audio = new SoundPlayer(this.car, this.audioFiles[0]);
                    this.health--;
                    this.healthELement.innerHTML = "Health: " + this.health;
                }
            }
        }
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var SoundPlayer = (function () {
    function SoundPlayer(car, name) {
        this.playSound(name, car);
    }
    SoundPlayer.prototype.playSound = function (name, car) {
        var audio = document.createElement("audio");
        audio.src = "../docs/audio/" + name;
        audio.loop = false;
        audio.play();
        car.div.appendChild(audio);
    };
    return SoundPlayer;
}());
//# sourceMappingURL=main.js.map