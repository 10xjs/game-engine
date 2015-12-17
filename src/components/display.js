import { createElement, Component, PropTypes } from 'react';
import { Stage } from 'react-pixi';

import FPS from '../containers/fps';
import Entities from '../containers/entities';

export default class Display extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    debug: PropTypes.bool.isRequired,
  };

  render() {
    const { width, height, debug } = this.props;
    return (
      <Stage backgroundcolor={0x0} width={width} height={height}>
        <Entities />
        {debug ? <FPS /> : null}
      </Stage>
    );
  }
}
