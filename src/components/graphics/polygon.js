import Pixi from 'pixi.js';
import omit from 'lodash.omit';
import { createElement, Component, PropTypes } from 'react';
import { DisplayObjectContainer } from 'react-pixi';

export default class Polygon extends Component {
  static propTypes = {
    lineWidth: PropTypes.number,
    lineColor: PropTypes.number,
    lineOpacity: PropTypes.number,
    fillColor: PropTypes.number,
    fillOpacity: PropTypes.number,
    path: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    })).isRequired,
  };

  static defaultProps = {
    lineWidth: 1,
    lineOpacity: 1,
    fillOpacity: 1,
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
      lineWidth,
      lineColor,
      lineOpacity,
      fillColor,
      fillOpacity,
      path,
    } = props;

    graphics.clear();

    if (path.length) {
      if (lineColor !== undefined) {
        graphics.lineStyle(lineWidth, lineColor, lineOpacity);
      }

      if (fillColor !== undefined) {
        graphics.beginFill(fillColor, fillOpacity);
      } else {
        graphics.beginFill(0, 0);
      }

      const { x, y } = path[0];
      graphics.moveTo(x, y);

      path.slice(1).forEach(({ x, y }) => {
        graphics.lineTo(x, y);
      });

      graphics.endFill();
    }
  }

  render() {
    const props = omit(this.props, Object.keys(Polygon.propTypes));
    return (
      <DisplayObjectContainer {...props} ref='container' />
    );
  }
}
