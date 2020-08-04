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
      count: 60,

      resultPad: [],
      rounds: [],

      RivalNums: [],
      myNums: [],

      board: true,
      myTurn : true,
      wrongInput: false,
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

    this.out = false;
    this.result = false;

    this.numPad = [];
    

    // socket connection endpoint
    this.socket = io('http://localhost:3002');

    for (let i = 0; i < 14; i++) {
      this.numPad.push(
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
    this.resize();
    window.requestAnimationFrame(this.animate.bind(this));

    // 마우스 클릭이벤트
    this.canvas.addEventListener(
      'mousedown',
      (e) => {
        if(this.state.myTurn){
          this.mousePressed(e.layerX, e.layerY);
        }
      },
      false
    );

    this.canvas.addEventListener(
      'mouseup',
      (e) => {
      },
      false
    );

    // 마우스 움직임
    this.canvas.addEventListener('mousemove', (e) => {
      this.cursorEnter = true;
      this.cursorX = e.layerX;
      this.cursorY = e.layerY;
    });

    this.canvas.addEventListener('mouseleave', (e) => {
      this.cursorEnter = false;
    });

    // 키입력 이벤트
    document.addEventListener('keydown', (e) => {
      if(e.keyCode === 81){
        this.out = !this.out
      }
      if(e.keyCode === 87){
        this.result = !this.result
      }
      if(e.keyCode === 84){
        let a = !this.state.myTurn
        this.turnChange(a)
      }

      // 처리된 데이터를 받는다.
      if(e.keyCode === 65){   // Rival data
        this.setState({ board: false })
        let input = { number: 1234, result: '1S 3B'}
        this.setState({ RivalNums: [...this.state.RivalNums, input]})
        this.out = true;
        this.inputResult()
      }
      if(e.keyCode === 83){   // My data
        this.setState({ board: false })
        let input = { number: 1234, result: '1S 3B'}
        this.setState({ myNums: [...this.state.myNums, input]})
        this.result = true;
        this.inputResult()
      }
      
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
      this.numPad[data.index].hideMole();
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
    this.numPad = [];
    this.socket.disconnect();
  }

  eraseAll() {
    this.state.resultPad.map((item) => {
      this.numPad[item].removed()
    })
    this.setState({ resultPad: [] })
  }

  mousePressed(mouseX, mouseY) {
    for (let i = 0; i < this.numPad.length; i++) {
      // 키 패드 클릭
      let clickedMole = this.numPad[i].clicked(mouseX, mouseY, i, (this.state.resultPad.length === 4));
      
      if (clickedMole || clickedMole === 0) {
        if(this.state.resultPad.includes(clickedMole) === false) {
          // 하나의 입력된 숫자를 제거
          if (clickedMole === 11) {
            let del = [...this.state.resultPad]
            let deleted = del.pop()
            if(deleted){
              this.numPad[deleted].removed();
              this.setState({ resultPad: [...del] })
            }
          } 
          // 모든 입력된 숫자를 제거
          else if (clickedMole === 12) {
            this.eraseAll()
          }
          // 입력된 값들을 서버로 전송
          else if (clickedMole === 13) {
            if(this.state.resultPad.length === 4){  
              let result = ''
              this.state.resultPad.map((item) => {
                result = result + String(item)
              })
              // 서버로 전송
              console.log(result)

              // 입력된 버튼 초기화
              this.eraseAll()
              // 현황판을 끈다
              this.setState({ board: false })
            } else {
              this.setState({ wrongInput: true })
              setTimeout(() => this.setState({ wrongInput: false }), 2000)
            }
          }

          // 입력된 숫자를 화면에 출력
          else if (this.state.resultPad.length !== 4){
            this.setState({ resultPad: [ ...this.state.resultPad, clickedMole]})
          }
        }


        // socket data
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

  inputResult() {
    if (this.result) {
      let text = this.state.myNums[this.state.myNums.length - 1].result
      this.ctx.fillText(`${text}`, this.state.width / 4.5, this.state.height / 3)
      setTimeout(() => {
        this.setState({ board: true });
        this.result = false;
      }, 2000)
    }
    if (this.out) {
      let text = this.state.RivalNums[this.state.RivalNums.length - 1].result
      this.ctx.fillText(`${text}`, this.state.width / 4.5, this.state.height / 3)
      setTimeout(() => {
        this.setState({ board: true });
        this.out = false;
      }, 2000)
    }

  }
  
  // 일정 시간 후에 현황판 출력
  printBoard() {
    // 유저가 입력한 게임결과 출력
    this.state.myNums.map((item, index) => {
      this.ctx.font = `700 ${this.radius * 0.9}px san serif`;
      this.ctx.fillText(`${ item.number }`, this.state.width / 1.8, this.state.height / 8 + (this.state.height/13 * index));
      
      this.ctx.font = `300 ${this.radius * 0.6}px san serif`;
      this.ctx.fillText(`${ item.result }`, this.state.width / 1.4, this.state.height / 8 + (this.state.height/13 * index));
    })

    // 상대방이 입력한 게임결과 출력
    this.state.RivalNums.map((item, index) => {
      this.ctx.font = `700 ${this.radius * 0.9}px san serif`;
      this.ctx.fillText(`${ item.number }`, this.state.width / 7, this.state.height / 8 + (this.state.height/13 * index))
      
      this.ctx.font = `300 ${this.radius * 0.6}px san serif`;
      this.ctx.fillText(`${ item.result }`, this.state.width / 3.3, this.state.height / 8 + (this.state.height/13 * index))
    })
  }


  // 화면그리기
  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    // this.numPad의 모든 요소를 각자의 위치에 생성
    for (let i = 0; i < this.numPad.length; i++) {
      this.numPad[i].draw(this.ctx, this.canvas.width, this.canvas.height, i);
    }

    this.ctx.fillStyle = '#fff'
    this.ctx.lineWidth = 1;
    this.ctx.shadowColor = '#c9c9c9';
    this.ctx.shadowBlur = 8;
    this.ctx.fillRect(this.state.width / 12, this.state.height / 15, this.state.width / 1.2, this.state.height / 2.5)
    
    this.ctx.shadowBlur = 0;

    this.ctx.fillStyle = '#000';
    this.ctx.font = `900 ${this.radius * 3}px san serif`;


    // 채점결과출력
    this.inputResult()
    
    if(this.state.board){
      this.printBoard()
    }



    // 클릭된 숫자 출력
    this.state.resultPad.map(( num, index ) => {
      let x = this.state.width / 6.5 + (this.state.width / 7) * (index)
      let y = this.state.height / 1.8;

      this.ctx.fillStyle = '#fff'
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
      this.ctx.fill();

      this.ctx.shadowBlur = 0;
      // 텍스트
      this.ctx.fillStyle = '#000';
      this.ctx.font = `${this.radius * 1.5}px serif`;
      this.ctx.fillText(`${num}`, x - this.radius/2.7, y + this.radius/2.7)
    })
   


    
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

  turnChange(isMyturn) {
    this.setState({ myTurn: isMyturn})
    this.countdown()
  }

  countdown() {
    // 이전 카운트다운을 취소, 초기화
    clearInterval(this.timer)
    this.setState({ count: 60 })

    // 카운트다운 시작
    this.timer = setInterval(() => {
      this.setState({ count: this.state.count - 1})
      if(this.state.count === 0){
        clearInterval(this.timer)
      }
    }, 1000);
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container direction='row' justify='space-evenly' alignItems='center'>
        {this.state.winner !== '' ? <Gameover winner={this.state.winner} /> : null}

        <Grid item>
          <Paper className={classes.root} style={{ 
            marginLeft: '40px', 
            width:`${document.body.clientWidth/9}px`, 
            boxShadow: `0px 0px 20px 0px ${this.state.myTurn ? '#d6d6d6' : '#0067c2'}`,
          }}> 
            <Typography className={classes.pos} variant='h2' component='h2'>
              {
                this.state.myTurn
                ? '대기'
                : this.state.count
              }
            </Typography>
            <Grid container direction='column' justify='center' alignItems='center'>
              <img src={avatar2} className={classes.avatar}></img>
              <Typography className={classes.pos} variant='h5' component='h2'>
                {'Rival'}
              </Typography>
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
            width:`${document.body.clientWidth/9}px`, 
            boxShadow: `0px 0px 20px 0px ${
              this.state.wrongInput
              ? '#ff5c5c'
              : this.state.myTurn ? '#0067c2' : '#d6d6d6'
            }`,
          }}> 
            
              {
                this.state.wrongInput
                ? <Typography className={classes.pos} variant='h6'>
                    4자리를<br />입력하세요
                  </Typography>
                : <Typography className={classes.pos} variant='h2' component='h2'>
                    {this.state.myTurn ? this.state.count : '대기'}
                  </Typography>
              }
            <Grid container direction='column' justify='center' alignItems='center'>
              <img src={avatar} className={classes.avatar}></img>
              <Typography className={classes.pos} variant='h5' component='h2'>
                {'you'}
              </Typography>
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
