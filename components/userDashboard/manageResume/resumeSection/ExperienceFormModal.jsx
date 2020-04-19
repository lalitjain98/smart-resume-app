import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
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
import Actions from '../../../../redux/actions';

import { MuiPickersUtilsProvider, DatePicker, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';

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
}));

const ExperienceFormModal = (props) => {
  const classes = useStyles();

  const [title, setTitle] = React.useState('');
  // title, subtitle, startDate, endDate, description, linkUrl, linkText, grade, maxGrade
  const [subtitle, setSubtitle] = React.useState('');
  const [startDate, setStartDate] = React.useState(moment());
  const [endDate, setEndDate] = React.useState(moment());
  const [description, setDescription] = React.useState('');
  
  const [linkUrl, setLinkUrl] = React.useState('');
  const [linkText, setLinkText] = React.useState('');
  const [grade, setGrade] = React.useState('');
  const [maxGrade, setMaxGrade] = React.useState('');
  
  const { open, setOpen, save } = props;
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    save({ title, subtitle, startDate, endDate, description, linkUrl, linkText });
    handleClose();
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  React.useEffect(() => {
    if (props.currentExperienceItemId) {
      const currentSectionItem = props.resumeSections.find((item) => item.id == props.currentResumeSectionItemId);
      console.log(currentSectionItem)
      // if (!currentSectionItem) Router.push('/dashboard/manage-resume');
      const currentExperienceItem = currentSectionItem && currentSectionItem.experiences.find((item) => item.id == props.currentExperienceItemId);
      if (currentExperienceItem) {
        const { title, subtitle, startDate, endDate, description, linkUrl, linkText } = currentExperienceItem || {};
        setTitle(title);
        setSubtitle(subtitle);
        setStartDate(moment(startDate));
        setEndDate(moment(endDate));
        setDescription(description);
        setLinkUrl(linkUrl);
        setLinkText(linkText);
      }
    } 
    else {
      // console.log("Resetting Form Values")
      setTitle('');
      setSubtitle('');
      setStartDate(moment());
      setEndDate(moment());
      setDescription('');
      setLinkUrl('');
      setLinkText('');
    }

  }, [props.currentExperienceItemId]);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
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
            {props.currentExperienceItemId ? 'Edit Experience' : 'Add New Experience'}
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
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="off"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.input}
                  variant="outlined"
                  required
                  fullWidth
                  id="subtitle"
                  label="Subtitle"
                  name="subtitle"
                  autoComplete="off"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="Start Date"
                  format="DD MMM, YYYY"
                  value={startDate}
                  InputAdornmentProps={{ position: "start" }}
                  onChange={(date) => setStartDate(date)}
                />
              </Grid>

              <Grid item xs={12}>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="End Date"
                  format="DD MMM, YYYY"
                  value={endDate}
                  InputAdornmentProps={{ position: "start" }}
                  onChange={(date) => setEndDate(date)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  multiline
                  className={classes.input}
                  variant="outlined"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="off"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.input}
                  variant="outlined"
                  required
                  fullWidth
                  id="linkUrl"
                  label="Link URL"
                  name="linkUrl"
                  autoComplete="off"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className={classes.input}
                  variant="outlined"
                  required
                  fullWidth
                  id="linkText"
                  label="Link Label"
                  name="linkText"
                  autoComplete="off"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
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
    </MuiPickersUtilsProvider>
  );
};

ExperienceFormModal.propTypes = {
  open: PropTypes.bool,
};

ExperienceFormModal.defaultProps = {
  open: false,
};

const mapStateToProps = (state) => ({
  open: state.manageResume.showExperienceFormModal,
  resumeSections: state.manageResume.resumeSections,
  currentExperienceItemId: state.manageResume.currentExperienceItemId,
  currentResumeSectionItemId: state.manageResume.currentResumeSectionItemId,
});

const mapDispatchToProps = (dispatch) => ({
  setOpen: (showModal) => dispatch(Actions.manageResume.setShowExperienceFormModal(showModal)),
  save: (data) => dispatch(Actions.manageResume.saveExperience(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceFormModal);
