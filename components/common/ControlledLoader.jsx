import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import PropTypes from 'prop-types';

const ControlledLoader = ({ isLoaded, children, ...props }) => {
  const [hasTimedOut, setHasTimedOut] = React.useState(false);
  const [timer, setTimer] = React.useState(false);

  React.useEffect(() => {
    if (!isLoaded) {
      const newTimer = setTimeout(() => {
        console.log('Controlled Loader Timeout Occured');
        setHasTimedOut(true);
        setTimer(false);
      }, 10000);
      setTimer(newTimer);
    }
  }, [isLoaded]);

  React.useEffect(() => {
    if (isLoaded && timer) {
      clearTimeout(timer);
      setTimer(false);
    }
  }, [isLoaded]);

  return (
    <>
      <div className={`splash-wrapper ${(isLoaded || hasTimedOut) && 'invisible'}`}>
        <div className="splash-content-container">
          <img className="animate-size" src="/static/assets/logo.png" alt="Smart Resume" height="70px" />
          <Loading />
        </div>
      </div>
      <div>
        {
          children
        }
      </div>
    </>
  );
};

ControlledLoader.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  children: PropTypes.element,
};

ControlledLoader.defaultProps = {
  children: null,
}

export default ControlledLoader;
