
import React from 'react';
import { useRouter, Router, withRouter } from 'next/router';
import { connect } from 'react-redux';
import Actions from '../redux/actions';
import ControlledLoader from '../components/common/ControlledLoader';
import { usePrevious } from '../util/customHooks';
import UserPageComponent from '../components/userPage/Index';

const UserPage = ({ userPageData, error, loading, ...props }) => {
  const router = useRouter();
  const { username } = router.query;
  const prevProps = usePrevious({ error });

  React.useEffect(() => {
    console.log("Mounting UserPage", username);

    return () => {
      console.log("Unmounting UserPage", username);
    };
  }, []);

  React.useEffect(() => {
    if (!userPageData) props.loadUserPageData(username);
  }, [userPageData]);

  React.useEffect(() => {
    if (prevProps && !prevProps.error && error) {
      router.replace('/dashboard');
    }
  }, [error, prevProps]);

  if (loading || !userPageData) return <ControlledLoader isLoaded={!loading} />;
  if (error) return <div>Error</div>;

  return <UserPageComponent />;

  return (
    <>
      <h1>
        { userPageData.username }
      </h1>
      <h4>
        { userPageData.email }
      </h4>
    </>
  );
};

// UserPage.getInitialProps = () => ({});


const mapStateToProps = (state) => ({
  ...state.userData,
  userPageData: state.userPage.data,
  loading: state.userPage.loadUserPageLoading,
  error: state.userPage.loadUserPageError,
});

const mapDispatchToProps = (dispatch) => ({
  loadUserPageData: (username) => dispatch(Actions.userPage.loadUserByUsername(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserPage));
