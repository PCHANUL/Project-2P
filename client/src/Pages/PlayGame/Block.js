export class Block {
  constructor(width, height, x, y, stageWidth, stageHeight) {
    this.width = width;
    this.height = height;
    this.initX = x;
    this.initY = y;
    this.x = x;
    this.y = y;
    this.maxX = width + x;
    this.maxY = height + y;
    this.color = '#ff384e'
  }

  draw(ctx, x, y) {
    ctx.fillStyle = '#000';
    ctx.strokeStyle = '#fff';
    ctx.beginPath();
    ctx.rect(x, y, this.width, this.height);
    ctx.lineWidth = this.width / 20;
    ctx.fill();
    ctx.stroke();
  }
}

