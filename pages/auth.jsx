import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import DateFnsUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ReactCardFlip from 'react-card-flip';
// import { throttle, debounce } from 'throttle-debounce';
import { throttle, debounce } from 'lodash';
import Actions from '../redux/actions';
import api from '../api';
import dynamic from 'next/dynamic'

const MuiPhoneInput = dynamic(
  () => import('material-ui-phone-number'),
  { ssr: false }
)


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Smart Resume
      </Link>
      {`${new Date().getFullYear()}.`}

    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));


const Auth = ({
  token, loginLoading, loginError, user, attemptLogin, attemptSignUp, signUpLoading, signUpError,
}) => {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [mobileNumber, setMobileNumber] = React.useState('+1 99993-06397');
  const [dateOfBirth, setDateOfBirth] = React.useState(new Date());
  const [showLoginForm, setShowLoginForm] = React.useState(true);
  const [isUsernameAvailable, setIsUsernameAvailable] = React.useState(true);

  const toggleLoginForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setUsername('');
    setPassword('');
    setMobileNumber('');
    setDateOfBirth(new Date());
    setShowLoginForm(!showLoginForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    if (showLoginForm) {
      attemptLogin(email, password);
    } else {
      attemptSignUp({
        firstName, lastName, email, username, password, mobileNumber, dateOfBirth,
      });
    }
  };

  const classes = useStyles();

  React.useEffect(() => {
    if (token) Router.push('/dashboard');
  }, [token]);

  React.useEffect(() => {

  }, [signUpLoading, signUpError]);

  const checkIsUsernameAvailable = async (val) => {
    try {
      console.log(val);
      const res = await api('/auth/check-username-available', 'GET', null, { username: val });
      console.log(res);
      if (res && res.status >= 200 && res.status < 400) {
        const { data } = res;
        return data;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  };

  const verifyUsernameAvailable = async (value) => {
    const isAvailable = await checkIsUsernameAvailable(value);
    setIsUsernameAvailable(isAvailable);

    // if (!isCheckingUsername) {
    //   setIsCheckingUsername(true);
    //   const timer = setTimeout(() => {
    //     clearTimeout(checkUsernameTimer);
    //     setCheckUsernameTimer(timer);
    //     checkIsUsernameAvailable(value);
    //   }, 1000);
    // }
  };

  const verifyUsernameAvailableDebounce = debounce(verifyUsernameAvailable, 500);
  const verifyUsernameAvailableThrottle = throttle(verifyUsernameAvailable, 500);

  const handleUsernameChange = (val) => {
    setUsername(val);
    verifyUsernameAvailableThrottle(val);
  };

  const handleOnPhoneChange = (val, { name, dialCode, countryCode }) => {
    console.log(val);
    setMobileNumber(val);
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {showLoginForm ? 'Log In' : 'Sign Up'}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {
                !showLoginForm && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        // autoFocus
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="off"
                        value={username}
                        onChange={(e) => handleUsernameChange(e.target.value)}
                        error={!isUsernameAvailable}
                        helperText={!isUsernameAvailable && 'Username Not Available'}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MuiPhoneInput 
                        defaultCountry={'in'} 
                        onChange={handleOnPhoneChange}
                        variant="outlined"
                        required
                        fullWidth
                        value={mobileNumber}
                        autoFormat={false}
                      />
                    </Grid>
                  </>
                )
              }
              
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              {/* {
                showLoginForm ? (
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                )
              } */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {showLoginForm ? 'Sign In' : 'Sign Up'}
            </Button>
            <Grid container>
              <Grid item>
                <Typography className={classes.error}>
                  {showLoginForm ? (loginError) : (signUpError)}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              {
                showLoginForm ? (
                  <Grid item>
                    <Link href="#!" variant="body2" onClick={toggleLoginForm}>
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                ) : (
                  <Grid item>
                    <Link href="#!" variant="body2" onClick={toggleLoginForm}>
                      Already have an account? Sign In
                    </Link>
                  </Grid>
                )
              }
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};


const mapStateToProps = (state) => ({
  ...state.auth,
  user: state.user.data,
});

const mapDispatchToProps = (dispatch) => ({
  attemptSignUp: (data) => dispatch(Actions.auth.attemptSignUp(data)),
  attemptLogin: (email, password) => dispatch(Actions.auth.attemptLogin(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
