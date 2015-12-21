export function fold(array, callback) {
  for (let i = 0, len = array.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      callback(array[i], array[j]);
    }
  }
}

export function batchActions(callback, dispatch) {
  const actions = [];
  const _dispatch = action => {
    actions.push(action);
    return action;
  };
  callback(_dispatch);
  return actions.map(dispatch);
}
