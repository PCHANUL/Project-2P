let molegif = [];
let imgs = [];

export class Bubble {
  constructor(stageWidth, stageHeight, radius, index) {
    this.radius = stageWidth / 30;
    this.color = '#fdd700';

    this.diameter = this.radius * 2;
    console.log('stageWidth: ', stageWidth, stageHeight, index);

    this.position(stageWidth, stageHeight, index);
    this.show = false;

    let req = require.context('../../images/mole', false, /.*\.png$/);
    req.keys().forEach(function (key) {
      molegif.push(req(key));
    });

    let images = require.context('../../images', false, /.*\.png$/);
    images.keys().forEach(function (key) {
      imgs.push(images(key));
    });

    // molehole 이미지태그 생성
    this.molehole = new Image();
    this.molehole.src = imgs[5];

    // mole 이미지태그 생성
    this.mole = new Image();

    this.gifcount = 0;
  }

  clicked(mouseX, mouseY, index, ctx) {
    let a = Math.pow(this.x - mouseX, 2);
    let b = Math.pow(this.y - mouseY, 2);
    let c = Math.sqrt(a + b);

    if (c < this.diameter) {
      console.log(index);
      if (this.color === '#000fff') {
        this.color = '#fdd700';
        this.show = false;
        this.gifcount = 0;
      } else {
        // this.color = '#000fff'
        // this.show = true
      }
    }
  }

  colored() {
    this.show = true;
    if (this.color === '#000fff') {
      this.color = '#fdd700';
    } else {
      this.color = '#000fff';
    }
    setTimeout(() => {
      this.show = false;
    }, 3000);
  }

  draw(ctx, stageWidth, stageHeight) {
    ctx.fillStyle = this.color;

    if (this.show) {
      // gif움직임 생성
      if (this.gifcount !== 7) this.gifcount += 1;
      this.mole.src = molegif[this.gifcount];
      ctx.drawImage(this.mole, this.x - 25, this.y - 25, stageWidth / 10, stageHeight / 5);
    } else {
      ctx.drawImage(this.molehole, this.x - 25, this.y - 25, stageWidth / 10, stageHeight / 5);
    }
  }

  position(stageWidth, stageHeight, index) {
    if (index < 4) {
      this.x = stageWidth / 1.55 - (stageWidth / 9) * index;
      this.y = stageHeight / 7;
    } else if (index < 8) {
      this.x = stageWidth / 1.55 - (stageWidth / 9) * (index - 4);
      this.y = stageHeight / 7 + stageHeight / 5;
    } else if (index < 12) {
      this.x = stageWidth / 1.55 - (stageWidth / 9) * (index - 8);
      this.y = stageHeight / 7 + (stageHeight / 5) * 2;
    } else if (index < 16) {
      this.x = stageWidth / 1.55 - (stageWidth / 9) * (index - 12);
      this.y = stageHeight / 7 + (stageHeight / 5) * 3;
    }
  }

  move() {
    // this.x = this.x + Math.random(-1, 1) * 1/2
    // this.y = this.y + Math.random(-1, 1) * 1/2
  }
}
