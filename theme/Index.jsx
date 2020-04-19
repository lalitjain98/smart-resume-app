import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import lightBlue from '@material-ui/core/colors/lightBlue';

const gradColorDark = blue[900];
const gradColorLight = blue[700];

const AppTheme = createMuiTheme({
  palette: {
    primary: { main: lightBlue[900] },
    secondary: pink,
    // { main: lightBlue[900] },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  overrides: {
    MuiAppBar: {
      root: {
        background: `linear-gradient(to bottom right, ${gradColorDark}, ${gradColorLight})`,
        color: 'white',
        boxShadow: '0px 0px 20px -2px rgba(0,0,0,0.75)',
      },
      colorDefault: {

      },
      colorPrimary: {

      },
      colorSecondary: {

      },
    },
    MuiButton: {
      root: {

      },
      containedPrimary: {
        color: 'white',
        background: `linear-gradient(to bottom right, ${gradColorDark}, ${gradColorLight})`,
      },
    },
  },
});

export default responsiveFontSizes(AppTheme);
