const choo = require('choo');
const html = require('choo/html');
const css = require('sheetify');
const chooStore = require('./client/choo-store');
const logger = require('./client/logger');

const app = choo();

app.use(logger);
app.use(chooStore(myReducer));

app.route('*', (state, emit) => html`<div>
  <h1>The value is ${state.state.value}</h1>
  <button onclick="${() => emit('decrement')}">-</button>
  <button onclick="${() => emit('nothing')}">Nothing button</button>
  <button onclick="${() => emit('increment')}">+</button>
</div>`);

app.mount('#app');


function myReducer(state = { value: 1 }, action) {
  console.log('reducer:', { state, action });
  switch(action.type) {
    case 'increment':
      return Object.assign({}, state, { value: state.value + 1 });
    case 'decrement':
      return Object.assign({}, state, { value: state.value - 1 });
    default:
      return state;
  }
}