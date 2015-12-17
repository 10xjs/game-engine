import { createElement } from 'react';

import { SPACE } from './input/key-codes';
import { createEntity } from './actions/entitiy';
import { keyDown, keyUp } from './actions/input';
import { getKeyboardKey } from './accessors/input';
import createStore from './create-store';
import reducer from './reducers';
import { storeFrameDuration, frameCount } from './actions/stats';
import Root from './components/root';
import loop from './loop';
import Accumulator from './accumulator';

import render from './render';
import integrate from './integrator';

const dt = 1000 / 60;
const accumulator = new Accumulator();
const store = createStore(reducer);

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

function handleKeyDown(event) {
  if (event.keyCode === SPACE) {
    event.preventDefault();
  }
  store.dispatch(keyDown({
    keyCode: event.keyCode,
    timeStamp: event.timeStamp,
    initial: !getKeyboardKey(store.getState(), event.keyCode),
  }));
}

function handleKeyUp(event) {
  store.dispatch(keyUp({ keyCode: event.keyCode }));
}

loop((frameDuration) => {
  store.dispatch(frameCount());

  const iterations = accumulator.run(dt, frameDuration);

  for (let i = 0; i < iterations; i++) {
    const state = store.getState();
    const actions = integrate(dt, state);
    actions.map(store.dispatch);
  }

  store.notify();
  store.dispatch(storeFrameDuration(frameDuration));
});


console.log('create', createEntity({ id: 'player' }));
store.dispatch(createEntity({ id: 'player' }));

render(<Root store={store}/>);
