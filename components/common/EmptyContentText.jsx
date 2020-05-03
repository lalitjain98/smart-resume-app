import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.caption,
    color: theme.palette.grey[500],
    textAlign: 'center',
    fontStyle: 'italic',
  },
}));

const EmptyContentText = ({ label, customText }) => {
  const classes = useStyles();

  return (
    <Typography className={classes.root}>
      {customText || `${label} goes here...`}
    </Typography>
  );
};

export default EmptyContentText;
