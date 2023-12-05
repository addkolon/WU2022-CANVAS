class Map {
    constructor({
        backgroundImage,
        borders,
        width,
        height,
        player1StartingPosition,
        player2StartingPosition,
        nextMap,
        nextMapCollisionBox 
    }) {
        this.backgroundImage = new Image();
        this.backgroundImage.src = backgroundImage;
        this.width = width;
        this.height = height;
        this.borders = {
            top: borders.top,
            left: borders.left,
            right: borders.right,
            bottom: borders.bottom,
        };
        this.player1StartingPosition = player1StartingPosition;
        this.player2StartingPosition = player2StartingPosition;
        this.nextMap = nextMap;
        this.nextMapCollisionBox = {
            x: nextMapCollisionBox.x,
            y: nextMapCollisionBox.y,
            width: nextMapCollisionBox.width,
            height: nextMapCollisionBox.height
        }
    }

    draw(ctx) {
        // Draw the map using this.backgroundImage
        ctx.drawImage(this.backgroundImage, 0, 0, this.width, this.height);
    }
}
