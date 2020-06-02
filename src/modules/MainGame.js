var MAIN_GAME_STATUS = {
    PLAYING: 0,
    PAUSE: 1
}
var MainGameScene = cc.Scene.extend({
    status: MAIN_GAME_STATUS.PLAYING,
    onEnter: function() {
        this._super();
        var backgroundLayer = new BackgroundLayer();
        var gamePlayLayer = new GamePlayLayer();
        var gameStatusLayer = null;
        this.addChild(backgroundLayer, 0);
        this.addChild(gamePlayLayer, 1);
    }

})