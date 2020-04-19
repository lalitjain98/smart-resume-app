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

  React.useEffect(() => {
    
  }, []);

  if (getAllResumeSectionsLoading) {
    return <Loading />;
  }

  React.useEffect(() => {
    console.log('Search for', props.id, 'in', resumeSections);
    const arr = resumeSections.filter((item) => item.id == props.id);
    console.log('Resume Sections Array Filtered', arr);
    arr.length && setThisResumeSection(arr[0]);
  }, [props.id]);


  if (!thisResumeSection) return <Loading />;

  return (
    <Grid container>
      <Grid item xs={12} sm={12}>
        <Box display="flex" justifyContent="space-between" className={classes.box}>
          <Button color="primary" onClick={() => Router.push('/dashboard/manage-resume')}>View All Sections</Button>
          <Button color="primary" onClick={addNewExperience}>Add New Experience</Button>
          <ExperienceFormModal />
        </Box>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Box className={classes.box}>
          {thisResumeSection && <ResumeSection {...thisResumeSection} allowXpEdit />}
        </Box>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  ...state.manageResume,
  showResumeSectionFormModal: state.manageResume.showResumeSectionFormModal,
  resumeSections: state.manageResume.resumeSections,
  getAllResumeSectionsLoading: state.manageResume.getAllResumeSectionsLoading,
  getAllResumeSectionsError: state.manageResume.getAllResumeSectionsError,
  showExperienceFormModal: state.manageResume.showExperienceFormModal,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentExperienceItemId: (id) => dispatch(Actions.manageResume.setCurrentExperienceItemId(id)),
  setShowResumeSectionFormModal: (showModal) => dispatch(Actions.manageResume.setShowResumeSectionFormModal(showModal)),
  getAllResumeSections: () => dispatch(Actions.manageResume.getAllResumeSections()),
  setShowExperienceFormModal: (showModal) => dispatch(Actions.manageResume.setShowExperienceFormModal(showModal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResumeSectionDetail);
