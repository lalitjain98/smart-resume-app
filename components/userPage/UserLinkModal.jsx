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
import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Actions from '../../redux/actions';
import Loading from '../common/Loading';

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
  box: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  loadingWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    width: '100%',
    height: '100%',
    zIndex: 10000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iframe: {
    width: '100%',
    height: '100%',
  },
  dialogContent: {
    padding: '0 !important',
  },
}));

const LinkModal = (props) => {
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { linkUrl, open, handleClose } = props;
  

  const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLoadSuccess = (e) => {
    e.persist();
    console.log('Successfully Loaded', linkUrl);
    setIsLoaded(true);
  };

  const handleLoadError = (e) => {
    e.persist();
    console.log('Failed to load', linkUrl);
  };

  return (
    <Dialog
      fullScreen
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
          { props.currentResumeSectionItemId ? 'Edit Section' : 'Add New Section' }
        </Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Box className={classes.box}>
          {
            !isLoaded && (
              <Box className={classes.loadingWrapper}>
                <Loading />
              </Box>
            )
          }
          <iframe
            className={classes.iframe}
            title="User Project Link"
            src={linkUrl}
            onLoad={handleLoadSuccess}
            onError={handleLoadError}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

LinkModal.propTypes = {
  open: PropTypes.bool,
};

LinkModal.defaultProps = {
  open: false,
};

const mapStateToProps = (state) => ({
  open: !!state.userPage.userLinkUrl,
  linkUrl: state.userPage.userLinkUrl,
});

const mapDispatchToProps = (dispatch) => ({
  handleClose: () => dispatch(Actions.userPage.setUserLinkUrl(null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkModal);
