import { createElement, Component, PropTypes } from 'react';

import Rect from './graphics/rect';

import { addScaled, vectorShape } from '../math-2d.js';  

export default class Entities extends Component {
  static propTypes = {
    position: vectorShape,
    size: vectorShape,
    state: PropTypes.string,
  };

  render() {
    const { size, position, state } = this.props;
    const { x, y } = addScaled(position, size, -0.5);

    return (
      <Rect
        x={x}
        y={y}
        width={16}
        height={16}
        fillColor={0xffffff}
        lineColor={state === 'collision' ? 0xff0000 : 0x888888}
        lineWidth={2}
        linePosition='inside'
      />
    );
  }
}
