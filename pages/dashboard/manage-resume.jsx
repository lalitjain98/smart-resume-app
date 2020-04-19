import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Main from '../../components/userDashboard/Index';
import { MenuBarOptions } from '../../constants/userDashboard';
import Actions from '../../redux/actions';
import ManageResumeIndex from '../../components/userDashboard/manageResume/Index';
import ResumeSectionIndex from '../../components/userDashboard/manageResume/resumeSection/Index';

export const Index = (props) => {
  React.useEffect(() => {
    props.setActiveOption(Object.keys(MenuBarOptions)[2]);
  }, []);

  React.useEffect(() => {
    console.log('&&&&&', props.query);
  });

  React.useEffect(() => {
    if (props.query.resumeSectionId) {
      props.setCurrentResumeSectionItemId(props.query.resumeSectionId);
    }
  }, [props.query]);

  return props.query.resumeSectionId ? (
    <ResumeSectionIndex id={Router.query.resumeSectionId} />
  ) : (
    <ManageResumeIndex />
  );
};

const mapStateToProps = (state) => ({
  activeMenuBarOption: state.userDashboard.activeMenuBarOption,
});

const mapDispatchToProps = (dispatch) => ({
  setActiveOption: (option) => dispatch(Actions.userDashboard.setMenuBarOption(option)),
  setCurrentResumeSectionItemId: (id) => dispatch(Actions.manageResume.setCurrentResumeSectionItemId(id)),
  setCurrentExperienceItemId: (id) => dispatch(Actions.manageResume.setCurrentExperienceItemId(id)),
});

Index.getInitialProps = ({ query }) => ({ query });
export default connect(mapStateToProps, mapDispatchToProps)(Index);
