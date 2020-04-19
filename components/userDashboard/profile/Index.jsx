import React from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import UserBasicInfoCard from './UserBasicInfoCard';
import UserDetailInfoCard from './UserDetailInfoCard';

function Profile(props) {
  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={4}>
        <UserBasicInfoCard />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <UserDetailInfoCard />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  ...state.userDashboard,
  user: state.user.data,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
