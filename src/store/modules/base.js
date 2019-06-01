import produce from 'immer';
import { handleActions, createAction } from 'redux-actions';

const SHOW_MODAL = 'base/SHOW_MODAL';
const CLOSE_MODAL = 'base/CLOSE_MODAL';
const INITIALIZE_FORM = 'base/INITIALIZE_FORM';
const TOGGLE_CHEKC = 'base/TOGGLE_CHEKC';

export const showModal = createAction(SHOW_MODAL);
export const closeModal = createAction(CLOSE_MODAL);
export const initializeForm = createAction(INITIALIZE_FORM);
export const toggleCheck = createAction(TOGGLE_CHEKC);

const initialState = {
  modal: {
    state: false,
    message: ''
  }
};

export default handleActions(
  {
    [SHOW_MODAL]: (state, action) =>
      produce(state, draft => {
        const { message } = action.payload;
        draft.modal.state = true;
        draft.modal.message = message;

        if (action.payload.confirm) {
          const { confirm } = action.payload;
          draft.modal.confirm = confirm;
        }
      }),
    [CLOSE_MODAL]: (state, action) =>
      produce(state, draft => {
        draft.modal = initialState;
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
