import { connect } from 'react-redux';

import Entities from '../components/entities';

import {
  getEntitiesArray,
} from '../accessors/entities';

const mapState = state => ({
  entities: getEntitiesArray(state),
});

export default connect(mapState)(Entities);
