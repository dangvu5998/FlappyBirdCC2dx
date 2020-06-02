var GameMenuLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var logo = new cc.Sprite(res.GUI_PNG, cc.rect(0, 252, 178, 48));
        var centerWidth = cc.winSize.width/2;
        var centerHeight = cc.winSize.height/2;
        logo.setPosition(centerWidth, centerHeight + 100);
        this.addChild(logo);
        var playButtonSprite = new cc.Sprite(res.GUI_PNG, cc.rect(0, 436, 116, 70));
        var playButton = new cc.MenuItemSprite(playButtonSprite, playButtonSprite, this.play, this);
        playButton.setEnabled(true);
        var menu = cc.Menu.create(playButton);
        //menu.setPosition(centerWidth, centerHeight + 100);
        this.addChild(menu);
    },
    play: function(target) {
        var btnActiveSeq = new cc.Sequence(
            cc.moveBy(0.1, 1, -5),
            cc.moveBy(0.1, -1, 5)
        );
        target.runAction(btnActiveSeq);
        var newScene = cc.TransitionFade.create(0.5, new MainGameScene(), cc.color(0, 0, 0));
        cc.director.runScene(newScene);
    }
})