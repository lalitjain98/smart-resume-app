import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Actions from '../../../redux/actions';

function Index(props) {
  return (
    <>
      Resume Sections
    </>
  );
}

const mapStateToProps = (state) => ({
  ...state.userDashboard,
});

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
