const choo = require('choo');
const html = require('choo/html');
const styles = require('./client/styles');
const logger = require('./client/logger');
const chooStore = require('./client/choo-store');

const app = choo();

app.use(logger);
app.use(chooStore(myReducer));

app.route(
    '*',
    ({ state }, dispatch) => (
        console.log(state),
        html`<div class="${styles}">
  <h1>The value is ${state.value}</h1>
  <button onclick="${() => dispatch('decrement')}">-</button>
  <button onclick="${() =>
      dispatch('nothing')}">This button does nothing</button>
  <button onclick="${() => dispatch('increment')}">+</button>
</div>`
    )
);

app.mount('#app');

function myReducer(state = { value: 1 }, action) {
    console.log('reducer:', { state, action });
    switch (action.type) {
        case 'increment':
            return Object.assign({}, state, { value: state.value + 1 });
        case 'decrement':
            return Object.assign({}, state, { value: state.value - 1 });
        default:
            return state;
    }
}
