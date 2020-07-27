export class Block {
  constructor(width, height, x, y, stageWidth, stageHeight) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.maxX = width + x;
    this.maxY = height + y;
    this.color = '#ff384e'
  }

  clicked(mouseX, mouseY, posX, posY) {
    console.log('mouseX, mouseY, posX, posY: ', mouseX, mouseY, posX, posY);
    let d = this.dist(mouseX, mouseY, posX, posY) 
    console.log('d: ', d);
    this.color = '#ff3ffe'
  }

  dist(mouseX, mouseY, posX, posY){
    let s = Math.abs(mouseX) - Math.abs(posX)
    console.log('s: ', s);
    let a = Math.pow(s)
    console.log('a: ', a);
  
    // return Math.sprt()
  }
  

  draw(ctx, x) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(x, this.y, this.width, this.height);
    ctx.fill();
  }
}

