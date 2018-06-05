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
    function GameObject(element, x, y, speedX, speedY) {
        if (speedX === void 0) { speedX = 0; }
        if (speedY === void 0) { speedY = 0; }
        this.div = document.createElement(element);
        document.body.appendChild(this.div);
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
        var _this = _super.call(this, "background", x, 0, -5) || this;
        _this.div.setAttribute("id", i);
        _this.y = 0;
        return _this;
    }
    return Background;
}(GameObject));
var Bomb = (function (_super) {
    __extends(Bomb, _super);
    function Bomb(x) {
        return _super.call(this, "bomb", 1280, x, -5) || this;
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
        var _this = _super.call(this, "car", 100, 75) || this;
        _this.lane = 0;
        _this.prevLane = 0;
        _this.upkey = 38;
        _this.downkey = 40;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        return _this;
    }
    Car.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                switch (this.lane) {
                    case 0:
                        break;
                    case 1:
                        this.lane--;
                        break;
                    case 2:
                        this.lane--;
                        break;
                }
                break;
            case this.downkey:
                switch (this.lane) {
                    case 2:
                        break;
                    case 1:
                        this.lane++;
                        break;
                    case 0:
                        this.lane++;
                        break;
                }
                break;
        }
        this.moveCar();
    };
    Car.prototype.moveCar = function () {
        switch (this.lane) {
            case (0):
                if (!(this.prevLane == 0)) {
                    this.y = 75;
                }
                break;
            case (1):
                if (!(this.prevLane == 1)) {
                    this.y = 300;
                }
                break;
            case (2):
                if (!(this.prevLane == 1)) {
                    this.y = 535;
                }
                break;
        }
        this.prevLane = this.lane;
    };
    return Car;
}(GameObject));
var Game = (function () {
    function Game() {
        this.backgrounds = new Array();
        this.backgrounds.push(new Background(0, "0"));
        this.backgrounds.push(new Background(1280, "1"));
        this.bgCounter = 2;
        this.car = new Car();
        this.bombs = new Array();
        this.bombCounter = 0;
        this.checkBomb();
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        for (var i = 0; i < (this.backgrounds.length); i++) {
            if (this.backgrounds[i].getRectangle().left <= -1280) {
                console.log("i: " + i);
                document.body.removeChild(this.backgrounds[i].div);
                this.backgrounds.splice(i, 1);
                this.backgrounds.push(new Background(1280, this.bgCounter.toString()));
                this.bgCounter++;
            }
            else {
                this.backgrounds[i].move();
            }
        }
        this.car.move();
        for (var _i = 0, _a = this.bombs; _i < _a.length; _i++) {
            var k = _a[_i];
            k.checkOutOfBounds();
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.checkBomb = function () {
        var _this = this;
        if (this.bombCounter < 3) {
            this.createBomb();
        }
        setTimeout(function () { return _this.checkBomb(); }, 1500);
    };
    Game.prototype.createBomb = function () {
        var temp = Math.random() * 3;
        console.log(temp);
        if (temp < 1) {
            this.bombs.push(new Bomb(75));
        }
        else if (temp < 2) {
            this.bombs.push(new Bomb(300));
        }
        else {
            this.bombs.push(new Bomb(535));
        }
        this.bombCounter++;
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
//# sourceMappingURL=main.js.map