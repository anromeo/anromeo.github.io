function Zombie(game, clone) {
    this.radius = 64;

    if (clone) {
        // LivingEntity.call(this, game, clone.pointerX, clone.pointerY, clone.clone.directionX, clone.directionY, clone.locationX, clone.locationY);
        // LivingEntity.call(this, game, clone.pointerX, clone.pointerY, this.radius + Math.random() * (800 - this.radius * 2) * -1, this.radius + Math.random() * (800 - this.radius * 2) * -1, clone.locationX, clone.locationY);
        // console.log(clone.x);
        // this.x = clone.x;
        // this.y = clone.y;
        LivingEntity.call(this, game, clone.pointerX, clone.pointerY, clone.directionX, clone.directionY, clone.locationX, clone.locationY);
        this.x = clone.x;
        this.y = clone.y;

        this.strength = clone.strength;
        this.growtime = clone.growtime;
        this.halo = clone.halo;
        this.health = clone.health;
        this.maxHealth = clone.health;
        this.maxSpeed = clone.maxSpeed;

        this.currentAction = clone.currentAction;
        this.deathTimer = clone.deathTimer;

        this.velocity = clone.velocity;
    } else {

        LivingEntity.call(this, game, this.radius + Math.random() * (800 - this.radius * 2) * -1, this.radius + Math.random() * (800 - this.radius * 2) * -1, this.radius + Math.random() * (800 - this.radius * 2) * -1, this.radius + Math.random() * (800 - this.radius * 2) * -1, this.radius + Math.random() * (800 - this.radius * 2) * -1, this.radius + Math.random() * (800 - this.radius * 2) * -1);
        this.x = 800 * Math.random();
        this.y = 800 * Math.random();

        this.strength = 2;
        this.growtime = 0;
        this.halo = 50;
        this.health = minSpeed * 2 + (maxSpeed * 2 - minSpeed * 2) * Math.random();
        this.maxHealth = this.health;
        this.maxSpeed = minSpeed + (maxSpeed - minSpeed) * Math.random();
        this.currentAction = "chasing";
        this.deathTimer = 150;

        this.velocity = { x: Math.random() * 1000, y: Math.random() * 1000 };
        var speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
        if (speed > this.maxSpeed) {
            var ratio = this.maxSpeed / speed;
            this.velocity.x *= ratio;
            this.velocity.y *= ratio;
        }

    }
    this.size;
    this.player = 1;
    this.radius = 28;
    this.visualRadius = 10000;
    this.target = null;
    this.name = "Zombie";
    this.rangeOfAttack = 0;
    this.maxHalo = 50;
    this.maxGrowtime = 50;
    this.color = "Red";

    this.setAttackAnimation(ASSET_MANAGER.getAsset("./images/demon.png"), 64, 64, .05, 8, true, false, 8);
    this.setMovingAnimation(ASSET_MANAGER.getAsset("./images/demon-attacking.png"), 64, 66, .05, 8, true, false, 8);
    this.setDeathAnimation(ASSET_MANAGER.getAsset("./images/demon-dying.png"), 64, 65, .24, 13, false, true, 13);

    if (clone) {
        this.attackAnimation.totalTime = clone.attackAnimation.totalTime;
        this.attackAnimation.elapsedTime = clone.attackAnimation.elapsedTime;
        this.attackAnimation.size = clone.attackAnimation.size;
        this.movingAnimation.totalTime = clone.movingAnimation.totalTime;
        this.movingAnimation.elapsedTime = clone.movingAnimation.elapsedTime;
        this.movingAnimation.size = clone.movingAnimation.size;
        this.deathAnimation.totalTime = clone.deathAnimation.totalTime;
        this.deathAnimation.elapsedTime = clone.deathAnimation.elapsedTime;
        this.deathAnimation.size = clone.deathAnimation.size;
    }
};

Zombie.prototype = new LivingEntity();
Zombie.prototype.constructor = Zombie;

Zombie.prototype.grow = function() {
    this.set
}
Zombie.prototype.collide = function (other) {
    return distance(this, other) < this.radius + other.radius;
};

Zombie.prototype.collideLeft = function () {
    return (this.x - this.radius) < 0;
};

Zombie.prototype.collideRight = function () {
    return (this.x + this.radius) > 800;
};

Zombie.prototype.collideTop = function () {
    return (this.y - this.radius) < 0;
};

Zombie.prototype.collideBottom = function () {
    return (this.y + this.radius) > 800;
};

