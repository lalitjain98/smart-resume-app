import React from 'react';
import PropTypes from 'prop-types';
// import { Segment, Dimmer, Loader } from 'semantic-ui-react';
import Loader from 'react-spinners/PulseLoader';

const Loading = ({ content }) => {
  return (
    <div className="loader-wrapper">
      <Loader
        size={15}
        sizeUnit={'px'}
        height={5}
        width={150}
        margin={'20px'}
        color='#22f'
      />
      {/* <Loader active content={content || 'Loading...'} /> */}
    </div>
  );
  // return (
  //   <Segment inverted>
  //     <Dimmer inverted>
  //       <Loader inverted active={show} content={content || 'Loading...'} />
  //     </Dimmer>
  //   </Segment>
  // );
}

Loading.propTypes = {
  show: PropTypes.bool,
};
Loading.defaultProps = {
  show: true,
}

export default Loading;