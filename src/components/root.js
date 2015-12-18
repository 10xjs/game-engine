import { createElement, Component, PropTypes } from 'react';
import { Provider } from 'react-redux';

import Display from '../containers/display';

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    onRender: PropTypes.func,
  };
  render() {
    return (
      <Provider store={this.props.store}>
        <Display onRender={this.props.onRender}/>
      </Provider>
    );
  }
}

