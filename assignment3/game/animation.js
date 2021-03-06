function Animation(spriteSheet, frameWidth, frameHeight, frameDuration, frames, loop, reverse, numFramesInRow) {
    this.spriteSheet = spriteSheet;
    this.size = 1;
    this.currentSize = 1;
    this.currentAngleImage = new Array();
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
    this.numFramesInRow = numFramesInRow;
}

// @deprecated function
// Animation.prototype.drawFrame = function (tick, ctx, x, y) {
//     this.elapsedTime += tick;
//     if (this.isDone()) {
//         if (this.loop) this.elapsedTime = 0;
//     }
//     var frame = this.currentFrame();
//     var xindex = 0;
//     var yindex = 0;
//     xindex = frame;

//     console.log(frame + " " + xindex + " " + yindex);
//     ctx.drawImage(this.spriteSheet,
//                  xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
//                  this.frameWidth, this.frameHeight,
//                  x, y,
//                  this.frameWidth,
//                  this.frameHeight);
// }

Animation.prototype.drawFrameRotate = function (tick, ctx, x, y, theAngle) {
    if (this.size !== this.currentSize) {
        this.currentAngleImage = new Array();
    }
    var angle = Math.floor(theAngle);
	this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    if (frame > 13) {
        frame = 26 - frame;
    }
    xindex = frame % this.numFramesInRow;
    yindex = Math.floor(frame / this.numFramesInRow);

    if (!this.currentAngleImage[angle]) {
        this.currentAngleImage[angle] = new Array();
    }
    if (!this.currentAngleImage[angle][frame]) {
        this.currentAngleImage[angle][frame] = this.rotateAndCache(angle, xindex, yindex);
    }

    if (ctx !== null) {
        ctx.drawImage(this.currentAngleImage[angle][frame],
            x, y);
    }
}

Animation.prototype.rotateAndCache = function (angle, xindex, yindex) {
    //console.log("Rotating and Caching");
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(this.frameWidth * this.size, this.frameHeight * this.size);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle * Math.PI/180);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 -(this.frameWidth/2) * this.size, -(this.frameHeight/2) * this.size,  //0, 0, works
                 this.frameWidth * this.size,
                 this.frameHeight * this.size);
    offscreenCtx.restore();
    return offscreenCanvas;
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}