var PipesLayer = cc.Layer.extend({
    // contains low pipe and high pipe, low pipe in even index, high pipe in odd index
    pipes: null,
    pipeDistance: 300,
    spaceSlot: 250,
    baseY: 100,
    initialPositionX: 1000,
    ctor: function() {
        this._super();
        this.pipes = []
        for(var i = 0; i < 5; i++) {
            var lowPipe = new Pipe();
            var highPipe = new Pipe();
            lowPipe.setPositionX(this.initialPositionX + i * this.pipeDistance);
            highPipe.setPositionX(this.initialPositionX + i * this.pipeDistance);
            highPipe.setRotation(180);
            this.pipes.push(lowPipe);
            this.pipes.push(highPipe);
            this.setPositionYPipeAndPoint(i*2);
            this.addChild(lowPipe);
            this.addChild(highPipe);
        }
    },
    setPositionYPipeAndPoint: function(index) {
        if(index % 2 !== 0 || this.pipes.length < index + 1) {
            cc.error('Invalid index pipes');
            return;
        }
        var lowPipe = this.pipes[index];
        var highPipe = this.pipes[index + 1];
        var randAddedY = Math.random() * 400;
        var lowPositionY = this.baseY + randAddedY;
        lowPipe.setPositionY(lowPositionY);
        highPipe.setPositionY(lowPositionY + this.spaceSlot + 800);
        lowPipe.score = 1;
    },
    scroll: function(speed) {
        var maxPositionX = -1000000;
        var maxPositionXIndex = 0;
        var minPositionX = 100000;
        var minPositionXIndex = 0;
        for(var i = 0; i < this.pipes.length; i++) {
            var pipe = this.pipes[i];
            pipe.scroll(speed);
            if(i % 2 == 0) {
                if (pipe.getPositionX() > maxPositionX) {
                    maxPositionX = pipe.getPositionX();
                    maxPositionXIndex = i
                }
                if (pipe.getPositionX() < minPositionX) {
                    minPositionX = pipe.getPositionX();
                    minPositionXIndex = i
                }
            }
        }
        if(maxPositionX < cc.winSize.width && minPositionX < -200) {
            this.setPositionYPipeAndPoint(minPositionXIndex);
            this.pipes[minPositionXIndex].setPositionX(maxPositionX + this.pipeDistance);
            this.pipes[minPositionXIndex + 1].setPositionX(maxPositionX + this.pipeDistance);
        }
    },
    getBoundingBoxList: function() {
        var bbList = this.pipes.map(function(pipe) {
            var pipeBox = pipe.getBoundingBox();
            pipeBox.x += 5;
            pipeBox.y += 5;
            pipeBox.width -= 20;
            pipeBox.height -= 15;
            return pipeBox;
        })
        return bbList;

    }
});

var Pipe = cc.Sprite.extend({
    score: 0,
    ctor: function() {
        this._super(res.PIPE_GREEN, cc.rect(0, 0, 52, 320));
        this.setScaleX(1.7);
        this.setScaleY(2.5);
    },
    scroll: function(speed) {
        this.setPositionX(this.getPositionX() - speed);
    },
    takeScore: function() {
        var score = this.score;
        this.score = 0;
        return score;
    }
})