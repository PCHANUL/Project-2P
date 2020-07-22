import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Block } from './Block';
import { Ball } from './Ball'

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

 

    this.circle = {
      x: 200,
      y: 200,
      size: 30,
      dx: 5,
      dy: 4,
    }


    this.drawCircle = this.drawCircle.bind(this);
    this.block = new Block(400, 30, 100, 250);
    // this.ball = new Ball(400, 30, 60, 15);

  }
  

   
  
  componentDidMount() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    // 화면크기 재설정 이벤트
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    window.requestAnimationFrame(this.animate.bind(this));
  } 
 
  // 화면크기 재설정 함수
  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth / 1.5;
    this.canvas.height = this.stageHeight / 1.5;

    this.setState({ width: this.canvas.width, height: this.canvas.height })
  }

  drawCircle() {
    this.ctx.beginPath();
    this.ctx.arc(this.circle.x, this.circle.y, this.circle.size, 0, Math.PI * 2);
    this.ctx.fillStyle = 'yellow';
    this.ctx.fill();
  }
  
  animate(t) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawCircle();

    this.circle.x += this.circle.dx;
    this.circle.y += this.circle.dy;

    this.block.draw(this.ctx)
    // this.ball.draw(this.ctx, this.stageWidth, this.stageHeight)
    window.requestAnimationFrame(this.animate.bind(this));

    // Detect side walls
    if(this.circle.x + this.circle.size > this.canvas.width || this.circle.x - this.circle.size < 0) {
      this.circle.dx *= -1; // circle.dx = circle.dx * -1
    } 
    if(this.circle.y + this.circle.size > this.canvas.height || this.circle.y - this.circle.size < 0) {
      this.circle.dy *= -1; // circle.dx = circle.dy * -1
    } 

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