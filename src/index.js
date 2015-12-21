import Pixi from 'pixi.js';
import { KEYS_SCROLL_WINDOW } from './constants/input';
import { createEntity } from './actions/entitiy';
import { keyDown, keyUp } from './actions/input';
import { setPlayerEntityID } from './actions/local';
import createStore from './create-store';
import reducer from './reducers';
import { frame, tick } from './actions/stats';
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
  if (KEYS_SCROLL_WINDOW.indexOf(event.keyCode) !== -1) {
    event.preventDefault();
  }
  store.dispatch(keyDown({
    keyCode: event.keyCode,
    timeStamp: event.timeStamp,
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
  store.dispatch(setPlayerEntityID('player'));
  store.dispatch(createEntity({
    id: 'player',
    position: { x: 8, y: 8 },
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
  const iterations = accumulator(frameDuration);

  for (let i = 0; i < iterations; i++) {
    //
    integrate(store);

    // Advance the state clock.
    // This event is used to advance animations and flush input.
    store.dispatch(tick());
  }

  store.notify();
  store.dispatch(frame(frameDuration));
}

loadAssets().then(() =>{
  provision();
  loop(loopHandler);
  render(store);
}).catch(error => {
  throw error;
});

