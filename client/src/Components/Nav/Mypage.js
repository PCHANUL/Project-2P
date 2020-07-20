import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import avatar from './avatar.png'


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
    width: 400,
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
  }

}));

function createDate(game, played, won, tied) {
  return { game, played, won, tied };
}

const rows = [
  createDate('Mole', 50, 30, 5),
  createDate('Tile', 20, 15, 1),
  createDate('Pong', 100, 60, 10),
];


function Mypage() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }
  
  return (
      <Card style={modalStyle} className={classes.paper}>
        <CardHeader
          title="Mypage"
          subheader="오마이갇"
        />
        <CardMedia
          className={classes.media}
          image={avatar}
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">select avatar</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="select avatar"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <CardContent>
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </CardContent>
        <CardActions disableSpacing>
          <div className={classes.record}>게임성적보기</div>
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
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Game</TableCell>
                  <TableCell align="right">played</TableCell>
                  <TableCell align="right">won</TableCell>
                  <TableCell align="right">tied</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">{row.game}</TableCell>
                      <TableCell align="right">{row.played}</TableCell>
                      <TableCell align="right">{row.won}</TableCell>
                      <TableCell align="right">{row.tied}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Collapse>
      </Card>
  )
}

export default Mypage