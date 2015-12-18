import Pixi from 'pixi.js';
import { SPACE, LEFT, RIGHT, UP, DOWN } from './input/key-codes';
import { createEntity } from './actions/entitiy';
import { keyDown, keyUp } from './actions/input';
import { setPlayerID } from './actions/local';
import { getKeyboardKey } from './accessors/input';
import createStore from './create-store';
import reducer from './reducers';
import { storeFrameDuration, tick } from './actions/stats';
import loop from './loop';
import createAccumulator from './accumulator';

import render from './render';
import integrate from './integrator';

const dt = 1000 / 60;
const accumulator = createAccumulator(dt);
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

function loadAssets() {
  return new Promise((resolve, reject) => {
    const loader = Pixi.loader;
    loader.add('verdana', '/src/assets/fonts/verdana.fnt');
    loader.on('complete', resolve);
    loader.on('error', reject);
    loader.load();
  });
}

function provision() {
  store.dispatch(setPlayerID('player'));
  store.dispatch(createEntity({
    id: 'player',
    position: { x: 8, y: 8 },
    speed: 1.125,
    active: true,
    dynamic: true,
    iMass: 2,
  }));

  store.dispatch(createEntity({
    id:
    'npc1',
    position: { x: 16, y: 50 },
    active: true,
    dynamic: true,
  }));

  store.dispatch(createEntity({
    id:
    'npc2',
    position: { x: 32, y: 50 },
    active: true,
    dynamic: true,
  }));

  store.dispatch(createEntity({
    id:
    'npc3',
    position: { x: 64, y: 50 },
    active: true,
    dynamic: true,
  }));

  store.dispatch(createEntity({
    id:
    'npc4',
    position: { x: 96, y: 50 },
    active: true,
    dynamic: true,
    iMass: 1,
  }));
}

function loopHandler(frameDuration) {
  store.dispatch(storeFrameDuration(frameDuration));

  const iterations = accumulator(frameDuration);

  for (let i = 0; i < iterations; i++) {
    integrate(store);
    store.dispatch(tick());
  }

  store.notify();
}

loadAssets().then(() =>{
  provision();
  loop(loopHandler);
  render(store);
}).catch(error => {
  throw error;
});

