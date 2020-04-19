import React from 'react';
import { connect } from 'react-redux';

function Index(props) {
  return (
    <>
      UserDetailInfoCard
    </>
  );
}

const mapStateToProps = (state) => ({
  ...state.userDashboard,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
