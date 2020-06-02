var Ground = cc.Sprite.extend({
    ctor: function() {
        this._super(res.GROUND, cc.rect(0, 0, 336, 112));
        this.setScale(2.5);
        this.setPosition(cc.winSize.width / 2, 112*2.5/2);
    },
    scroll: function(speed) {
        var spriteRect = this.getTextureRect(),
            spriteTexture = this.getTexture();

        spriteRect.x += 1 * speed;
        if (spriteTexture.width - spriteRect.x <= cc.winSize.width/2.3)
            spriteRect.x = 0;
        else
            spriteRect.x += speed;

        this.setTextureRect(spriteRect);
    }
})