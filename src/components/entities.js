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

    const children = sortBy(entities, 'y').map(entity => {
      const { x, y } = entity;
      return (
        <Entity
          x={x}
          y={y}
        />
      );
    });

    return <DisplayObjectContainer children={children}/>;
  }
}
