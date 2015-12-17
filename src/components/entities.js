import { createElement, Component, PropTypes } from 'react';
import { DisplayObjectContainer } from 'react-pixi';
import sortBy from 'lodash.sortby';

import Entity from './entity';

export default class Entities extends Component {
  static propTypes = {
    entities: PropTypes.array.isRequired,
  };

  render() {
    const { entities } = this.props;

    const children = sortBy(entities, entity => entity.position.y)
      .map(entity => {
        const { position, size, state } = entity;
        return (
          <Entity size={size} position={position} state={state} />
        );
      });

    return <DisplayObjectContainer children={children}/>;
  }
}
