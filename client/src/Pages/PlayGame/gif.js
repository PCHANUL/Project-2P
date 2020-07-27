export class Bubble {
  constructor(stageWidth, stageHeight, radius, index) {
    this.radius = stageWidth/30;
    this.color = '#fdd700';

    this.diameter = this.radius * 2;
    console.log('stageWidth: ', stageWidth, stageHeight, index);

    this.position(stageWidth, stageHeight, index)
    // this.x = stageWidth / index;
    // this.y = stageHeight / index;

    this.show = false
    
  }
  
  

  draw(ctx, stageWidth, stageHeight) {
    this.mole = document.getElementById('moleImg')

    ctx.fillStyle = this.color;
    
    if(this.show) {
      ctx.drawImage(this.mole, this.x-25, this.y-25, 50, 50)
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

}
