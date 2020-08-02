import React, { Component } from 'react'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Card, CardHeader, CardMedia, CardContent, CardActions, 
  MobileStepper, 
  Paper, Collapse, IconButton, Typography, Button, 
} from '@material-ui/core';
import { VictoryBar, VictoryLabel } from 'victory';

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import avatar from '../../images/avatar.png'
import cookie from 'react-cookies'


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 150,
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
    paddingIop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  record: {
    position: 'absolute',
    right: '20%'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 380,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  img: {
    height: 150,
    maxWidth: 200,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
  imgroot: {
    maxWidth: 220,
    flexGrow: 1,
    marginLeft: '50px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
  },

}));

function createDate(game, played, won, tied) {
  return { game, played, won, tied };
}

const rows = [
  createDate('Mole', 50, 30, 5),
  createDate('Tile', 20, 15, 1),
  createDate('Pong', 100, 60, 10),
];

const tutorialSteps = [
  {
    imgPath:
      'https://image.flaticon.com/icons/svg/3231/3231454.svg',
  },
  {
    imgPath:
      'https://image.flaticon.com/icons/svg/3231/3231493.svg',
  },
  {
    imgPath:
      'https://image.flaticon.com/icons/svg/3231/3231553.svg',
  },
  {
    imgPath:
      'https://image.flaticon.com/icons/svg/3231/3231596.svg',
  },
  {
    imgPath:
      'https://image.flaticon.com/icons/svg/3231/3231653.svg',
  },
  {
    imgPath:
      'https://image.flaticon.com/icons/svg/3231/3231623.svg',
  },
  {
    imgPath:
      'https://image.flaticon.com/icons/svg/3231/3231436.svg',
  },
  {
    imgPath:
      'https://image.flaticon.com/icons/svg/3231/3231511.svg',
  },
  {
    imgPath:
      'https://image.flaticon.com/icons/svg/3231/3231589.svg',
  },
  {
    imgPath:
      'https://image.flaticon.com/icons/svg/3231/3231676.svg',
  },
  {
    imgPath:
      'https://image.flaticon.com/icons/svg/3231/3231460.svg',
  },
  {
    imgPath:
      'https://image.flaticon.com/icons/svg/3231/3231482.svg',
  },
];

let sampleData = [
  {x: "두더지잡기", y: 5},
  {x: "구슬동자", y: 7},
  {x: "숫자야구", y: 3},
]

function Mypage() {
  const classes = useStyles();
  const theme = useTheme();
  const [modalStyle] = React.useState(getModalStyle);
  const [expanded, setExpanded] = React.useState(false);
  const [isSetAvatar, setAvatar] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const changeAvatar = () => {
    console.log(activeStep)
  }
  

  return (
      <Card style={modalStyle} className={classes.paper}>
        <CardHeader
          title="Mypage"
          subheader={cookie.load('username')}
        />
        <div className={classes.imgroot}>
          <img
            className={classes.img}
            src={tutorialSteps[activeStep].imgPath}
            alt={tutorialSteps[activeStep].label}
          />
          {
            isSetAvatar
            ? <div>
                <Button variant="contained" color="primary" style={{ marginLeft: '45px' }} onClick={() => {
                  setAvatar(false)
                  changeAvatar()
                }}>아바타 바꾸기</Button>
                <MobileStepper
                  style={{ marginLeft: '-20px'}}
                  steps={maxSteps}
                  position="static"
                  variant="text"
                  activeStep={activeStep}
                  nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                      Next
                      {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                  }
                  backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                      {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                      Back
                    </Button>
                  }
                />
              </div>
            : <Button variant="contained" style={{ marginLeft: '45px' }} onClick={() => setAvatar(true)}>아바타 바꾸기</Button>
          }
          

          
        </div>
        
        <CardActions disableSpacing>
          <div className={classes.record}>게임승률보기</div>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="score"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <VictoryBar polar
          data={sampleData}
          labels={(item) => {
            return `${item.datum.xName} ${item.datum.y * 10}%`
          }}
          width={400} height={400}
          domain={{ x: [0, 7], y: [0, 7] }}
          style={{ 
            data: { fill: "#c43a31", stroke: "black", strokeWidth: 4 },
            // labels: { fill: "white" } 
          }}
          // labelComponent={<VictoryLabel dy={30} />}
          />
        </Collapse>
      </Card>
  )
}

export default Mypage