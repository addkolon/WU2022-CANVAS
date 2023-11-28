class Map {
  constructor(imageSrc, width, height, top = 0, left = 0, right = 0, bottom = 0) {
    this.image = new Image();
    this.image.src = imageSrc;
    this.width = width
    this.height = height
    this.borders = {
      top: top,
      left: left,
      right: right,
      bottom: bottom,
    }
  }

  draw(ctx) {
    ctx.drawImage(this.image, 0, 0, this.width, this.height);
  }
}