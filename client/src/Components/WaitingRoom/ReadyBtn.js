import React from 'react';
import { connect } from 'react-redux';
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

const BtnContent = ({ readyHandler, isReady, username, currentUsername }) => {
  const classes = useStyles();
  return (
    <button
      type='button'
      onClick={() => {
        if (currentUsername === username) {
          readyHandler(username);
        }
      }}
      className={classes.root}
    >
      {isReady ? '가즈아ㅏ' : '준비하세요'}
    </button>
  );
};

const ReadyBtn = ({ isReady, readyHandler, username, login }) => {
  return (
    <div style={{ marginBottom: '15px' }}>
      <ThemeProvider theme={isReady ? readyTheme : getReadyTheme}>
        <BtnContent
          readyHandler={readyHandler}
          isReady={isReady}
          username={username}
          currentUsername={login.username}
        />
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};
export default connect(mapStateToProps)(ReadyBtn);
