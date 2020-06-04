var BIRD_TYPE = {
    BLUE_BIRD_FAT: 0
}
var BirdSprite = cc.Sprite.extend({
    type: BIRD_TYPE.BLUE_BIRD_FAT,
    currentRotation: 0,
    velocityY: 0,
    gravity: 1,
    flyUpVelocity: 15,
    flyAction: null,
    alive: true,
    ctor: function() {
        this._super();
        this.setPosition(cc.winSize.width / 2, cc.winSize.height / 2)
        this.init();
        this.animate();
    },
    animate: function() {
        var spriteFrames;
        if (this.type === BIRD_TYPE.BLUE_BIRD_FAT) {
            spriteFrames = [
                new cc.SpriteFrame(res.BLUE_BIRD_FAT_1_PNG, cc.rect(0, 0, 700, 600)),
                new cc.SpriteFrame(res.BLUE_BIRD_FAT_2_PNG, cc.rect(0, 0, 700, 600)),
                new cc.SpriteFrame(res.BLUE_BIRD_FAT_3_PNG, cc.rect(0, 0, 700, 600)),
                new cc.SpriteFrame(res.BLUE_BIRD_FAT_4_PNG, cc.rect(0, 0, 700, 600)),
            ];
            this.setScale(0.1);
        }
        var animation = cc.Animation.createWithSpriteFrames(spriteFrames, 0.1);
        this.flyAction = cc.RepeatForever.create(cc.Animate.create(animation));
        this.runAction(this.flyAction);
        //this.runAction(this.flyAction);
    },
    setAlive: function (alive) {
        if(this.alive && alive === false) {
            this.stopAction(this.flyAction);
            this.alive = false;
        }
        if(!this.alive && alive === true) {
            this.runAction(this.flyAction);
            this.alive = true;
        }

    },
    updatePosition: function() {
        if(this.velocityY < 0) {
            this.currentRotation = this.velocityY * -2.5;
        }
        else {
            this.currentRotation = this.velocityY * -4.5;
        }
        this.currentRotation = Math.max(-40, Math.min(40, this.currentRotation));
        this.setRotation(this.currentRotation);
        var newPositionY = this.getPositionY() + this.velocityY;
        if(newPositionY < 10) {
            newPositionY = 10;
        }
        if(newPositionY > cc.winSize.height - 10) {
            newPositionY = cc.winSize.height - 10;
        }
        this.setPositionY(newPositionY);
    },
    fall: function() {
        this.velocityY -= this.gravity;
        this.velocityY = Math.max(-100, this.velocityY);
    },
    flyUp: function() {
        this.velocityY = this.flyUpVelocity;
    },
})