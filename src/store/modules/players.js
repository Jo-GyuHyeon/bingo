import produce from 'immer';
import { handleActions, createAction } from 'redux-actions';
import { bingo } from '../lib/bingo';

const TABLE_SIZE = 5;
const SHUFFLE_TABLE = 'palyers/SHUFFLE_TABLE';
const CHECK_BINGO = 'palyers/CHECK_BINGO';
const CLICK_CELL = 'palyers/CLICK_CELL';
const INITIALIZE_FORM = 'palyers/INITIALIZE_FORM';

export const shuffleTable = createAction(SHUFFLE_TABLE);
export const checkBingo = createAction(CHECK_BINGO);
export const clickCell = createAction(CLICK_CELL);
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
  id: 0,
  table: table.init(),
  completed: []
};

const initialState = {
  players: [{ ..._player, id: 0 }, { ..._player, id: 1 }]
};

export default handleActions(
  {
    [SHUFFLE_TABLE]: (state, action) =>
      produce(state, draft => {
        draft.players = state.players.map((_, index) => {
          return { id: index, table: table.shuffle(), completed: [] };
        });
      }),
    [CHECK_BINGO]: (state, action) =>
      produce(state, draft => {
        const { player_id, cell_id } = action.payload;

        const row = Math.floor(cell_id / TABLE_SIZE);
        const column = cell_id % TABLE_SIZE;
        const checked_cell = state.players[player_id].table[row][column];

        state.players.forEach((player, index) => {
          const completed = player.completed;
          const cell_position = bingo.getCheckedCellRowAndColumn(
            player.table,
            checked_cell
          );
          const horizonBingo = bingo.getHorizonBingo(
            player.table,
            cell_position.row
          );

          if (horizonBingo.length !== 0) {
            completed.push(horizonBingo);
          }

          const verticalBingo = bingo.getVerticalBingo(
            player.table,
            cell_position.column
          );

          if (verticalBingo.length !== 0) {
            completed.push(verticalBingo);
          }

          const leftDiagonalBingo = bingo.getLeftDiagonalBingo(
            player.table,
            cell_position.row,
            cell_position.column
          );

          if (leftDiagonalBingo.length !== 0) {
            completed.push(leftDiagonalBingo);
          }
          const rightDiagonalBingo = bingo.getRightDiagonalBingo(
            player.table,
            cell_position.row,
            cell_position.column
          );

          if (rightDiagonalBingo.length !== 0) {
            completed.push(rightDiagonalBingo);
          }

          draft.players[index].completed = completed;
        });
      }),
    [CLICK_CELL]: (state, action) =>
      produce(state, draft => {
        const { player_id, cell_id } = action.payload;
        const row = Math.floor(cell_id / TABLE_SIZE);
        const column = cell_id % TABLE_SIZE;
        const checked_cell = state.players[player_id].table[row][column];

        draft.players = state.players.map(player => {
          const table = player.table.map(row => {
            const table_rows = row.map(column => {
              return {
                ...column,
                checked:
                  checked_cell.value === column.value ? true : column.checked
              };
            });
            return table_rows;
          });
          return { ...player, table };
        });
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
