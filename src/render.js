import { render } from 'react-pixi';
import { createElement } from 'react';
import Root from './components/root';

export default function(store) {
  render(<Root store={store}/>, document.getElementById('game'));
}
