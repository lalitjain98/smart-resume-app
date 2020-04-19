import React from 'react';
import { ClipLoader } from 'react-spinners';

class LazyImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.image = React.createRef();
  }

  componentDidMount() {
    const img = this.image.current;
    if (img && img.complete) {
      this.handleImageLoaded();
    }
  }

  handleImageLoaded() {
    if (!this.state.loaded) {
      console.log('image loaded');
      this.setState({ loaded: true });
    }
  }

  render() {
    const { loaded } = this.state;
    const { className: propsClassName, ...restProps } = this.props;
    return (
      <>
        <div style={{minWidth: '20px', minHeight: '20px'}}>
          <ClipLoader size={20} color={'#444'} loading={!loaded} />
        </div>
        <img className={`lazyload ${propsClassName} ${!loaded && 'hide'}`} src="image.jpg" ref={this.image} onLoad={this.handleImageLoaded} {...restProps} />
      </>

    );
  }
}

export default LazyImage;