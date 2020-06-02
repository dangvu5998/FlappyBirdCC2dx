var BIRD_TYPE = {
    BLUE_BIRD_FAT: 0
}
var BirdSprite = cc.Sprite.extend({
    type: BIRD_TYPE.BLUE_BIRD_FAT,
    currentRotation: 0,
    velocityY: 0,
    gravity: 2,
    ctor: function() {
        this._super();
        this.setPosition(cc.winSize.width / 2, cc.winSize.height / 2)
        this.init();
        this.animate();
    },
    animate: function() {
        if (this.type === BIRD_TYPE.BLUE_BIRD_FAT) {
            var spriteFrames = [
                new cc.SpriteFrame(res.BLUE_BIRD_FAT_1_PNG, cc.rect(0, 0, 700, 600)),
                new cc.SpriteFrame(res.BLUE_BIRD_FAT_2_PNG, cc.rect(0, 0, 700, 600)),
                new cc.SpriteFrame(res.BLUE_BIRD_FAT_3_PNG, cc.rect(0, 0, 700, 600)),
                new cc.SpriteFrame(res.BLUE_BIRD_FAT_4_PNG, cc.rect(0, 0, 700, 600)),
            ];
            this.setScale(0.1);
        }
        var animation = cc.Animation.createWithSpriteFrames(spriteFrames, 0.1);
        var actionToRepeat = cc.Animate.create(animation);
        this.runAction(cc.RepeatForever.create(actionToRepeat));
    },
    updatePosition: function() {
        if(this.velocityY < 0) {
            this.currentRotation = this.velocityY * -2.5;
        }
        else {
            this.currentRotation = this.velocityY * -0.5;
        }
        this.currentRotation = Math.max(-60, Math.min(40, this.currentRotation));
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
        this.velocityY = 25;
    },
})