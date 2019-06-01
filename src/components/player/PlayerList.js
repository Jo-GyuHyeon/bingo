import React from 'react';
import Player from './Player';
import './styles.scss';

const Players = ({ players, started }) =>
  players.map((player, index) => (
    <Player key={index} PlayerId={index} player={player} started={started} />
  ));

const PlayerList = ({ players, started }) => {
  return (
    <div className="list">
      <Players players={players} started={started} />
    </div>
  );
};

export default PlayerList;
