var MAIN_GAME_STATUS = {
    PLAYING: 0,
    PAUSE: 1,
    OVER: 2
}
var MainGameScene = cc.Scene.extend({
    status: MAIN_GAME_STATUS.PLAYING,
    score: 0,
    gameOverLayer: null,
    onEnter: function() {
        this._super();
        var backgroundLayer = new BackgroundLayer();
        var gamePlayLayer = new GamePlayLayer(this);
        var scoreLayer = new ScoreLayer(this);
        scoreLayer.setPosition(cc.winSize.width / 2, cc.winSize.height - 50);
        this.gameOverLayer = new GameOver(this);
        this.gameOverLayer.setVisible(false);
        this.gameOverLayer.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.addChild(backgroundLayer, 0);
        this.addChild(gamePlayLayer, 1);
        this.addChild(scoreLayer, 2);
        this.addChild(this.gameOverLayer, 3);
        this.scheduleUpdate();
    },
    setStatus: function(status) {
        this.status = status;
    },
    update: function() {
        if(this.status === MAIN_GAME_STATUS.PLAYING) {
            this.gameOverLayer.setVisible(false);
        } else {
            this.gameOverLayer.setVisible(true);
        }
    }
})