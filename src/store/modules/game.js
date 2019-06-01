import produce from 'immer';
import { handleActions, createAction } from 'redux-actions';

const INITIALIZE_FORM = 'game/INITIALIZE_FORM';
const PLAY_GAME = 'game/PLAY_GAME';
const SET_TURN = 'game/SET_TURN';

export const initializeForm = createAction(INITIALIZE_FORM);
export const playGame = createAction(PLAY_GAME);

const initialState = {
  start: false,
  turn: 0
};

export default handleActions(
  {
    [PLAY_GAME]: (state, action) =>
      produce(state, draft => {
        const turn = action.payload;
        draft.turn = turn;
      }),
    [SET_TURN]: (state, action) =>
      produce(state, draft => {
        draft.start = true;
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
