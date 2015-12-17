import Pixi from 'pixi.js';
import { createElement, Component, PropTypes } from 'react';
import { Text, DisplayObjectContainer } from 'react-pixi';
import { connect } from 'react-redux';

import { fps } from '../reducers/stats';
import Rect from './graphics/rect';
import Line from './graphics/line';
import Polygon from './graphics/polygon';

class FPS extends Component {
  static propTypes = {
    fps: PropTypes.number.isRequired,
    displayWidth: PropTypes.number.isRequired,
    displayHeight: PropTypes.number.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    color: PropTypes.number,
  };

  static defaultProps = {
    width: 200,
    height: 60,
    color: 0x8BC34A,
  };

  constructor(props) {
    super(props);

    this.state = {
      fpsHistory: [ 0 ],
      count: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { fps, width } = nextProps;
    const { fpsHistory, count } = this.state;

    this.setState({ count: count + 1 });

    this.setState({
      fpsHistory: ([ fps ].concat(fpsHistory)).slice(0, width),
    });
  }

  render() {
    const { displayWidth, displayHeight, width, height, color } = this.props;
    const { fpsHistory } = this.state;
    const margin = 10;

    const rectPosition = {
      x: displayWidth - width - margin,
      y: displayHeight - height - margin,
    };

    const textPosition = {
      x: 3,
      y: height - 14,
    };

    const textStyle = {
      font: '12px',
      fill: color,
    };

    const path = fpsHistory.map((fps, i) => ({
      x: width - i - 1,
      y: Math.max(0, height - Math.min(height, fps)),
    }));

    const polyPath = path.concat([
      { x: path.slice(-1)[0].x, y: height },
      { x: width - 1, y: height },
    ]);

    return (
      <DisplayObjectContainer {...rectPosition} ref='container'>
        <Rect
          width={width}
          height={height}
          linePosition='outside'
          fillColor={0x0}
          fillOpacity={0.25}
        />
        <Polygon
          path={polyPath}
          fillColor={color}
          fillOpacity={0.25}
        />
        <Line
          path={path}
          lineColor={color}
        />
        <Text
          {...textPosition}
          text={Math.round(fpsHistory[0])}
          style={textStyle}
        />
      </DisplayObjectContainer>
    );
  }
}

const mapState = ({
  stats: { frameDurations, frameCount },
  display: { width, height },
}) => ({
  fps: fps(frameDurations),
  frameCount,
  displayWidth: width,
  displayHeight: height,
});

export default connect(mapState)(FPS);
