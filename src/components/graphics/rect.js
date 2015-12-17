import Pixi from 'pixi.js';
import omit from 'lodash.omit';
import { createElement, Component, PropTypes } from 'react';
import { DisplayObjectContainer } from 'react-pixi';

export default class Rect extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    lineWidth: PropTypes.number,
    lineColor: PropTypes.number,
    lineOpacity: PropTypes.number,
    linePosition: PropTypes.oneOf([ 'inside', 'outside', 'center' ]),
    fillColor: PropTypes.number,
    fillOpacity: PropTypes.number,
  };

  static defaultProps = {
    width: 100,
    height: 100,
    lineWidth: 1,
    lineColor: 0x0,
    lineOpacity: 1,
    linePosition: 'inside',
    fillColor: 0x0,
    fillOpacity: 1,
  }

  componentDidMount() {
    const { container } = this.refs;
    this.graphics = new Pixi.Graphics();
    container.addChildAt(this.graphics, 0);
    this.renderGraphics();
  }

  componentDidUpdate() {
    this.renderGraphics();
  }

  renderGraphics() {
    const { graphics, props } = this;
    const {
      width,
      height,
      lineWidth,
      lineColor,
      lineOpacity,
      linePosition,
      fillColor,
      fillOpacity,
    } = props;

    graphics.clear();

    graphics.lineStyle(lineWidth, lineColor, lineOpacity);
    if (fillOpacity) {
      graphics.beginFill(fillColor, fillOpacity);
    }

    let offset = 0;

    if (linePosition === 'outside') {
      offset = 0.5 * lineWidth;
    } else if (linePosition === 'center') {
      offset = 0;
    } else {
      offset = -0.5 * lineWidth;
    }

    graphics.drawRect(
      0 - offset,
      0 - offset,
      width + offset,
      height + offset
    );

    if (fillOpacity) {
      graphics.endFill();
    }
  }

  render() {
    const props = omit(this.props, Object.keys(Rect.propTypes));
    return (
      <DisplayObjectContainer {...props} ref='container' />
    );
  }
}
