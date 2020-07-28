export class Ball {
  constructor(stageWidth, stageHeight, radius, speed) {
    this.radius = radius;
    this.speed = speed;
    this.vx = speed;
    this.vy = speed;
    this.x = stageWidth / 2;
    this.y = stageHeight / 2;
    this.stop = false
  }

  draw(ctx, stageWidth, stageHeight, 
    blockPosX, blockPosY, blockSizeX, blockSizeY,
    RivalPosX, RivalPosY, RivalSizeX, RivalSizeY) 
    {
    
    this.bounceWindow(stageWidth, stageHeight);
    this.bounceBlock(blockPosX, blockPosY, blockSizeX, blockSizeY);
    this.bounceRival(RivalPosX, RivalPosY, RivalSizeX, RivalSizeY);
    
    ctx.fillStyle = '#fdd700';
    ctx.beginPath();

    // Ball 제어
    if(!this.stop){
      this.x += 0;
      this.y += this.vy;
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    } else {
      this.x = stageWidth / 2;
      this.y = stageHeight / 2;
      this.vx = this.speed;
      this.vy = this.speed;
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    }
    ctx.fill();
  }

  stoppp() {
    this.stop = !this.stop;
  }

  bounceWindow(stageWidth, stageHeight) {
    const minX = this.radius;
    const maxX = stageWidth - this.radius;
    const minY = this.radius;
    const maxY = stageHeight - this.radius;

    if (this.x <= minX || this.x >= maxX) {
      this.vx *= -1;
      this.x += this.vx;
    } else  if (this.y <= minY) {
      this.vy *= -1;
      this.y += this.vy;
      console.log('이김')
      this.stoppp()
    } else if (this.y >= maxY) {
      this.vy *= -1;
      this.y += this.vy;
      console.log('짐')
      this.stoppp()
    }
  }

  bounceBlock(blockPosX, blockPosY, blockSizeX, blockSizeY) {
    const minX = blockPosX - this.radius;
    const maxX = blockPosX + blockSizeX + this.radius;
    const minY = blockPosY - this.radius;
    const maxY = blockPosY + blockSizeY + this.radius;

    if(this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
      const x1 = Math.abs(minX - this.x);
      const x2 = Math.abs(this.x - maxX);
      const y1 = Math.abs(minY - this.y);
      const y2 = Math.abs(this.y - maxY);
      const min1 = Math.min(x1, x2);
      const min2 = Math.min(y1, y2);
      const min = Math.min(min1, min2);

      if(min === min1) {    // 좌우변
        console.log('a')
        this.vy += 3;
        this.vx *= -1;
        this.vy *= -1;
        this.x += this.vx;
        this.y += this.vy;
      } else if (min === min2) {    //상하변
        console.log('b')
        this.vx += 2;
        this.vy *= -1;
        this.y += this.vy;
      }
    }
  }

  bounceRival(blockPosX, blockPosY, blockSizeX, blockSizeY) {
    const minX = blockPosX - this.radius;
    const maxX = blockPosX + blockSizeX + this.radius;
    const minY = blockPosY - this.radius;
    const maxY = blockPosY + blockSizeY + this.radius;

    if(this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
      const x1 = Math.abs(minX - this.x);
      const x2 = Math.abs(this.x - maxX);
      const y1 = Math.abs(minY - this.y);
      const y2 = Math.abs(this.y - maxY);
      const min1 = Math.min(x1, x2);
      const min2 = Math.min(y1, y2);
      const min = Math.min(min1, min2);

      if(min === min1) {
        this.vy += 3;
        this.vx *= -1;
        this.vy *= -1;
        this.x += this.vx;
        this.y += this.vy;
      } else if (min === min2) {
        this.vx += 2;
        this.vy *= -1;
        this.y += this.vy;
      }
    }
  }
}