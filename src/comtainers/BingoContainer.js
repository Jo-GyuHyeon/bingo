import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from '../store/modules/base';
import * as gameActions from '../store/modules/game';
import * as playersActions from '../store/modules/players';
import PlayerList from '../components/player/PlayerList';

const BingoContainer = ({
  base,
  game,
  players,
  BaseActions,
  GameActions,
  PlayerActions
}) => {
  const handleOnClick = e => {
    GameActions.playGame();
    PlayerActions.shuffleTable();
  };

  return (
    <div>
      <PlayerList players={players} started={game.start} />
      <button onClick={handleOnClick}>
        {!game.start ? 'start' : 'restart'}
      </button>
    </div>
  );
};

export default connect(
  state => ({
    base: state.base,
    game: state.game,
    players: state.players.players
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    GameActions: bindActionCreators(gameActions, dispatch),
    PlayerActions: bindActionCreators(playersActions, dispatch)
  })
)(BingoContainer);
