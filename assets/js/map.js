class Map {
    constructor(backgroundImage, top, left, right, bottom, width, height, p1x, p1y, p2x, p2y) {
        this.backgroundImage = new Image();
        this.backgroundImage.src = backgroundImage;
        this.width = width;
        this.height = height;
        this.borders = {
            top: top,
            left: left,
            right: right,
            bottom: bottom,
        };
        this.player1StartingPosition = { x: p1x, y: p1y };
        this.player2StartingPosition = { x: p2x, y: p2y };
    }

    draw(ctx) {
        // Draw the map using this.backgroundImage
        ctx.drawImage(this.backgroundImage, 0, 0, this.width, this.height);
    }
}