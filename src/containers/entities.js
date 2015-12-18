import { connect } from 'react-redux';

import Entities from '../components/entities';

import {
  getEntities,
} from '../accessors/entities';

const mapState = state => ({
  entities: getEntities(state),
});

export default connect(mapState)(Entities);
