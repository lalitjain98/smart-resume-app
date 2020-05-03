import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Actions from '../../../redux/actions';
import dynamic from 'next/dynamic'
import countries from '../../../constants/countries';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const MuiPhoneInput = dynamic(
  () => import('material-ui-phone-number'),
  { ssr: false }
)

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);


const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(3),
  },
  dialog: {
    [theme.breakpoints.up('sm')]: {
      minWidth: '600px',
    },
  },
  dialogTitle: {
    margin: 0,
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      minWidth: '500px',
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  form: {

  },
  input: {
    padding: theme.spacing(0.5),
  },
  formControl: {

  },
}));

const UserDetailInfoFormModal = (props) => {
  const classes = useStyles();

  const [aboutMe, setAboutMe] = React.useState('');
  const [altMobileNumber, setAltMobileNumber] = React.useState(null);
  const [altEmail, setAltEmail] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [city, setCity] = React.useState('');


  const { open, setOpen, save } = props;
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    save({ aboutMe, altEmail, altMobileNumber, country, city });
    handleClose();
  };

  React.useEffect(() => {
    const { user = {} } = props;
    
    setAboutMe(user.aboutMe);
    setAltEmail(user.altEmail);
    setAltMobileNumber(user.altMobileNumber);
    setCountry(user.country);
    setCity(user.city);

  }, []);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      className={classes.dialog}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        <Typography className={classes.dialogTitle}>
          Review User Details
        </Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>

        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                variant="outlined"
                fullWidth
                multiline
                rowsMin={4}
                rowsMax={8}
                id="aboutMe"
                label="About Me"
                name="aboutMe"
                autoComplete="off"
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" className={classes.formControl}>
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                  labelId="country-label"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  label="Country"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {
                    countries.map((item) => (
                      <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                variant="outlined"
                fullWidth
                id="city"
                label="City"
                name="city"
                autoComplete="off"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                variant="outlined"
                fullWidth
                id="altEmail"
                label="Alternate E-mail"
                name="altEmail"
                autoComplete="off"
                value={altEmail}
                onChange={(e) => setAltEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPhoneInput 
                defaultCountry={'in'} 
                onChange={(val) => setAltMobileNumber(val)}
                variant="outlined"
                fullWidth
                value={altMobileNumber}
                autoFormat={false}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Discard
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UserDetailInfoFormModal.propTypes = {
  open: PropTypes.bool,
};

UserDetailInfoFormModal.defaultProps = {
  open: false,
};

const mapStateToProps = (state) => ({
  open: state.user.showUserDetailInfoFormModal,
  user: state.user.data,
});

const mapDispatchToProps = (dispatch) => ({
  setOpen: (showModal) => dispatch(Actions.user.setShowUserDetailInfoFormModal(showModal)),
  save: (data) => dispatch(Actions.user.updateUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailInfoFormModal);
