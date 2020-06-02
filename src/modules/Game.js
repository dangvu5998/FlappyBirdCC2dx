var GameMenuScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var background = new BackgroundLayer();
        this.addChild(background, 0);
        var menu = new GameMenuLayer();
        this.addChild(menu, 1);
    }
})