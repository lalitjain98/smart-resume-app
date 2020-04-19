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
import Actions from '../../../redux/actions';
import ResumeSection from './ResumeSection';
import ResumeSectionModal from './ResumeSectionFormModal';
import Loading from '../../common/Loading';
import Skill from './Skill';
import SkillModal from './SkillFormModal';
import SkillsContainer from './SkillsContainer';

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


function ManageResume(props) {
  const {
    resumeSections, getAllResumeSections, getAllResumeSectionsLoading, 
    getAllResumeSectionsError, setCurrentResumeSectionItemId, 
    setShowResumeSectionFormModal, showResumeSectionFormModal,
    skills, getAllSkills, getAllSkillsLoading, getAllSkillsError,
    setShowSkillFormModal, showSkillFormModal, setCurrentSkillItemId,
  } = props;

  const classes = useStyles();

  const toggleResumeSectionModal = () => setShowResumeSectionFormModal(!showResumeSectionFormModal);
  const showResumeSectionModal = () => setShowResumeSectionFormModal(true);
  const addNewResumeSection = () => setCurrentResumeSectionItemId(null) && showResumeSectionModal();

  const toggleSkillModal = () => setShowSkillFormModal(!showSkillFormModal);
  const showSkillModal = () => setShowSkillFormModal(true);
  const addNewSkill = () => setCurrentSkillItemId(null) && showSkillModal();

  React.useEffect(() => {
    getAllResumeSections();
    getAllSkills();
  }, []);

  // if (getAllResumeSectionsLoading) {
  //   return <Loading />;
  // }

  const handleResumeSectionItemClick = (id) => {
    Router.push(`/dashboard/manage-resume?resumeSectionId=${id}`);
  };

  const handleSkillItemClick = (id) => {
    console.log("skill", id);
    // Router.push(`/dashboard/manage-resume?skillId=${id}`);
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12}>
        <Box display="flex" justifyContent="flex-end" className={classes.box}>
          <Button color="primary" onClick={addNewResumeSection}>Add New Section</Button>
          <Button color="primary" onClick={addNewSkill}>Add New Skill</Button>
          <ResumeSectionModal />
          <SkillModal />
        </Box>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Box className={classes.box}>
          <SkillsContainer />
          {/* {
            (() => {
              if (getAllSkillsLoading) return <Loading /> 
              if (getAllSkillsError) return <div>{getAllSkillsError}</div>
              return skills.map((item) => <Skill allowEdit onClick={() => handleSkillItemClick(item.id)} key={item.id} {...item} />)
            })()
          } */}
        </Box>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Box className={classes.box}>
          {
            (() => {
              if(getAllResumeSectionsLoading) return <Loading /> 
              if(getAllResumeSectionsError) return <div>{getAllResumeSectionsError}</div>
              return resumeSections.map((item) => <ResumeSection allowEdit onClick={() => handleResumeSectionItemClick(item.id)} key={item.id} {...item} />)
            })()
          }
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

});

const mapDispatchToProps = (dispatch) => ({
  setCurrentResumeSectionItemId: (id) => dispatch(Actions.manageResume.setCurrentResumeSectionItemId(id)),
  setShowResumeSectionFormModal: (showModal) => dispatch(Actions.manageResume.setShowResumeSectionFormModal(showModal)),
  getAllResumeSections: () => dispatch(Actions.manageResume.getAllResumeSections()),

  setCurrentSkillItemId: (id) => dispatch(Actions.manageResume.setCurrentSkillItemId(id)),
  setShowSkillFormModal: (showModal) => dispatch(Actions.manageResume.setShowSkillFormModal(showModal)),
  getAllSkills: () => dispatch(Actions.manageResume.getAllSkills()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageResume);
