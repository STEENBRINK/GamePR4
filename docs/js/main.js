"use strict";
var Car = (function () {
    function Car() {
        console.log("vroom!");
    }
    return Car;
}());
var Game = (function () {
    function Game() {
        console.log("new game created!");
        var c = new Car();
    }
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
//# sourceMappingURL=main.js.map