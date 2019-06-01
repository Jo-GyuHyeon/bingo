import React from 'react';
import Player from './Player';
import './styles.scss';

const Players = ({ players, started, onClick }) =>
  players.map((player, index) => (
    <Player
      key={index}
      PlayerId={index}
      player={player}
      started={started}
      onClick={onClick}
    />
  ));

const PlayerList = ({ players, started, onClick }) => {
  return (
    <div className="list">
      <Players players={players} started={started} onClick={onClick} />
    </div>
  );
};

export default PlayerList;
