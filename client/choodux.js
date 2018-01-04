const shallowEqual = require('../util/shallow-equal');

module.exports = function makeChooStore(reducer) {
    return function state(chooState, emitter) {
        // Create initial state
        // We'll use chooState.state so we don't clobber other stuff
        // like chooState.route. See https://github.com/yoshuawuyts/choo#state
        chooState.state = reducer(undefined, { type: '@choo/init' });

        // On every event
        emitter.on('*', (action, timestamp, payload) => {
            // Save previous state
            const prevState = Object.assign({}, chooState.state);
            // Get next state
            const nextState = Object.assign(
                {},
                prevState,
                reducer(prevState, { type: action, payload })
            );
            // See if anything changed
            if (!shallowEqual(prevState, nextState)) {
                // Update choo state
                chooState.state = nextState;
                // Rerender the page
                emitter.emit('render');
            }
        });
    };
};
