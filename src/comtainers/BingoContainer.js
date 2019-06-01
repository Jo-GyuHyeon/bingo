import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from '../store/modules/base';
import * as gameActions from '../store/modules/game';
import * as playersActions from '../store/modules/players';
import AlertModal from '../components/Common/Modal/Alert';
import WarningModal from '../components/Common/Modal/warning';
import ModalPortal from '../components/Common/Modal/ModalPortal';
import PlayerList from '../components/Player/PlayerList';

const BingoContainer = ({
  modal,
  game,
  players,
  BaseActions,
  GameActions,
  PlayerActions
}) => {
  const BINGO_COUNT = 5;

  const handleOnplayClick = _ => {
    GameActions.playGame();
    PlayerActions.shuffleTable();
  };

  const handleOnCellClick = e => {
    if (!game.start) {
      return;
    }
    const player_id = parseInt(e.target.parentNode.dataset.id);
    const cell_id = parseInt(e.target.id);

    if (game.turn !== player_id) {
      BaseActions.showModal({
        type: 'warning',
        message: 'It is wrong turn.'
      });
      return;
    }
    _checkBingo(player_id, cell_id);
  };

  const _checkBingo = (player_id, cell_id) => {
    const table_size = players[0].table.length;
    const row = Math.floor(cell_id / table_size);
    const column = cell_id % table_size;
    const player_cell = players[player_id].table[row][column];

    if (player_cell.checked) {
      return;
    }

    PlayerActions.clickCell({ player_id, cell_id });
    PlayerActions.checkBingo({ player_id, cell_id });
    _confirmWinner();
    _nextTurn();
  };

  const _confirmWinner = () => {
    const winner = players.filter(
      player => player.completed.length >= BINGO_COUNT
    );
    if (winner.length > 0) {
      BaseActions.showModal({
        message: `${winner[0].id + 1}P completed the bingo`
      });
    }
    if (winner.length > 1) {
      BaseActions.showModal({ message: "It's a draw." });
    }
  };

  const _nextTurn = () => {
    const next_turn = (game.turn + 1) % players.length;
    GameActions.setNextTurn(next_turn);
  };

  const handleCloseModal = () => {
    BaseActions.closeModal();
    GameActions.initializeForm();
    PlayerActions.initializeForm();
  };

  return (
    <div>
      <PlayerList
        players={players}
        started={game.start}
        onClick={handleOnCellClick}
      />
      <button onClick={handleOnplayClick}>
        {!game.start ? 'start' : 'restart'}
      </button>
      {modal.state && (
        <ModalPortal>
          {modal.type === 'info' ? (
            <AlertModal onClose={handleCloseModal} message={modal.message} />
          ) : (
            <WarningModal
              onClose={BaseActions.closeModal}
              message={modal.message}
            />
          )}
        </ModalPortal>
      )}
    </div>
  );
};

export default connect(
  state => ({
    modal: state.base.modal,
    game: state.game,
    players: state.players.players
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    GameActions: bindActionCreators(gameActions, dispatch),
    PlayerActions: bindActionCreators(playersActions, dispatch)
  })
)(BingoContainer);
