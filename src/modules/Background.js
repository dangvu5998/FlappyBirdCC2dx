var BackgroundLayer = cc.LayerColor.extend({
    dayColors : {
        "DAY" : new cc.Color(78, 192, 202, 255),
        "NIGHT" : new cc.Color(0, 135, 147, 255)
    },
    day : null,
    land : null,
    DAY: 'DAY',
    NIGHT: 'NIGHT',

    ctor : function (day) {

        this._super();

        if(day)
            this.day = day;
        else
            this.setDay();

        this.setColor(this.getDayColor());

        this.addLand();

        return true;
    },

    addLand : function() {
        this.land = new cc.Sprite(
            res.BACKGROUND_PNG,
            cc.rect(0, (this.day == this.NIGHT ? 512 : 0), 512, 512)
        );
        this.land.setScale(2.0);
        this.addChild(this.land, 0, 1);
        //this.land.setPosition(this.land.width/2, this.land.height/2);
        this.land.setPosition(this.land.width, this.land.height);
    },

    setDay : function(){
        this.day = this.DAY;

        var rand = Math.random();

        if(rand < 0.5)
            this.day = this.DAY;
        else
            this.day = this.NIGHT;
    },

    getDayColor : function() {
        return this.dayColors[this.day];
    }
});