import { createElement, Component, PropTypes } from 'react';
import { Stage } from 'react-pixi';
import { connect } from 'react-redux';

import { keyDown, keyUp } from '../actions/input';

import FPS from './fps';

class Display extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    onKeyUp: PropTypes.func.isRequired,
  };

  render() {
    const { width, height, onKeyUp, onKeyDown } = this.props;
    return (
      <Stage
        width={width}
        height={height}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      >
        <FPS />
      </Stage>
    );
  }
}

const mapState = ({ display: { width, height }}) => ({ width, height });

const mapDispatch = dispatch => ({
  onKeyDown: event => {
    dispatch(keyDown({ keyCode: event.keyCode, timeStamp: event.timeStamp }));
  },
  onKeyUp: event => {
    dispatch(keyUp({ keyCode: event.keyCode }));
  },
});

export default connect(mapState, mapDispatch)(Display);
