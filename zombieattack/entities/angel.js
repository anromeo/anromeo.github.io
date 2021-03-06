
// find and replace playerControlled with your initials (i.e. ABC)
// change this.name = "Your Chosen Name"

// only change code in selectAction function()
// Source Used: http://jaran.de/goodbits/2011/07/17/calculating-an-intercept-course-to-a-target-with-constant-direction-and-velocity-in-a-2-dimensional-plane/

function Angel(game) {
	//console.log("building angel");
	//LivingEntity.call(this, game, 100, 100);
    playerControlled.call(this, game);

    this.player = 1;

    // this.SpriteWidth = 80;
    // this.SpriteHeight = 43;


    this.radius = 30;
    this.controlled = false;
    this.action;
    this.weapon = null;
    this.game = game;
    this.name = "Angel";
    this.type = "playerControlled";
    this.color = "Black";
    this.team = "blue";
    this.shootingLine = true;
    this.radialOffset = -5;

    this.cooldown = 0;
    this.randomLine = {x:0, y:0};
    this.linecooldown = .002;
    this.linecooldownstart = .002;
    this.cooldownStartControlled = .45;
    this.cooldownStartNotControlled = .75;
    //this.corners = [{x:0, y:0}, {x:800, y:0}, {x:0, y:800}, {x:800, y:800}]
    this.CenterOffsetX = 10; // puts the center of the sprite in the center of the entity
    this.CenterOffsetY = 10; // puts the center of the sprite in the center of the entity
    this.SpriteRotateOffsetX = 8; //describes the point of rotation on the sprite changed from 1/2 width
    this.SpriteRotateOffsetY = -7; //describes the point of rotation on the sprite changed from 1/2 height
    this.velocity = { x: 0, y: 0 };

    this.ability1Attributes.activate = false;

  //  this.maxSpeed = 200;

    this.speed = 25;
    this.vitality = 30;
    this.strength = 25;

    this.maxSpeed = this.speed * 4;
    this.healthMAX = this.vitality * 4;
    this.health = this.healthMAX;

    this.timerForSpeed = 0;
    this.originalSpeed = 100;

    this.currentAbility = 1;
    this.movingAnimationImage = ASSET_MANAGER.getAsset("./images/angel-walking.png");

    this.approachingDistance = 40;
    this.attackingDistance = 25;
    this.SpriteWidth = 448 / 8;
    this.SpriteHeight = 58;
    this.numberOfMovingAnimations = 5;
    this.numberOfMovingAnimationsInRow = 5;

    this.setMovingAnimation(ASSET_MANAGER.getAsset("./images/angel-walking.png"), this.SpriteWidth, this.SpriteHeight, .14, 8, true, false, 8);

    this.ability1Attributes.activate = false;
    this.ability2Attributes.activate = false;


    this.ability1Attributes.on = true;
    this.ability2Attributes.on = true;

    this.ability1PictureInactive = ASSET_MANAGER.getAsset("./images/angel-ability1-inactive.png");
    this.ability1PictureActive = ASSET_MANAGER.getAsset("./images/angel-ability1.png");


    this.ability2PictureActive = ASSET_MANAGER.getAsset("./images/angel-ability2.png");
    this.ability2PictureInactive = ASSET_MANAGER.getAsset("./images/angel-ability2-inactive.png");

    this.angle = 0;
    //this.angleOffset = -210;
	this.spriteAngleOffset = 80;

    this.anglePlayerControlled = -100;
    this.x = -10000;
    this.y = -10000;
};

Angel.prototype = new playerControlled();
Angel.prototype.constructor = Angel;

// This function will eventually move to the shooter class.
Angel.prototype.attack = function(target) {

    var dir = direction(target, this);
    var shot;
    if (this.weapon === "FlameThrower") {
        shot = new Flame(this.game, this, dir);
        this.game.flameaudio.play();
    } else {
        shot = new Projectile(this.game);
        shot.radius = 15;
        shot.color = "gold";
    }
    shot.strength += this.strength;
    shot.maxSpeed = this.maxSpeed * 2;
    shot.x = this.x + dir.x * (this.radius + shot.radius + 20);
    shot.y = this.y + dir.y * (this.radius + shot.radius + 20);
    shot.velocity.x = dir.x * shot.maxSpeed;
    shot.velocity.y = dir.y * shot.maxSpeed;
    //shot.thrown = true;
    shot.thrower = this;
    shot.team = this.team;
    this.game.addEntity(shot);

}

Angel.prototype.ability1 = function(entity) {
    this.currentAbility = 1;
}

Angel.prototype.ability2 = function(entity) {
    this.currentAbility = 2;
}

Angel.prototype.update = function() {
    //console.log(this.spriteAngleOffset);
    if (this.frozen) {
        return;
    }

    if (this.currentAbility === 1) {
        this.game.aura = "rgba(120, 120, 112, .6)";
        if (this.changeAttacks === undefined || this.changeAttacks === false) {
            for(var i = 0; i < this.game.players.length; i++) {
                var player = this.game.players[i];
                player.oldStrength = player.strength;
                player.strength *= 3;
            }
            this.changeAttacks = true;
        }
    } else if (this.currentAbility === 2) {
        this.game.aura = "rgba(247, 250, 35, .6)";
        for(var i = 0; i < this.game.players.length; i++) {
            if (this.game.players[i].health < this.game.players[i].healthMAX) {
                this.game.players[i].health += this.game.timer.tick() * 1000;
            }
        }
        if (this.changeAttacks) {
            for(var i = 0; i < this.game.players.length; i++) {
                var player = this.game.players[i];
                player.strength = player.oldStrength;
            }
            this.changeAttacks = false;            
        }
    }
    playerControlled.prototype.update.call(this);
}

Angel.prototype.draw = function (ctx) {
	playerControlled.prototype.draw.call(this, ctx);
}