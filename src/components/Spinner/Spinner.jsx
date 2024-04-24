import React from 'react';
import spinnerImg from '/src/assets/img/loading-gif.gif';

let Spinner = () => {
  return (
    <React.Fragment>
      <div>
        <img
          src={spinnerImg}
          alt='Loading...'
          className='d-block m-auto'
          style={{ width: '300px' }}
        />
      </div>
    </React.Fragment>
  );
};

export default Spinner;
