import { createElement, Component, PropTypes } from 'react';

import Rect from './graphics/rect';

export default class Entities extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  };

  render() {
    const { x, y } = this.props;
    return <Rect x={x} y={y} width={16} height={16} fillColor={0xffffff} />;
  }
}
