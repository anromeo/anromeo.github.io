
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

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    //var numZombies = 2;
    //var numRocks = 12;

    var gameEngine = new GameEngine();

    var background = new Background(gameEngine, ASSET_MANAGER.getAsset("./images/background.jpg"));
    gameEngine.addEntity(background);

    var numZombies = 40;
    for (var i = 0; i < numZombies; i++) {
        gameEngine.addEntity(new Zombie(gameEngine));
    }

    gameEngine.init(ctx);
    gameEngine.start();
});
