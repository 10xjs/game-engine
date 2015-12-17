import Pixi from 'pixi.js';
import omit from 'lodash.omit';
import { createElement, Component, PropTypes } from 'react';
import { DisplayObjectContainer } from 'react-pixi';

export default class Line extends Component {
  static propTypes = {
    lineWidth: PropTypes.number,
    lineColor: PropTypes.number,
    lineOpacity: PropTypes.number,
    path: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    })),
  };

  static defaultProps = {
    lineWidth: 1,
    lineOpacity: 1,
    path: [],
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
      path,
      lineWidth,
      lineColor,
      lineOpacity,
    } = props;

    graphics.clear();

    if (path.length) {
      if (lineColor !== undefined) {
        graphics.lineStyle(lineWidth, lineColor, lineOpacity);
      }
      const { x, y } = path[0];
      graphics.moveTo(x, y);
      path.slice(1).forEach(({ x, y }) => {
        graphics.lineTo(x, y);
      });
    }
  }

  render() {
    const props = omit(this.props, Object.keys(Line.propTypes));
    return (
      <DisplayObjectContainer {...props} ref='container' />
    );
  }
}
