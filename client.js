const choo = require('choo');
const html = require('choo/html');
const styles = require('./client/styles');
const choodux = require('./client/choodux');

const app = choo();

app.use(choodux(myReducer));

app.route('*', ({ state }, emit) => html`
    <body>
        <div class="${styles}">
            <h1>The value is ${state.value}</h1>
            <button onclick="${() => emit('decrement')}">-</button>
            <button onclick="${() => emit('nothing')}">This button does nothing</button>
            <button onclick="${() => emit('increment')}">+</button>
            <button onclick="${() => emit('increment', 2)}">+2</button>
        </div>
    </body>`);

app.mount('body');

function myReducer(state = { value: 1 }, action) {
    console.log('State:', state, 'Action:', action);
    switch (action.type) {
        case 'increment':
            return Object.assign(
              {}, 
              state, 
              { 
                value: state.value + (action.payload || 1) 
              }
            );
        case 'decrement':
            return Object.assign({}, state, { value: state.value - 1 });
        default:
            return state;
    }
}
