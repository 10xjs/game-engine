import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

export function batchSubscribe(createStore) {
  return (reducer, initialState) => {
    const store = createStore(reducer, initialState);
    const listeners = [];

    return {
      ...store,
      originalSubscribe: store.subscribe,
      subscribe(listener) {
        listeners.push(listener);
        let isSubscribed = true;

        return function unsubscribe() {
          if (!isSubscribed) {
            return;
          }

          isSubscribed = false;
          const index = listeners.indexOf(listener);
          listeners.splice(index, 1);
        };
      },
      notify() {
        listeners.slice().forEach(listener => listener());
      },
    };
  };
}

export default compose(
  applyMiddleware(thunk),
  batchSubscribe,
)(createStore);
