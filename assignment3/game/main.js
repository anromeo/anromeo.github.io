
function Background(game, image) {
    NonLivingEntity.call(this, game, 0, 400);
    this.radius = 200;
    NonLivingEntity.prototype.setImage(image);
    this.image = image;
}

Background.prototype = new NonLivingEntity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
    
}

Background.prototype.draw = function (ctx) {
     NonLivingEntity.prototype.draw.call(this, ctx);
}

// function Man(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 79, 87, 0.05, 6, true, false); 
//     //this.spriteSheet = this.rotateAndCache((ASSET_MANAGER.getAsset("./img/man.png")), 90);
//    // this.animation = new Animation(spritesheet, 80, 80, 0.05, 1, true, false);
//     this.x = 0;
//     this.y = 0;
//     this.game = game;
//     this.ctx = game.ctx;
// }

// Man.prototype = new Entity();
// Man.prototype.constructor = Man;

// Man.prototype.update = function() {
//     this.x += 2;
// }


// Man.prototype.draw = function () {
//     console.log("drawing");
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
// }

// the "main" code begins here

// var ASSET_MANAGER = new AssetManager();

// ASSET_MANAGER.queueDownload("./img/RobotUnicorn.png");
// ASSET_MANAGER.queueDownload("./img/man2.png");


/** From 435 */

ASSET_MANAGER.queueDownload("./images/demon.png");
ASSET_MANAGER.queueDownload("./images/demon-attacking.png");
ASSET_MANAGER.queueDownload("./images/demon-dying.png");
ASSET_MANAGER.queueDownload("./images/background.jpg");

function convertToZombie(data, game) {
    var zom = new Zombie(game);
    zom.angle = data['angle'];
    zom.attackAnimation = data['attackAnimation'];
    zom.color = data['color'];
    zom.constructor = data['constructor'];
    zom.ctx = data['ctx'];
    zom.currentAction = data['currentAction'];
    zom.deathAnimation = data['deathAnimation'];
    zom.deathTimer = data['deathTimer'];
    zom.directionX = data['directionX'];
    zom.directionY = data['directionY'];
    zom.getX = data['getX'];
    zom.getY = data['getY'];
    zom.grow = data['grow'];
    zom.growtime = data['growtime'];
    zom.halo = data['halo'];
    zom.health = data['health'];
    zom.length = data['length'];
    zom.locationX = data['locationX'];
    zom.locationY = data['locationY'];
    zom.maxHealth = data['maxHealth'];
    zom.maxSpeed = data['maxSpeed'];
    zom.pointerX = data['pointerX'];
    zom.pointerY = data['pointerY'];
    zom.radius = data['raidus'];
    zom.speed = data['speed'];
    zom.strength = data['strength'];
    zom.x = data['x'];
    zom.y = data['y'];
    return zom;
}

window.onload = function () {

    ASSET_MANAGER.downloadAll(function () {

        var gameEngine;

        var canvas = document.getElementById('gameWorld');
        var ctx = canvas.getContext('2d');

        //var numZombies = 2;
        //var numRocks = 12;

        gameEngine = new GameEngine();

        var background = new Background(gameEngine, ASSET_MANAGER.getAsset("./images/background.jpg"));
        gameEngine.addEntity(background);

        var numZombies = 40;
        for (var i = 0; i < numZombies; i++) {
            gameEngine.addEntity(new Zombie(gameEngine));
        }

        gameEngine.init(ctx);
        gameEngine.start();

        // var db = require("mongojs").connect(dbURL, collections);

        var socket = io.connect("http://76.28.150.193:8888");

        socket.emit("load", { studentname: "Tony Zullo", statename: "awesomeState123"});

        var saveButton = document.getElementById("save");

        var loadButton = document.getElementById("load");

        var testing;

        socket.on("load", function (data) {
            testing = data;
        });

        // var socket2 = io("http://76.28.150.193:8888", { query: "foo=bar" });
        // socket2.on("connect", function (check) {
        //     console.log("Socket connected.")
        // });


        saveButton.addEventListener("click", function(){
            if (gameEngine.isPaused) {
                this.textContent = "Save";
                for(var i = 0; i < gameEngine.entities.length; i++) {
                    var zom = gameEngine.entities[i];
                    zom.game = gameEngine;

                }
                gameEngine.isPaused = false;
            } else {
                var objectToSend = [];
                for(var i = 0; i < gameEngine.entities.length; i++) {
                    var zom = gameEngine.entities[i];
                    if (zom.name !== "NonLiving") {
                        var zombie = [];
                        for (key in zom) {
                            if (key != "game" && key != "target") {
                                zombie[key] = zom[key];
                            }
                        }
                        zom.game = null;
                        if (zom.target) {
                            zom.target.game = null;
                            zom.target.target = null;
                        }
                        objectToSend.push(zom);

                    }
                }
                socket.emit("save", { studentname: "Tony Zullo", statename: "awesomeState123", data: objectToSend });
                socket.emit("load", { studentname: "Tony Zullo", statename: "awesomeState123"});

                this.textContent = "Play";
                gameEngine.isPaused = true;
            }
        });

        loadButton.addEventListener("click", function(){
            // if (gameEngine.isPaused) {
                for(var i = 0; i < gameEngine.entities.length; i++) {
                    if (gameEngine.entities[i].name == "Zombie") {
                        gameEngine.entities[i].removeFromWorld = true;
                    }
                }
                gameEngine.update();
//                console.log(testing.data);
                for(var i = 0; i < testing.data.length; i++) {
                    var zom = testing.data[i];
                    zom.game = gameEngine;
                    gameEngine.addEntity(new Zombie(gameEngine, zom));
                }
                // // console.log(gameEngine);
                gameEngine.isPaused = false;
            // }
        });

        // socket.on("ping", function (ping) {
        //     console.log(ping);
        //     socket.emit("pong");
        // });

        // socket.on('sync', function (data) {
        //     console.log(data.length +" messages synced.");
        //     messages = data;
        //     var html = '';
        //     for (var i = 0; i < messages.length; i++) {
        //         html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
        //         html += messages[i].message + '<br />';
        //     }
        //     content.innerHTML = html;
        //     content.scrollTop = content.scrollHeight;
        // });

        // socket.on('message', function (data) {
        //     if (data.message) {
        //         messages.push(data);
        //         var html = '';
        //         for (var i = 0; i < messages.length; i++) {
        //             html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
        //             html += messages[i].message + '<br />';
        //         }
        //         content.innerHTML = html;
        //         content.scrollTop = content.scrollHeight;
        //     } else {
        //         console.log("There is a problem:", data);
        //     }
        // });

        // field.onkeydown = function (e) {
        //     if (e.keyCode == 13) {
        //         var text = field.value;
        //         var name = username.value;
        //         socket.emit('send', { message: text, username: name });
        //         field.value = "";
        //     }
        // };

        // socket.on("connect", function () {
        //     console.log("Socket connected.")
        // });
        socket.on("disconnect", function () {
            console.log("Socket disconnected.")
        });
    });

};
