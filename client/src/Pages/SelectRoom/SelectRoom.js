import React from 'react';
import RoomList from '../../Components/SelectRoom/RoomList'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import RefreshIcon from '@material-ui/icons/Refresh';


function createDate(roomName, isWait, isLocked, isFull) {
  return { roomName, isWait, isLocked, isFull };
}

const rows = [
  createDate('드루와', true, false, false),
  createDate('드루와라', false, true, true),
  createDate('야!타', true, true, true),
  createDate('늬 내가누군지아니?', false, false, true),
  createDate('매너겜좀합시다', true, false, false),
  createDate('6학녕1반', true, true, false),
  createDate('드루와', true, false, false),
  createDate('드루와', true, false, false),
  createDate('드루와', true, false, false),
]; 

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  refresh: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(11),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
}));

export default function SelectRoom() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Game one" />
          <Tab label="Game Two" />
          <Tab label="Game Three" />
        </Tabs>
      </Paper>
      <div className={classes.section1}>
      {
        rows.map((row) => (
          <RoomList 
            roomName={row.roomName} 
            isWait={row.isWait}
            isLocked={row.isLocked}
            isFull={row.isFull}
          />
        ))
      }
      </div>
      <Tooltip title="방만들기" aria-label="add">
        <Fab color="secondary" className={classes.absolute}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="새로고침" aria-label="add">
        <Fab color="primary" className={classes.refresh}>
          <RefreshIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

