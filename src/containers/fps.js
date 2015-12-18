import { connect } from 'react-redux';

import { getFps, getTime } from '../accessors/stats';
import { getDisplayWidth, getDisplayHeight } from '../accessors/display';

import FPS from '../components/fps';

const mapState = (state) => ({
  fps: getFps(state),
  time: getTime(state),
  displayWidth: getDisplayWidth(state),
  displayHeight: getDisplayHeight(state),
});

export default connect(mapState)(FPS);