Zombie.prototype.update = function () {
    if (this.game) {
    Entity.prototype.update.call(this);

    // if my health is less than 100, i am now in the dying stages
    if (this.health !== undefined && this.health <= 0) {
        this.currentAction = "dying";
    }

    // if (this.target) {
    //     console.log(this.target);
    // }
    if (this.deathTimer !== undefined && this.deathTimer <= 0) {
        this.removeFromWorld = true;
        return;
    } else if (this.currentAction === "dying") {
         this.deathTimer -= 1;
         return;
    }

    if (this.currentAction === "growing" && this.growtime >= 0 && this.game.entities.length > 1) {
        if (this.halo <= 0) {
            this.halo = this.maxHalo;
            this.movingAnimation.size += .5;
            this.attackAnimation.size += .5;
            this.deathAnimation.size += .5;
            this.radius *= 1.3;
            this.currentAction = "chasing";
        } else {
            this.halo -= 1;
        }
        return;
    } else if (this.currentAction === "growing") {
        var pointsAvailable = 1000;
        var addToHealth = Math.random() * pointsAvailable / 2 + pointsAvailable * 2;
        var addToSpeed = Math.random() * (pointsAvailable - addToStrength);
        var addToStrength = pointsAvailable - addToHealth - addToSpeed;
        this.strength += addToStrength;
        this.speed += addToSpeed;
        this.maxHealth += addToHealth;
        this.health = this.maxHealth;
        this.currentAction = "attacking";
    }

    var acceleration = 1000000;
    if (this.currentAction === "chasing") {
        this.x += this.directionX * this.game.clockTick;
        this.y += this.directionY * this.game.clockTick;
    }
    if (this.collideLeft() || this.collideRight()) {
        this.directionX = -this.directionX * friction;
        if (this.collideLeft()) this.x = this.radius;
        if (this.collideRight()) this.x = 800 - this.radius;
        this.x += this.directionX * this.game.clockTick;
        this.y += this.directionY * this.game.clockTick;
    }

    if (this.collideTop() || this.collideBottom()) {
        this.directionY = -this.directionY * friction;
        if (this.collideTop()) this.y = this.radius;
        if (this.collideBottom()) this.y = 800 - this.radius;
        this.x += this.directionX * this.game.clockTick;
        this.y += this.directionY * this.game.clockTick;
    }

    var chasing = false;
    var closestDistance = 800;
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent !== this && ent.name === "Zombie" && this.collide({x: ent.x, y: ent.y, radius:this.visualRadius})) {
            var dist = distance(this, ent);
            if (dist > this.radius + ent.radius + 2) {
                var difX = (ent.x - this.x)/dist;
                var difY = (ent.y - this.y)/dist;
                this.directionX += difX * acceleration / (dist * dist);
                this.directionY += difY * acceleration / (dist * dist);
            }
        }


        if ((ent !== this && ent.name === "Zombie" && this.collide({x: ent.x, y: ent.y, radius: this.visualRadius})
            && !this.target)
             || (ent !== this && this.target && distance(this, this.target) > this.rangeOfAttack))
        {
            var dist = distance(this, ent);
            if (dist < closestDistance) {
                closestDistance = dist;
                this.target = ent;
            }
        }
        
    }

    if (this.target && this.target.name === "Zombie" && this.target.currentAction !== "growing" &&
        distance(this, this.target) < this.radius + this.target.radius + this.rangeOfAttack) {
        
        this.currentAction = "attacking";
        var difX = (this.target.x - this.x)/dist;
        var difY = (this.target.y - this.y)/dist;
        this.directionX = difX * acceleration / (dist * dist);
        this.directionY = difY * acceleration / (dist * dist);

        // console.log("Before attack: " + this.target.health);
        this.target.health -= this.strength;
        if (this.target.currentAction === "dying" && this.target.removeFromWorld) {
            this.currentAction = "growing";
            this.growtime = this.maxGrowtime;
        }
        // console.log("After attack: " + this.target.health);
    } else if (this.target && this.collide({ x: this.target.x, y: this.target.y, radius: this.visualRadius })) {
        this.currentAction = "chasing";
        var dist = distance(this, this.target);
        if (dist > this.radius + this.target.radius + 2) {
            var difX = (ent.x - this.x)/dist;
            var difY = (ent.y - this.y)/dist;
            this.directionX += difX * acceleration / (dist * dist * acceleration);
            this.directionY += difY * acceleration / (dist * dist * acceleration);
        }
    }

    var speed = Math.sqrt(this.directionX * this.directionX + this.directionY * this.directionY);
    if (speed > this.maxSpeed) {
        var ratio = this.maxSpeed / speed;
        this.directionX *= ratio;
        this.directionY *= ratio;
    }

    this.directionX -= (1 - friction) * this.game.clockTick * this.directionX;
    this.directionY -= (1 - friction) * this.game.clockTick * this.directionY;

	this.angle = Math.atan2(this.directionY , this.directionX) * (180/Math.PI); //-  Math.atan2(this.x , this.y) * (180/Math.PI);
	this.angle = this.angle - 260;
	while (this.angle > 360) {
		this.angle = this.angle - 360;
	}
}

};

    Zombie.prototype.draw = function (ctx) {
        LivingEntity.prototype.draw.call(this, ctx);
};

// Zombie.prototype.draw = function (ctx) {
//     var ctx = ctx.canvas.getContext("2d");
//     console.log(this.degreeTurnRight);
//     this.animation.spriteSheet = this.rotateAndCache(ASSET_MANAGER.getAsset("./demon.png"), 1);

//     // this.rotateAndCache(ASSET_MANAGER.getAsset("./demon.png"), this.degreeTurnRight*Math.PI/180);
//     // if (this.degreeTurnRight > 360) {
//     //     this.degreeTurnRight = 0;
//     // } else {
//     //     this.degreeTurnRight += 10;
//     // }
//     // if (this.jumping) {
//     //     this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x + 17, this.y - 34);
//     // }
//     // else {
//         this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
//  //       this.y -= 2;
//     // }
//     Entity.prototype.draw.call(this);

//     ctx.restore();
//     // ctx.beginPath();
//     // ctx.fillStyle = this.color;
//     // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//     // ctx.fill();
//     // ctx.closePath();

// };
