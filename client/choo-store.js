const sheq = require('../util/shallow-equal');

module.exports = function makeChooStore (reducer) {
  
  return function state (chooState, emitter) {

    // Initial state
    chooState.state = reducer(undefined, { type: '@choo/init' });
    let ourState = chooState.state;

    emitter.on('*', (action, payload) => {
      // Save previous state
      const prevState = Object.assign({}, ourState);
      // Get next state
      ourState = Object.assign({}, ourState, reducer(ourState, { type: action, payload }));
      // See if anything changed
      if (!sheq(prevState, ourState)) {
        // Update choo state
        chooState.state = ourState;
        // Rerender the page
        emitter.emit('render');
      }
    });
  }
}
