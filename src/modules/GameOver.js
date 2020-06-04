var GameOver = cc.Layer.extend({
    mainGameScene: null,
    menu: null,
    ctor: function(mainGameScene) {
        this._super();
        this.mainGameScene = mainGameScene;
        this.board = new cc.Sprite(
            res.GUI_PNG,
            cc.rect(8, 306, 224, 111)
        )
        this.gameOverLogo = new cc.Sprite(
            res.GUI_PNG,
            cc.rect(7, 63, 191, 44)
        )
        this.board.setScale(2.2);
        this.board.setPosition(0, 0);

        this.gameOverLogo.setScale(2.2);
        this.gameOverLogo.setPosition(0, 200);

        this.lbScore = new cc.LabelTTF(null, "Arial Bold", 40);
        this.lbScore.x = 175;
        this.lbScore.y = 30;
        this.lbScore.color = cc.color(255, 255, 255);

        var menuButtonSprite = new cc.Sprite(
            res.GUI_PNG,
            cc.rect(127, 116, 78, 25)

        )
        var menuButton = new cc.MenuItemSprite(
            menuButtonSprite,
            menuButtonSprite, this.goToMenu, this);
        menuButton.setScale(2.4);
        menuButton.setEnabled(true);
        this.menu = cc.Menu.create(menuButton);
        //this.menu.setScale(2.5);
        this.menu.setPosition(-160, -180);

        this.addChild(this.gameOverLogo, 0);
        this.addChild(this.board, 0);
        this.addChild(this.lbScore, 1);
        this.addChild(this.menu, 1);
        this.scheduleUpdate();
    },
    update: function() {
        this.lbScore.setString(this.mainGameScene.score);
    },
    goToMenu: function() {
        var newScene = cc.TransitionFade.create(0.5, new GameMenuScene(), cc.color(0, 0, 0));
        cc.director.runScene(newScene);
    }

})