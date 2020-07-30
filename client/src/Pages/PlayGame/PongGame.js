import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Block } from './Block';
import { RivalBlock } from './RivalBlock';
import { Ball } from './Ball'
import { isDeleteExpression } from 'typescript';
import cookie from 'react-cookies';
import socketio from 'socket.io-client';
let socket
const styles = (theme) => ({
  Paper: {
    backgroundColor: 'black',
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    margin: theme.spacing(3, 3),

  }
});
let dx = 20
let preKey
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 100,
      width: Math.floor(document.body.clientWidth / 4),
      height: Math.floor(document.body.clientHeight / 1.2),
    }
    //초기화
    this.canvas = null;
    this.ctx = null;
    this.stageWidth = null;
    this.stageHeight = null;
    // Block
    this.blockSizeX = this.state.width / 3;
    this.blockSizeY = this.state.height / 35;
    this.blockPosX = (this.state.width / 2) - (this.blockSizeX / 2);
    this.blockPosY = Math.floor(this.state.height * 4.5 / 5);
    this.blockPosInitX = (this.state.width / 2) - (this.blockSizeX / 2);
    // Rival Block
    this.RivalSizeX = this.state.width / 3;
    this.RivalSizeY = this.state.height / 35;
    this.RivalPosX = (this.state.width / 2) - (this.RivalSizeX / 2);
    this.RivalPosY = Math.floor(this.state.height / 12);
    this.RivalPosInitX = (this.state.width / 2) - (this.RivalSizeX / 2);

    // Ball
    this.ballRadius = this.state.width / 20;
    this.ballSpeed = this.state.width / 100;

    // mouse
    this.mousePos = 0;

    // pre date
    this.prePercent = 0;
  }

  componentDidMount() {
    socket = socketio.connect('http://localhost:3005');
    (() => {
      socket.emit('joinRoom', {
        username: cookie.load('username'),
        room: cookie.load('selectedRoom'),
      });
    })();
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.ball = new Ball(this.state.width, this.state.height, this.ballRadius, this.ballSpeed)
    this.block = new Block(this.blockSizeX, this.blockSizeY, this.blockPosX, this.blockPosY, this.state.width, this.state.height);
    this.Rivalblock = new RivalBlock(this.RivalSizeX, this.RivalSizeY, this.RivalPosX, this.RivalPosY, this.state.width, this.state.height);

    this.resize();
    window.requestAnimationFrame(this.animate.bind(this));
    
    // this.canvas.addEventListener('mousemove', (e) => {
    //   this.mousePos = this.mousePos - e.layerX
    //   this.RivalPosX = this.RivalPosX + this.mousePos 
    //   this.mousePos = e.layerX
    // })

    this.canvas.addEventListener('mousemove', (e) => {
      if(e.movementX !== 0){
        this.blockPosX = Math.floor(e.layerX - this.blockSizeX)
        this.RivalPosX = Math.floor(e.layerX - this.RivalSizeX)
      }
      let posPercent = Number((this.blockPosX / this.state.width).toFixed(2));
      if(this.prePercent !== posPercent){
        socket.emit('mouseMove', posPercent);
        this.prePercent = posPercent
      }
    });
    // socket.on('myMove', (e) => {
    //   // this.mousePos = e
    //   // this.blockPosX = e * this.state.width
    //   // this.mousePos = e
    // });
    socket.on('rivalMove', (e) => {
      this.RivalPosX = ((1 - e) * this.state.width) - this.RivalSizeX
    });
    document.addEventListener('keydown', (e) => {
      if(e.keyCode === 65){
        // this.ball.stoppp(true)
        // this.initPos()
        socket.emit('start', true);
      }
    });
    socket.on('start', (x) => {
      this.ball.stoppp(x)
      this.initPos()
    })
  } 

  // 게임소켓 분리
  // componentWillUnmount() {
  //   (() => {
  //     socket.emit('disconnect');
  //   })();
  // }

  // 화면크기 재설정 함수
  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
 
    this.canvas.width = Math.floor(this.stageWidth / 4);
    this.canvas.height = Math.floor(this.stageHeight / 1.2);

    this.setState({ width: this.canvas.width, height: this.canvas.height })
  }

  // block 위치 재설정
  initPos() {
    this.blockPosX = this.blockPosInitX;
    this.RivalPosX = this.RivalPosInitX
  }
  // 애니메이션 생성
  animate(t) {
    // 블록의 윈도우 충돌 핸들링
    if(this.blockPosX < 0){
      this.blockPosX = 0
    } else if(this.blockPosX > this.state.width - this.blockSizeX){
      this.blockPosX = this.state.width - this.blockSizeX
    } if(this.RivalPosX < 0){
      this.RivalPosX = 0
    } else if(this.RivalPosX > this.state.width - this.RivalSizeX){
      this.RivalPosX = this.state.width - this.RivalSizeX
    }
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.state.width, this.state.height)

    // Block
    this.ctx.shadowColor = '#707070';
    this.ctx.shadowBlur = 30;
    this.Rivalblock.draw(this.ctx, this.RivalPosX, this.RivalPosY)
    this.block.draw(this.ctx, this.blockPosX, this.blockPosY)

    // Ball
    this.ctx.shadowColor = '#ffff8c';
    this.ctx.shadowBlur = 5;
    // this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    // this.ctx.fillRect(0, 0, this.state.width, this.state.height);
    const response = this.ball.draw(
      this.ctx, this.state.width, this.state.height, 
      this.blockPosX, this.blockPosY, this.blockSizeX, this.blockSizeY,
      this.RivalPosX, this.RivalPosY, this.RivalSizeX, this.RivalSizeY,
    ) 
    // 게임결과 출력시 화면 초기화
    if(response){
      console.log(response)
      // this.ball.stoppp(true)
      // this.initPos()
      socket.emit('start', 'awefawef');
    }
  }


  render() {
    const { classes } = this.props;
    return (
      <Paper id="paper" style={{
        width: this.state.width,
        height: this.state.height,
        cursor: 'none',
        boxShadow: '1px 1px 100px 0px #707070',
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