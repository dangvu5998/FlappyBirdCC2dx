var GamePlayLayer = cc.Layer.extend({
    bird: null,
    scene: null,
    ground: null,
    pipes: null,
    frameCount: 0,
    ctor: function() {
        this._super();
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
        this.bird.fall();
        this.bird.updatePosition();


        this.ground.scroll(1.2);
        this.pipes.scroll(5);
    }
})