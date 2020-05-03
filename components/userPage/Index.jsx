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
import Actions from '../../redux/actions';
import ResumeSection from './ResumeSection';
import Loading from '../common/Loading';
import Skill from './Skill';
import SkillsContainer from './SkillsContainer';
import UserBasicInfoCard from './UserBasicInfoCard';
import UserLinkModal from './UserLinkModal';

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


function UserPage(props) {

  const { resumeSections = [] } = props;

  const classes = useStyles();

  return (
    <>
      <UserLinkModal />
      <Grid container>
        <Grid item xs={12} sm={12}>
          <Box className={classes.box}>
            <UserBasicInfoCard />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Box className={classes.box}>
            <SkillsContainer />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Box className={classes.box}>
            {
              (resumeSections).map((item) => <ResumeSection key={item.id} {...item} />)
            }
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({
  ...state.userPage,
  resumeSections: state.userPage.data.resumeSections,
  skills: state.userPage.data.skills,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
