import React from 'react'
import { useHistory } from 'react-router-dom'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';

import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';

import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import GroupIcon from '@material-ui/icons/Group';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import Badge from '@material-ui/core/Badge';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 700,
    maxHeight: 200,
    margin: theme.spacing(0, 2, 2),
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  section1: {
    margin: theme.spacing(2, 3),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
  enter: {
    margin: '10px'
  },
  count: {
    padding: theme.spacing(0, 2, 0, 0),
  },
}));

export default function RoomList({ roomName, isWait, isLocked, isFull }) {
  const classes = useStyles();
  const history = useHistory();
  const [spacing, setSpacing] = React.useState(2);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    
    <Grid container direction="column" justify="space-evenly" alignItems="center">
    <Paper className={classes.root} elevation={2} >
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid>
            <Chip label={ isWait ? "Waiting" : "Playing"} variant="outlined" color={ isWait ? "primary" : "secondary"} />
          </Grid>
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              { roomName }
              {
                isLocked
                ? <LockIcon style={{ fontSize: 30 }} />
                : <LockOpenIcon style={{ fontSize: 30 }} />
              }
            </Typography>
          </Grid>
          <Grid item>
            <Grid item container direction="row" justify="center" alignItems="center">
              {
                isFull
                ? <div>
                    <Typography className={classes.count} variant="h5">
                      <HowToRegIcon />
                      2/2
                    </Typography>
                    <Button  variant="contained" color="primary" disabled>
                      입장하기
                    </Button>
                  </div>
                : <div>
                    <Typography className={classes.count} variant="h5">
                      <EmojiPeopleIcon />
                      1/2
                    </Typography>
                    <Button  variant="contained" color="primary" onClick={() => history.push('/waitingroom')}>
                      입장하기
                    </Button>
                  </div>
              }
              
              {/* <Button  variant="contained" color="primary" >
                입장하기
              </Button> */}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Paper>
    </Grid>
  );
}

