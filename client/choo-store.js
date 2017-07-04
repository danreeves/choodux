const shallowEqual = require('../util/shallow-equal');

module.exports = function makeChooStore(reducer) {
    return function state(chooState, emitter) {
        // Initial state
        chooState.state = reducer(undefined, { type: '@choo/init' });
        // We'll use chooState.state so we don't clobber other stuff
        // like chooState.route. See https://github.com/yoshuawuyts/choo#state
        let ourState = chooState.state;

        // On every event
        emitter.on('*', (action, payload) => {
            // Save previous state
            const prevState = Object.assign({}, ourState);
            // Get next state
            ourState = Object.assign(
                {},
                ourState,
                reducer(ourState, { type: action, payload })
            );
            // See if anything changed
            if (!shallowEqual(prevState, ourState)) {
                // Update choo state
                chooState.state = ourState;
                // Rerender the page
                emitter.emit('render');
            }
        });
    };
};
