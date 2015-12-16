import { Component, PropTypes, Children } from 'react';

export default class Provider extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = {
    state: PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      state: this.props.state,
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}
