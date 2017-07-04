const choo = require('choo');
const html = require('choo/html');
const styles = require('./client/styles');
const logger = require('./client/logger');
const chooStore = require('./client/choo-store');

const app = choo();
const styles = css`
    html, body {
      margin:0;
      padding:0;
      font-family: sans-serif;
      background-color: palegreen;
      font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif;
    }
    body {
      margin: 2em;
    }
    a {
      text-decoration: none;
      font-weight: bold;
      color: deeppink;
    }
    button {
      background: none;
      font-size: 1.5em;
      margin: 0.2em;
      padding: 0.2em;
      border: 0.15em solid deeppink;
      color: deeppink;
      font-weight: bold;
      font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif;
      line-height: 1em;
      vertical-align: text-bottom;
    }
    button:hover {
      text-shadow: 0.1em 0.1em 0px hotpink;
      box-shadow: 0.1em 0.1em 0px hotpink;
      cursor: pointer;
    }
`;

app.use(logger);
app.use(chooStore(myReducer));

app.route('*', (state, emit) => html`<div class="${styles}">
    <h1>The value is ${state.state.value}</h1>
    <button onclick="${() => emit('decrement')}">-</button>
    <button onclick="${() => emit('nothing')}">This button does nothing</button>
    <button onclick="${() => emit('increment')}">+</button>
</div>`);

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
