import { connect } from 'react-redux';

import { getFps, getFrameCount } from '../accessors/stats';
import { getDisplayWidth, getDisplayHeight } from '../accessors/display';

import FPS from '../components/fps';

const mapState = (state) => ({
  fps: getFps(state),
  frameCount: getFrameCount(state),
  displayWidth: getDisplayWidth(state),
  displayHeight: getDisplayHeight(state),
});

export default connect(mapState)(FPS);
