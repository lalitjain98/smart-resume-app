import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Loading from '../common/Loading';
import Skill from './Skill';
// import SkillsVisualization from './charts/SkillsVisualizationHorizontalBar';
// import SkillsVisualization from './charts/SkillsVisualizationDoughnut';
// import SkillsVisualization from './charts/SkillsVisualizationRadar';
// import SkillsVisualization from './charts/SkillsVisualizationPolar';
import SkillsVisualization from './charts/SkillsVisualizationPie';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    padding: theme.spacing(1),
    margin: `${theme.spacing(1)}px 0`,
    // border: `1px solid ${theme.palette.primary.main}`,
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2),
      padding: theme.spacing(2),
    },
    // cursor: (props) => props.cursor,
    '&:hover': {
      boxShadow: (props) => props.cursor === 'pointer' && `0 0 ${theme.spacing(2)}px 0 ${theme.palette.grey[500]}`,
    },
  },
  grid: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(1),
    },
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.25rem',
    marginBottom: theme.spacing(1),
    // marginTop: theme.spacing(1),
    // fontSize: theme.typography.h6
  },
  avatar: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    margin: 'auto',
    background: theme.palette.secondary.main,
  },
  edit: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    background: 'transparent',
    padding: '0.25rem',
    color: theme.palette.grey[800],
  },
  small: {
    fontSize: '1rem',
  },
  withIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  emptyListText: {
    color: theme.palette.grey[500],
    padding: theme.spacing(1),
    fontSize: '0.75rem',
    fontStyle: 'italic',
  },
  listContainer: {
    paddingTop: theme.spacing(1),
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  chartWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
}));

function SkillsContainer(props) {
  const { skills = [] } = props || {};
  
  const classes = useStyles();

  return (
    <div onClick={props.onClick}>
      {/* <TouchRipple> */}
      <Paper className={`with-edit-on-hover ${classes.paper}`} elevation={5}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.title}>
              Skills
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {
            skills && skills.length === 0 ? (
              <Grid item xs={12} className={classes.emptyListText}>
                <Box textAlign="center">
                  No Skills Added Yet!
                </Box>
              </Grid>
            )
              : (
                <>
                  <Box className={classes.chartWrapper}>
                    <SkillsVisualization skills={skills} />
                  </Box>
                  {/* <Box className={classes.listContainer}>
                    {
                      (skills).map((item) => (
                        <Skill
                          key={item.id}
                          {...item}
                        />
                      ))
                    }
                  </Box> */}
                </>
              )
          }
        </Grid>
      </Paper>
      {/* </TouchRipple>   */}
    </div>
  );
}

SkillsContainer.propTypes = {

};

const mapStateToProps = (state) => ({
  ...state.userPage,
  resumeSections: state.userPage.data.resumeSections,
  skills: state.userPage.data.skills,
});

const mapDispatchToProps = (dispatch) => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(SkillsContainer);
