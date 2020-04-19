import React from 'react';
import MuiButton from '@material-ui/core/Button';

export const Button = (props) => (
  <MuiButton {...props}>
    {props.children}
  </MuiButton>
);

export default Button;
