import { createElement, Component, PropTypes } from 'react';
import { BitmapText, DisplayObjectContainer } from 'react-pixi';

import Rect from './graphics/rect';
import Line from './graphics/line';
import Polygon from './graphics/polygon';

export default class FPS extends Component {
  static propTypes = {
    fps: PropTypes.number.isRequired,
    displayWidth: PropTypes.number.isRequired,
    displayHeight: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    color: PropTypes.number,
    scale: PropTypes.number,
    rate: PropTypes.number,
  };

  static defaultProps = {
    width: 60,
    height: 30,
    color: 0x99E63F,
    scale: 60,
    rate: 10,
  };

  constructor(props) {
    super(props);

    this.state = {
      time: 0,
      fpsHistory: [ 0 ],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { fps, width } = nextProps;
    const { fpsHistory } = this.state;

    if (this.shouldComponentUpdate(nextProps)) {
      this.setState({
        fpsHistory: ([ fps ].concat(fpsHistory)).slice(0, width + 1),
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    const { time, rate } = nextProps;
    return time % rate === 0;
  }

  render() {
    const {
      displayWidth,
      displayHeight,
      width,
      height,
      color,
      scale,
    } = this.props;
    const { fpsHistory } = this.state;
    const margin = 0;

    const containerProps = {
      x: displayWidth - width - margin,
      y: displayHeight - height - margin,
    };

    const textProps = {
      text: Math.round(fpsHistory[0]).toLocaleString(),
      style: {
        font: '12px verdana',
        align: 'right',
      },
      tint: color,
      x: width - 14,
      y: height - 18,
      resolution: 2,
    };

    const path = fpsHistory.map((fps, i) => {
      const scaled = fps / scale;
      const amount = Math.min(1, scaled === Infinity ? 0 : scaled);
      return {
        x: width - i,
        y: Math.max(0, 1 - amount) * height,
      };
    });

    const polyPath = path.concat([
      { x: path.slice(-1)[0].x, y: height },
      { x: width, y: height },
    ]);

    return (
      <DisplayObjectContainer {...containerProps}>
        <Rect
          width={width}
          height={height}
          fillColor={0x0}
          fillOpacity={0.25}
        />
        <Polygon
          path={polyPath}
          fillColor={color}
          fillOpacity={0.5}
        />
        <Line
          path={path}
          lineColor={color}
        />
        <BitmapText {...textProps}/>
      </DisplayObjectContainer>
    );
  }
}
