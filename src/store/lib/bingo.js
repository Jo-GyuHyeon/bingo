export const bingo = {
  getHorizonBingo(table, row) {
    const isBingo = Array.from(table[row]).every(column => {
      return column.checked;
    });

    if (!isBingo) {
      return [];
    }
    const completed = Array.from(table[row]).map(column => column.value);
    return completed;
  },
  getVerticalBingo(table, column) {
    const isBingo = Array.from(table).every(row => {
      return row[column].checked;
    });
    if (!isBingo) {
      return [];
    }
    const completed = Array.from(table).map(row => row[column].value);
    return completed;
  },
  getLeftDiagonalBingo(table, row, column) {
    if (row !== column) return [];

    const completed = [];
    for (let i = 0; i < table.length; i++) {
      if (!table[i][i].checked) {
        return [];
      }
      completed.push(table[i][i].value);
    }
    return completed;
  },
  getRightDiagonalBingo(table, row, column) {
    if (column !== table.length - 1 - row) return [];

    const completed = [];
    for (let i = 0; i < table.length; i++) {
      if (!table[i][table.length - 1 - i].checked) {
        return [];
      }
      completed.push(table[table.length - 1 - i][i].value);
    }
    return completed;
  },

  getCheckedCellRowAndColumn(table, checked_cell) {
    for (let row = 0; row < table.length; row++) {
      for (let column = 0; column < table.length; column++) {
        if (table[row][column].value === checked_cell.value) {
          return { row, column };
        }
      }
    }
  }
};
