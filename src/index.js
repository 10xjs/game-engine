import { createElement } from 'react';

import { SPACE, LEFT, RIGHT, UP, DOWN } from './input/key-codes';
import { createEntity } from './actions/entitiy';
import { keyDown, keyUp } from './actions/input';
import { setPlayerID } from './actions/local';
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
  if ([ SPACE, LEFT, RIGHT, UP, DOWN ].indexOf(event.keyCode) !== -1) {
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

function provision() {
  store.dispatch(setPlayerID('player'));
  store.dispatch(createEntity({
    id: 'player',
    position: { x: 8, y: 8 },
    speed: 1.5,
  }));

  store.dispatch(createEntity({ id: 'npc1', position: { x: 100, y: 100 } }));
}

function loopHandler(frameDuration) {
  store.dispatch(frameCount());
  store.dispatch(storeFrameDuration(frameDuration));

  const iterations = accumulator.run(dt, frameDuration);

  for (let i = 0; i < iterations; i++) {
    const state = store.getState();
    const actions = integrate(state);
    actions.map(store.dispatch);
  }

  store.notify();
}

provision();

loop(loopHandler);

render(<Root store={store}/>);
