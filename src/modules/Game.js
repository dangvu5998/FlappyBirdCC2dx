var GameMenuScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var background = new Background();
        this.addChild(background, 0);
    }
})