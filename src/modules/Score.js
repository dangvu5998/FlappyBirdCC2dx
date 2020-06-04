var ScoreLayer = cc.Layer.extend({
    mainGameScene: null,
    lbScore: null,
    ctor: function(mainGameScene) {
        this._super();
        this.mainGameScene = mainGameScene;
        this.lbScore = new cc.LabelTTF(null, "Arial Bold", 30);
        cc.log(this.mainGameScene.score)
        this.lbScore.x = 0;
        this.lbScore.y = 0;
        this.lbScore.color = cc.color(255, 255, 255);
        this.addChild(this.lbScore,10);
        this.scheduleUpdate();
    },
    update: function() {
        this.lbScore.setString("Score: "+this.mainGameScene.score);
    }
})