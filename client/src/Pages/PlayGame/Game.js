import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Block } from './Block';
import { Ball } from './Ball'
import { isDeleteExpression } from 'typescript';

const styles = (theme) => ({
  Paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    // width: document.body.clientWidth / 2,
    // height: document.body.clientHeight * 10,
    
    margin: theme.spacing(3, 3),
  }
});

let blockX
let dx = 10
let preKey

document.addEventListener('keydown', (e) => {
  // dx까지의 모든 수를 더해줍니다.
  if(e.keyCode === 39){
    dx += 15
    blockX += dx
    
  } else if(e.keyCode === 37){
    blockX -= dx
    dx += 15
  }
})

document.addEventListener('keyup', (e) => {
  if(e.keyCode === 39 ){
    console.log('blockX: ', dx, blockX);
    for(let i; i<dx; i++){
      blockX += i
    }
    
    console.log('blockX: ', dx, blockX);
    dx = 10;
  } else if(e.keyCode === 37){
    dx = 10;
  }
})




class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 100,
      width: document.body.clientWidth / 1.5,
      height: document.body.clientHeight / 1.5,
    }
    this.canvas = null;
    this.ctx = null;
    this.stageWidth = null;
    this.stageHeight = null;
    blockX = 300;
    this.blockY = 300;

    this.ball = new Ball(document.body.clientWidth / 1.5, document.body.clientHeight / 1.5, 6, 5)
    this.block = new Block(100, 100, blockX, this.blockY, document.body.clientHeight / 1.5, document.body.clientHeight / 1.5);
  }
  
  
  
  
  componentDidMount() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    // 화면크기 재설정 이벤트
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();
    window.requestAnimationFrame(this.animate.bind(this));


    document.addEventListener('mousedown', (e) => {
      this.mousePressed(e.pageX/1.5 , e.pageY/1.5, blockX, this.blockY)
    }, false)
  } 
 
  // 화면크기 재설정 함수
  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
 
    this.canvas.width = this.stageWidth / 1.5;
    this.canvas.height = this.stageHeight / 1.5;

    this.setState({ width: this.canvas.width, height: this.canvas.height })
  }

  mousePressed(mouseX, mouseY, posX, posY) {
    this.block.clicked(mouseX, mouseY, posX, posY);
    this.block.draw(this.ctx, blockX)
  }


  animate(t) {
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.drawCircle();

    // this.circle.x += this.circle.dx;
    // this.circle.y += this.circle.dy;

    if(blockX < 0){
      blockX = 0
    }

    if(blockX > this.canvas.width - 100){
      blockX = this.canvas.width - 100
    }
    
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
    this.block.draw(this.ctx, blockX)

    this.ball.draw(this.ctx, this.canvas.width, this.canvas.height, blockX, this.blockY) 

    // // Detect side walls
    // if(this.circle.x + this.circle.size > this.canvas.width || this.circle.x - this.circle.size < 0) {
    //   this.circle.dx *= -1; // circle.dx = circle.dx * -1
    // } 
    // if(this.circle.y + this.circle.size > this.canvas.height || this.circle.y - this.circle.size < 0) {
    //   this.circle.dy *= -1; // circle.dx = circle.dy * -1
    // } 

    // Detect block
    // if(this.circle.x + this.circle.size > this.block.maxX) {
    //   this.circle.dx *= -1; // circle.dx = circle.dx * -1
    // } 
    // if(this.circle.y + this.circle.size > this.block.height || this.circle.y - this.circle.size < 0) {
    //   this.circle.dy *= -1; // circle.dx = circle.dy * -1
    // } 


  }

  render() {
    const { classes } = this.props;

    return (
      <Paper id="paper" style={{
        width: this.state.width,
        height: this.state.height
        }} className={classes.Paper}>
        <canvas id="canvas" />
      </Paper>

    );
  }
}

Game.propsTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Game);