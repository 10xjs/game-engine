import { connect } from 'react-redux';

import Display from '../components/display';

import {
  getDisplayWidth,
  getDisplayHeight,
  getDisplayDebug,
} from '../accessors/display';

const mapState = state => ({
  width: getDisplayWidth(state),
  height: getDisplayHeight(state),
  debug: getDisplayDebug(state),
});

export default connect(mapState)(Display);
