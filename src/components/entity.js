import { createElement, Component, PropTypes } from 'react';

import Rect from './graphics/rect';

import { addScaled, vectorShape } from '../math-2d.js';

export default class Entities extends Component {
  static propTypes = {
    position: vectorShape,
    size: vectorShape,
    debug: PropTypes.object,
  };

  render() {
    const { size, position, debug } = this.props;
    const { contact } = debug;
    const { x, y } = addScaled(position, size, -0.5);

    return (
      <Rect
        x={x}
        y={y}
        width={16}
        height={16}
        fillColor={contact ? 0xff0000 : 0x888888}
        linePosition='inside'
      />
    );
  }
}
