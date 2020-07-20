import React, { useState } from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.background,
    border: 0,
    fontSize: 16,
    borderRadius: 3,
    boxShadow: theme.boxShadow,
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
}));

const getReadyTheme = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
};

const readyTheme = {
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
};

const BtnContent = ({ setIsReady, isReady }) => {
  const classes = useStyles();

  return (
    <button
      type='button'
      onClick={() => setIsReady((prevState) => !prevState)}
      className={classes.root}
    >
      {isReady ? '가즈아ㅏ' : '준비하세요'}
    </button>
  );
};

const ReadyBtn = () => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div style={{ marginBottom: '15px' }}>
      <ThemeProvider theme={isReady ? readyTheme : getReadyTheme}>
        <BtnContent setIsReady={setIsReady} isReady={isReady} />
      </ThemeProvider>
    </div>
  );
};

export default ReadyBtn;
