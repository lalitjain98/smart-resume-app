import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Actions from '../../../../redux/actions';
import ResumeSection from '../ResumeSection';
import ResumeSectionModal from '../ResumeSectionFormModal';
import Loading from '../../../common/Loading';
import ExperienceFormModal from './ExperienceFormModal';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2),
      padding: theme.spacing(3),
    },
  },
  box: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
    },
  },
}));


function ResumeSectionDetail(props) {
  const classes = useStyles();

  const toggleModal = () => props.setShowExperienceFormModal(!props.showExperienceFormModal);
  const showModal = () => props.setShowExperienceFormModal(true);
  const addNewExperience = () => props.setCurrentExperienceItemId(null) && showModal();

  const [thisResumeSection, setThisResumeSection] = React.useState(null);
  const {
    resumeSections, getAllResumeSections, getAllResumeSectionsLoading, getAllResumeSectionsError,
  } = props;

  return null;

  return (
    <Grid container>
      <Grid item xs={12} sm={12}>
        <Box className={classes.box}>
          {thisResumeSection && <ResumeSection {...thisResumeSection} />}
        </Box>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ResumeSectionDetail);
