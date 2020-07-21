import React, { useState, useEffect } from 'react';

const ReadyProgress = () => {
  const [timer, setTimer] = useState(5);
  useEffect(() => {
    if (timer >= 1) {
      setTimeout(() => {
        setTimer((prevState) => prevState - 1);
      }, 1000);
    }
  }, [timer]);
  // return (
  //  <div className='centered'>GAME STARTS IN {timer}</div>
  // )
  return timer > 0 ? <div className='centered'>GAME STARTS IN {timer}</div> : null;
};

export default ReadyProgress;
