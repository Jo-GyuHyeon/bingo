import React, { Fragment } from 'react';
import './styles.scss';

const BingoTable = ({ table, started, PlayerId, onClick }) => {
  const table_size = table.length;
  const bingo_table = table.map((row, row_index) => (
    <Fragment key={row_index}>
      {row.map((cell, cell_index) => {
        const id = row_index * table_size + cell_index;
        return (
          <div
            key={cell_index}
            id={id}
            style={{ backgroundColor: cell.checked && 'black' }}
          >
            {started && cell.value}
          </div>
        );
      })}
    </Fragment>
  ));
  return (
    <div className="player-table" data-id={PlayerId} onClick={onClick}>
      {bingo_table}
    </div>
  );
};

const CompletedCells = ({ completed }) => {
  return completed.map((completedElement, index) => {
    return <div key={index}>[{completedElement.join(', ')}]</div>;
  });
};

const Player = ({ player, PlayerId, started, onClick }) => {
  return (
    <div className="player">
      <div className="player-title">{PlayerId + 1}P player</div>
      <BingoTable
        table={player.table}
        started={started}
        PlayerId={PlayerId}
        onClick={onClick}
      />
      <div className="player-completed">
        <span>Completed Bingo: {player.completed.length} </span>
        <CompletedCells completed={player.completed} />
      </div>
    </div>
  );
};

export default Player;
