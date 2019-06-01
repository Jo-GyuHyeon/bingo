import produce from 'immer';
import { handleActions, createAction } from 'redux-actions';

const TABLE_SIZE = 5;
const SHUFFLE_TABLE = 'palyers/SHUFFLE_TABLE';
const ADD_COMPLETED = 'palyers/ADD_COMPLETED';
const INITIALIZE_FORM = 'palyers/INITIALIZE_FORM';

export const showModal = createAction(SHUFFLE_TABLE);
export const addCompleted = createAction(ADD_COMPLETED);
export const initializeForm = createAction(INITIALIZE_FORM);

let default_table = Array.from(Array(TABLE_SIZE), () => Array());

for (let i = 0; i < TABLE_SIZE * TABLE_SIZE; i++) {
  default_table[Math.floor(i / 5)].push(i + 1);
}

const _player = {
  table: default_table,
  completed: []
};

const initialState = [{ ..._player }, { ..._player }];

export default handleActions(
  {
    [SHUFFLE_TABLE]: (state, action) =>
      produce(state, draft => {
        const { message } = action.payload;
        draft.modal.state = true;
        draft.modal.message = message;

        if (action.payload.confirm) {
          const { confirm } = action.payload;
          draft.modal.confirm = confirm;
        }
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
