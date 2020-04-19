/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import ControlledLoader from './ControlledLoader';

const mapDispatchToProps = (dispatch) => ({

});

const mapStateToProps = (state) => ({
  isLoaded: !state.window.loading,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ControlledLoader);
