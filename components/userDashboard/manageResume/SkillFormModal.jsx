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
import RatingInput from '../../common/RatingInput';

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

const AddNewSkillModal = (props) => {
  const classes = useStyles();

  const [title, setTitle] = React.useState('');
  const [rating, setRating] = React.useState(3);

  const { open, setOpen, save, setCurrentSkillItemId } = props;
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    save({ title, rating });
    handleClose();
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  React.useEffect(() => {
    if (props.currentSkillItemId) {
      const currentSectionItem = props.skills.find((item) => item.id === props.currentSkillItemId);
      if (currentSectionItem) {
        setTitle(currentSectionItem.title);
        setRating(currentSectionItem.rating);
      }
    } else {
      setTitle('');
      setRating(3);
    }
  }, [props.currentSkillItemId]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      TransitionComponent={Transition}
      // keepMounted
      onClose={handleClose}
      className={classes.dialog}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        <Typography className={classes.dialogTitle}>
          { props.currentSkillItemId ? 'Edit Skill' : 'Add New Skill' }
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
              <RatingInput value={rating} setValue={setRating} />
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

AddNewSkillModal.propTypes = {
  open: PropTypes.bool,
};

AddNewSkillModal.defaultProps = {
  open: false,
};

const mapStateToProps = (state) => ({
  open: state.manageResume.showSkillFormModal,
  skills: state.manageResume.skills,
  currentSkillItemId: state.manageResume.currentSkillItemId,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentSkillItemId: (id) => dispatch(Actions.manageResume.setCurrentSkillItemId(id)),
  setOpen: (showModal) => dispatch(Actions.manageResume.setShowSkillFormModal(showModal)),
  save: (data) => dispatch(Actions.manageResume.saveSkill(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddNewSkillModal);
