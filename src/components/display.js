import { createElement, Component, PropTypes } from 'react';
import { Stage } from 'react-pixi';

import FPS from '../containers/fps';
import Entities from '../containers/entities';

export default class Display extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    debug: PropTypes.bool.isRequired,
    // time: PropTypes.number.isRequired,
    // onRender: PropTypes.func,
    scale: PropTypes.number,
  };

  static defaultProps = {
    scale: 2,
  };

  // componentDidMount() {
  //   this.context = this.refs.canvas.getContext('2d');
  //   this.context.imageSmoothingEnabled = false;
  //   this.context.scale(this.props.scale, this.props.scale);
  //   this.handleRender();
  // }

  // componentDidUpdate() {
  //   this.handleRender();
  // }

  // handleRender() {
  //   const { width, height, scale } = this.props;
  //   const { gl } = this.refs.stage._pixirenderer;

  //   const pixelData = new Uint8Array(width * height * 4);
  //   gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixelData);

  //   const imageData = this.context.createImageData(width, height);
  //   imageData.data.set(pixelData);

  //   this.context.putImageData(imageData, 0, 0);
  // }

  render() {
    const { width, height, debug } = this.props;
    return (
      <Stage
        backgroundcolor={0x0}
        width={width}
        height={height}
        ref='stage'
      >
        <Entities />
        {debug ? <FPS /> : null}
      </Stage>
    );
  }
}
