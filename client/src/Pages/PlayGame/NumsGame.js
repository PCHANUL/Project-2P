import React, { Component } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import Gameover from '../../Components/PlayGame/Gameover';
import MoleScoreCard from '../../Components/PlayGame/MoleScoreCard';

import Paper from '@material-ui/core/Paper';
import { 
  Grid, 
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { isDeleteExpression } from 'typescript';
import BackspaceIcon from '@material-ui/icons/Backspace';

import { KeyPad } from './keyPad';
import hemmer from '../../images/hemmer.png';
import clicked from '../../images/clicked.png';

import avatar from '../../images/bald.png'
import avatar2 from '../../images/gas-mask.png'




const styles = (theme) => ({
  Paper: {
    // border: '20px solid #06cdd4',
    borderRadius: '40px',
    // boxShadow: theme.shadows[20],
    backgroundColor: 'white',
    margin: theme.spacing(3, 3),
    background: '#00babd'
  },
  root: {
    padding: theme.spacing(2, 4, 4, 4),
    backgroundColor: 'white',
    borderRadius: '30px',
    height: '100%',
  },
  avatar: {
    width: theme.spacing(15), 
    height: theme.spacing(13), 
    marginLeft: '10px'
  },
  pos: {
    color: '#000',
    marginBottom: '10px'
  },
  table: {
    width: '100%',
    font: '5px'
  },

});

let blockX;
let dx = 10;
let preKey;
let numPad = [];
let resultPad = [];

class NumsGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: '',
      myScore: 0,
      opponentScore: 0,
      opponentUsername: '',
      width: (document.body.clientWidth / 4),
      height: (document.body.clientWidth / 2),
      currentMole: 0,
      clickedNums: 0,

      rounds: []
    };
    this.canvas = null;
    this.ctx = null;
    this.stageWidth = null;
    this.stageHeight = null;

    this.clicked = true;
    this.radius = this.state.width / 12;

    this.cursorX = null;
    this.cursorY = null;
    this.cursorEnter = false;
    this.cursorClick = false;

    this.gifCount = 0;
    this.check = false;

    // socket connection endpoint
    this.socket = io('http://localhost:3002');

    for (let i = 0; i < 13; i++) {
      numPad.push(
        new KeyPad(this.state.width, this.state.height, this.state.width/10, i)
      );
    }
  }

  componentDidMount() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.hemmer = document.getElementById('hemmer');
    this.clickedCursor = document.getElementById('clicked');

    let rows = [
      this.createDate(2344, 1, 2, 1),
      this.createDate(2344, 1, 2, 1),
      this.createDate(2344, 1, 2, 1),
      // this.createDate(2344, 1, 2, 1),
      // this.createDate(2344, 1, 2, 1),
    ]

    this.setState({ rounds: rows })

    // 화면크기 재설정 이벤트
    // window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();
    window.requestAnimationFrame(this.animate.bind(this));

    this.canvas.addEventListener(
      'mousedown',
      (e) => {
        this.mousePressed(e.layerX, e.layerY);
        this.cursorClick = true;
      },
      false
    );

    this.canvas.addEventListener(
      'mouseup',
      (e) => {
        this.cursorClick = false;
      },
      false
    );

    this.canvas.addEventListener('mousemove', (e) => {
      this.cursorEnter = true;
      this.cursorX = e.layerX;
      this.cursorY = e.layerY;
    });

    this.canvas.addEventListener('mouseleave', (e) => {
      this.cursorEnter = false;
    });

    document.addEventListener('keydown', (e) => {
      console.log('awefawef', e)
      this.check = !this.check
    });

    // socket connection
    this.socket.emit('gameStart', cookie.load('username'), 'someRoomId');
    this.socket.on('generateMole', (index) => {
      this.setState({ currentMole: this.state.currentMole + 1 });
      this.randomMole(index);
    });
    this.socket.on('updateScore', (data) => {
      /**
       * data = {
       *    index: 0~15,
       *    score: {
       *      player1: 0,
       *      player2: 10,
       *    }
       * }
       */
      numPad[data.index].hideMole();
      const [player1, player2] = Object.keys(data.score);
      if (player1 === cookie.load('username')) {
        this.setState({ myScore: data.score[player1], opponentScore: data.score[player2] });
      } else {
        this.setState({ myScore: data.score[player2], opponentScore: data.score[player1] });
      }
    });
    this.socket.on('gameover', (data) => {
      // data = username
      this.setState({ winner: data });
    });
    this.socket.on('init', ([usernames, currentMole, score]) => {
      const opponentUsername = usernames.filter((username) => cookie.load('username') !== username);
      const players = Object.keys(score);
      let myScore, opponentScore;
      players.forEach((player) => {
        if (player === cookie.load('username')) {
          myScore = score[player];
        } else {
          opponentScore = score[player];
        }
      });
      this.setState({ opponentUsername, currentMole, myScore, opponentScore });
    });
  }

  componentWillUnmount() {
    numPad = [];
    this.socket.disconnect();
  }

  mousePressed(mouseX, mouseY) {
    for (let i = 0; i < numPad.length; i++) {
      // 키 패드 클릭
      let clickedMole = numPad[i].clicked(mouseX, mouseY, i, this.ctx);
      console.log(clickedMole)

      if (clickedMole) {
        const data = {
          gameRoomId: 'someRoomId',
          currentMole: this.state.currentMole,
          username: cookie.load('username'),
          index: clickedMole,
        };
        this.socket.emit('moleClick', data);
      }
    }
  }

  defineRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  createDate(number, strike, ball, out) {
    return { number, strike, ball, out };
  }

  


  // 화면그리기
  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    // numPad의 모든 요소를 각자의 위치에 생성
    for (let i = 0; i < numPad.length; i++) {
      numPad[i].draw(this.ctx, this.canvas.width, this.canvas.height, i);
    }

    this.ctx.fillStyle = '#fff'
    this.ctx.lineWidth = 1;
    this.ctx.shadowColor = '#c9c9c9';
    this.ctx.shadowBlur = 8;
    this.ctx.fillRect(this.state.width / 3.8, this.state.height / 14, this.state.width / 1.6, this.state.height / 3)
    
    this.ctx.shadowBlur = 0;

    this.ctx.fillStyle = '#000';
    this.ctx.font = `900 ${this.radius * 1.8}px san serif`;
    this.ctx.fillText('O', this.state.width / 9, this.state.height / 6.5)
    this.ctx.fillText('B', this.state.width / 9, this.state.height / 3.7)
    this.ctx.fillText('S', this.state.width / 9 * 1.1, this.state.height / 2.6)


    // let x = this.state.width / 5 + (this.state.width / 5) * (0)
    // let y = this.state.height / 2;

    // this.ctx.fillStyle = '#fff'
    // this.ctx.beginPath();
    // this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
    // this.ctx.lineWidth = 5;
    // this.ctx.fill();

    // this.ctx.shadowBlur = 0;
    // // 텍스트
    // this.ctx.fillStyle = '#000';
    // this.ctx.font = `${this.radius}px serif`;
    // this.ctx.fillText(`${9}`, x - this.radius/2.7, y + this.radius/2.7)



    for(let j=0; j<1; j++){
      // 위치
      let x = this.state.width / 2.8 + (this.state.width / 7) * (j)
      let y = this.state.height / 8;

      this.ctx.fillStyle = '#f50000';
      this.ctx.shadowColor = '#f50000';
      this.ctx.shadowBlur = 10;
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.radius * 3/4, 0, 2 * Math.PI);
      this.ctx.fill();

      this.ctx.shadowBlur = 0;
    }

    for(let j=0; j<2; j++){
      // 위치
      let x = this.state.width / 2.8 + (this.state.width / 7) * (j)
      let y = this.state.height / 8 + this.state.height / 9;

      this.ctx.fillStyle = '#ffee00';
      this.ctx.shadowColor = '#ffee00';
      this.ctx.shadowBlur = 10;
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.radius * 3/4, 0, 2 * Math.PI);
      this.ctx.fill();

      this.ctx.shadowBlur = 0;
    }

    for(let j=0; j<1; j++){
      // 위치
      let x = this.state.width / 2.8 + (this.state.width / 7) * (j)
      let y = this.state.height / 8 + this.state.height * 2 / 9 ;

      this.ctx.fillStyle = '#00e026';
      this.ctx.shadowColor = '#00e026';
      this.ctx.shadowBlur = 10;
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.radius * 3/4, 0, 2 * Math.PI);
      this.ctx.fill();

      this.ctx.shadowBlur = 0;
    }



    // 입력되는 숫자 표시
    for(let j=0; j<4; j++){
      // 위치
      let x = this.state.width / 6.5 + (this.state.width / 7) * (j)
      let y = this.state.height / 2;

      this.ctx.fillStyle = '#fff'
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
      this.ctx.fill();

      this.ctx.shadowBlur = 0;
      // 텍스트
      this.ctx.fillStyle = '#000';
      this.ctx.font = `${this.radius * 1.5}px serif`;
      this.ctx.fillText(`${j}`, x - this.radius/2.7, y + this.radius/2.7)
    }


    
    // x = this.state.width / 5 + (this.state.width / 5) * (3)
    // y = this.state.height / 2;

    // this.ctx.fillStyle = '#fff'
    // this.ctx.beginPath();
    // this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
    // this.ctx.fill();

    // // 텍스트
    // this.ctx.fillStyle = '#000';
    // this.ctx.font = `${this.radius}px serif`;
    // this.ctx.fillText(`${6}`, x - this.radius/2.7, y + this.radius/2.7)



    // this.defineRoundedRect(this.ctx, this.state.width/6, this.state.height / 1.15, this.radius * 7, this.radius * 2, this.radius);
    // this.ctx.fillStyle = '#fff';
    // this.ctx.shadowColor = '#c9c9c9';
    // this.ctx.shadowBlur = 8;
    // this.ctx.shadowOffsetY = -5;
    // this.ctx.fill();
    
    // this.ctx.shadowBlur = 0;
    // this.ctx.shadowOffsetY = 0;
    // this.ctx.fillStyle = '#000';
    // this.ctx.font = '30px serif';
    // this.ctx.fillText('제출하기', this.state.width/3.5, this.state.height / 1.05)
    

    // 마우스가 canvas에 들어온 경우 망치이미지 생성
    // if (this.cursorEnter) {
    //   if (this.cursorClick) {
    //     this.ctx.drawImage(this.clickedCursor, this.cursorX - 20, this.cursorY - 40, 50, 50);
    //   } else {
    //     this.ctx.drawImage(this.hemmer, this.cursorX - 20, this.cursorY - 40, 50, 50);
    //   }
    // }
  }

  // 화면크기 재설정 함수
  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = Math.floor(this.stageWidth / 4);
    this.canvas.height = Math.floor(this.stageWidth / 2.4);

    this.setState({ width: this.canvas.width, height: this.canvas.height });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container direction='row' justify='space-evenly' alignItems='center'>
        {this.state.winner !== '' ? <Gameover winner={this.state.winner} /> : null}

        <Grid item>
          <Paper className={classes.root} style={{ 
            marginLeft: '40px', 
            width:`${document.body.clientWidth/5}px`, 
            boxShadow: '0px 0px 20px 0px #ffce52',
          }}> 
            <Typography className={classes.pos} variant='h2' component='h2'>
              {'60'}
            </Typography>
            <Grid container direction='column' justify='center' alignItems='center'>
              <img src={avatar2} className={classes.avatar}></img>
              <Typography className={classes.pos} variant='h5' component='h2'>
                {'Rival'}
              </Typography>


              <TableContainer component={Paper} style={{ overflowBlock: 'scroll' }}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell >number</TableCell>
                      <TableCell align="center">Strike</TableCell>
                      <TableCell align="center">Ball</TableCell>
                      <TableCell align="center">Out</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      this.state.rounds[0]
                      ? this.state.rounds.map((round) => (
                          <TableRow key={round.number} hover='true' >
                            <TableCell component="th" scope="row">
                              {round.number}
                            </TableCell>
                            <TableCell align="center">{round.strike}</TableCell>
                            <TableCell align="center">{round.ball}</TableCell>
                            <TableCell align="center">{round.out}</TableCell>
                          </TableRow>))
                      : null
                    }
                  </TableBody>
                </Table>
              </TableContainer>


            </Grid>
          </Paper>
        </Grid>

        <Paper id='paper' style={{
            width: this.state.width,
            height: this.state.height,
            // cursor: 'none',
          }} className={classes.Paper} >
          <canvas id='canvas' />
          <img id='hemmer' src={hemmer} style={{ width: '40px', display: 'none' }} />
          <img id='clicked' src={clicked} style={{ width: '40px', display: 'none' }} />
        </Paper>

        <Grid item>
          <Paper className={classes.root} style={{ 
            marginRight: '40px', 
            boxShadow: '0px 0px 20px 0px #d6d6d6',
          }}> 
            <Typography className={classes.pos} variant='h2' component='h2'>
              {'대기'}
            </Typography>
            <Grid container direction='column' justify='center' alignItems='center'>
              <img src={avatar} className={classes.avatar}></img>
              <Typography className={classes.pos} variant='h5' component='h2'>
                {'you'}
              </Typography>


              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>number</TableCell>
                      <TableCell align="center">Strike</TableCell>
                      <TableCell align="center">Ball</TableCell>
                      <TableCell align="center">Out</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      this.state.rounds[0]
                      ? this.state.rounds.map((round) => (
                          <TableRow key={round.number} hover='true'>
                            <TableCell component="th" scope="row">
                              {round.number}
                            </TableCell>
                            <TableCell align="center">{round.strike}</TableCell>
                            <TableCell align="center">{round.ball}</TableCell>
                            <TableCell align="center">{round.out}</TableCell>
                          </TableRow>))
                      : null
                    }
                  </TableBody>
                </Table>
              </TableContainer>


            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

NumsGame.propsTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NumsGame);
