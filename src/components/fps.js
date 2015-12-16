import { createElement, Component, PropTypes } from 'react';
import { Text, DisplayObjectContainer } from 'react-pixi';
import { connect } from 'react-redux';

import { fps } from '../reducers/stats';

class FPS extends Component {
  static propTypes = {
    fps: PropTypes.number.isRequired,
  };

  componentDidMount() {
    const { container } = this.refs;
    console.log('container', container);
  }

  render() {
    const { fps } = this.props;
    return (
      <DisplayObjectContainer ref='container'>
        <Text text={fps.toLocaleString()} x={0} y={0} style={fontStyle} />
      </DisplayObjectContainer>
    );
  }
}

const fontStyle = {
  font: '12px Arial',
  fill: '#000000',
};

const mapState = ({ stats: { frameDurations } }) => ({
  fps: fps(frameDurations),
});

export default connect(mapState)(FPS);
