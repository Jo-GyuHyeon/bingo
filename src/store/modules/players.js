import produce from 'immer';
import { handleActions, createAction } from 'redux-actions';

const TABLE_SIZE = 5;
const SHUFFLE_TABLE = 'palyers/SHUFFLE_TABLE';
const ADD_COMPLETED = 'palyers/ADD_COMPLETED';
const INITIALIZE_FORM = 'palyers/INITIALIZE_FORM';

export const shuffleTable = createAction(SHUFFLE_TABLE);
export const addCompleted = createAction(ADD_COMPLETED);
export const initializeForm = createAction(INITIALIZE_FORM);

const table = {
  bingo_table: Array.from(Array(TABLE_SIZE), () => Array(0)),
  numbers: Array.from(Array(TABLE_SIZE * TABLE_SIZE).keys()),
  init() {
    return this.setTable(this.numbers);
  },
  setTable(numbers) {
    this.bingo_table = Array.from(Array(TABLE_SIZE), () => Array(0));
    for (let i = 0; i < numbers.length; i++) {
      this.bingo_table[Math.floor(i / TABLE_SIZE)].push({
        value: numbers[i] + 1,
        checked: false
      });
    }
    return this.bingo_table;
  },
  shuffle() {
    const shuffled_numbers = this.numbers
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);

    return this.setTable(shuffled_numbers);
  }
};

const _player = {
  table: table.init(),
  completed: []
};

const initialState = { players: [{ ..._player }, { ..._player }] };

export default handleActions(
  {
    [SHUFFLE_TABLE]: (state, action) =>
      produce(state, draft => {
        draft.players = draft.players.map(_ => {
          return { completed: [], table: table.shuffle() };
        });
      }),
    [ADD_COMPLETED]: (state, action) =>
      produce(state, draft => {
        const { player_id, completed } = action.payload;
        draft[player_id].completed = [
          ...this.state[player_id].completed,
          completed
        ];
      }),
    [INITIALIZE_FORM]: state =>
      produce(state, draft => {
        const initialForm = initialState;
        const keys = Object.keys(initialForm);
        keys.forEach(key => {
          draft[key] = initialForm[key];
        });
      })
  },
  initialState
);
