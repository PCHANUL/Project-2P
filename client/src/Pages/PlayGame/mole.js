import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Block } from './Block';
import { Ball } from './Ball'
import { isDeleteExpression } from 'typescript';

import { Bubble } from './Bubble'
import hemmer from '../../images/hemmer.png'
import clicked from '../../images/clicked.png'
import { Gif } from '@material-ui/icons';

let gif = [];

const styles = (theme) => ({
  Paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    margin: theme.spacing(3, 3),
  }
});

let blockX
let dx = 10
let preKey
let bubbles = [];


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

    this.clicked = false;

    this.cursorX = null;
    this.cursorY = null;
    this.cursorEnter = false;
    this.cursorClick = false;

    this.gifCount = 0;
     
    for(let i=0; i<16; i++){
      bubbles.push(new Bubble(document.body.clientWidth / 1.5, document.body.clientHeight / 1.5, 15, i))
    }
  }
  
  
  
  componentDidMount() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.hemmer = document.getElementById('hemmer')
    this.clickedCursor = document.getElementById('clicked')
    this.gifitem = document.getElementById('gif')
    this.giftest = [];

    // 분리된 gif의 png를 배열에 추가
    var req = require.context('../../images/gif', false, /.*\.png$/);
    req.keys().forEach(function(key) {
      gif.push(req(key))
    });
    
    // 화면크기 재설정 이벤트
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();
    window.requestAnimationFrame(this.animate.bind(this));
    
    this.canvas.addEventListener('mousedown', (e) => {
      this.mousePressed(e.layerX, e.layerY)
      this.cursorClick = true;
    }, false)
    
    this.canvas.addEventListener('mouseup', (e) => {
      this.cursorClick = false;
    }, false)
    
    this.canvas.addEventListener('mousemove', (e) => {
      this.cursorEnter = true;
      this.cursorX = e.layerX;
      this.cursorY = e.layerY;
    })
    
    this.canvas.addEventListener('mouseleave', (e) => {
      this.cursorEnter = false;
    })
  } 
 
  mousePressed(mouseX, mouseY) {
    if(!this.clicked){
      this.randomColored()
      this.clicked = true
    }

    for (let i=0; i<bubbles.length; i++){
      bubbles[i].clicked(mouseX, mouseY, i, this.ctx)
    }
  }

  randomColored() {
    let ranNum = this.getRandomInt()
    setTimeout(() => {
      bubbles[ranNum].colored()
      this.randomColored()
    }, 3000);
  }

  getRandomInt() {
    let min = Math.ceil(0);
    let max = Math.floor(15);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }
  
  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
    
    for (let i=0; i< bubbles.length; i++){
      bubbles[i].draw(this.ctx, this.canvas.width, this.canvas.height, this.gifCount);
      bubbles[i].move()
    }

    // gif 움직임 생성
    this.gifCount += 1
    if(this.gifCount === 47) this.gifCount = 0;
    let imgtest = new Image();
    imgtest.src = gif[this.gifCount]
    this.ctx.drawImage(imgtest, 10, this.canvas.height-50, 70, 50)

    if(this.cursorEnter){
      if(this.cursorClick){
        this.ctx.drawImage(this.clickedCursor, this.cursorX-20, this.cursorY-40, 50, 50)
      } else {
        this.ctx.drawImage(this.hemmer, this.cursorX-20, this.cursorY-40, 50, 50)
      }
    }
  }
  
  // 화면크기 재설정 함수
  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
 
    this.canvas.width = this.stageWidth / 1.5;
    this.canvas.height = this.stageHeight / 1.5;

    this.setState({ width: this.canvas.width, height: this.canvas.height })
  }

  
  render() {
    const { classes } = this.props;

    return (
      <Paper id="paper" style={{
        width: this.state.width,
        height: this.state.height,
        cursor: 'none',
        }} className={classes.Paper}>
        <canvas id="canvas" />
        <img id='hemmer' src={hemmer} style={{width: '40px', display: 'none'}}/>
        <img id='clicked' src={clicked} style={{width: '40px', display: 'none'}}/>
      </Paper>

    );
  }
}

Game.propsTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Game);