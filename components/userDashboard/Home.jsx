import React from 'react';
import { connect } from 'react-redux';

function Home(props) {
  return (
    <>
      Home
    </>
  );
}

const mapStateToProps = (state) => ({
  ...state.userDashboard,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
