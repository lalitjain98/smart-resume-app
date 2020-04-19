import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import blue from '@material-ui/core/colors/blue';

const gradColorDark = blue[900];
const gradColorLight = blue[700];

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000">
        Smart Resume
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles(theme => ({
  footer: {
    position: 'relative',
    // borderTop: `2px solid ${theme.palette.primary.dark}`,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    '&::before': {
      content: "''",
      margin: `-${theme.spacing(2)}px`,
      position: 'absolute',
      top: theme.spacing(1),
      width: '100%',
      height: '4px',
      background: `linear-gradient(to bottom left, ${gradColorDark}, ${gradColorLight})`,
    },
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Smart Resume For Smartphones
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        Developed By Lalit Jain
      </Typography>
      <Copyright />
    </footer>
  );
}
