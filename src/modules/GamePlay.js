var GamePlayLayer = cc.Layer.extend({
    bird: null,
    scene: null,
    ground: null,
    pipes: null,
    mainGameScene: null,
    scrollSpeed: 1,
    frameCount: 0,
    ctor: function(mainGameScene) {
        this._super();
        this.mainGameScene = mainGameScene
        this.pipes = new PipesLayer();
        this.addChild(this.pipes, 0);
        this.bird = new BirdSprite();
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function(event) {
                self.bird.flyUp(10);
            }
        }, this)
        this.addChild(this.bird, 1);
        this.ground = new Ground()
        this.addChild(this.ground, 2);
        this.scheduleUpdate();
        return true;
    },
    update: function() {
        this.frameCount += 1;
        if(this.frameCount <= 30) {
            return;
        }
        if(this.mainGameScene.status !== MAIN_GAME_STATUS.PLAYING) {
            this.bird.setAlive(false);
            return;
        }
        this.bird.fall();
        this.bird.updatePosition();
        this.ground.scroll(this.scrollSpeed * 1.1);
        this.pipes.scroll(this.scrollSpeed * 5);
        if(this.birdCollisionDetection()) {
            this.mainGameScene.setStatus(MAIN_GAME_STATUS.OVER);
        }
        this.birdPassPipeDetection();
    },
    birdPassPipeDetection: function() {
        var birdPositionX = this.bird.getPositionX();
        for(var i = 0; i < this.pipes.pipes.length; i++) {
            var pipe = this.pipes.pipes[i];
            var XRangeCheck = 10;
            var pipePositionX = pipe.getPositionX();
            if(Utilities.valueInRange(birdPositionX, pipePositionX - XRangeCheck, pipePositionX + XRangeCheck)) {
                this.mainGameScene.score += pipe.takeScore();
            }
        }

    },
    birdCollisionDetection: function() {
        var birdRectBB = this.bird.getBoundingBox();
        var groundBB = this.ground.getBoundingBox();
        var collision = Utilities.rectOverlap(birdRectBB, groundBB);
        if(collision) {
            return true;
        }
        var pipeBBList = this.pipes.getBoundingBoxList();
        for(var i = 0; i < pipeBBList.length; i++) {
            collision = collision || Utilities.rectOverlap(pipeBBList[i], birdRectBB);
            if(collision) {
                return true;
            }
        }
        return collision;
    }
})