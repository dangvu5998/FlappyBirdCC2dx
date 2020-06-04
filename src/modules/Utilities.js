var Utilities = {
    valueInRange: function(value, min, max) {
        return (value >= min) && (value <= max);
    },
    rectOverlap: function (rect1, rect2) {
        var xOverlap = Utilities.valueInRange(rect1.x, rect2.x, rect2.x + rect2.width) ||
            Utilities.valueInRange(rect2.x, rect1.x, rect1.x + rect1.width);

        var yOverlap = Utilities.valueInRange(rect1.y, rect2.y, rect2.y + rect2.height) ||
            Utilities.valueInRange(rect2.y, rect1.y, rect1.y + rect1.height);

        return xOverlap && yOverlap;
    }
}