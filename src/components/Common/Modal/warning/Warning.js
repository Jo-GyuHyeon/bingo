import React, { Component } from 'react';
import './style.scss';

class WarningModal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.keyEventFuction, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyEventFuction, false);
  }

  keyEventFuction = event => {
    if (event.keyCode === 13 || event.keyCode === 27) {
      this.props.onClose();
    }
  };

  render() {
    const { onClose, message } = this.props;
    return (
      <div className="warning-modal">
        <div className="warning-modal__wrapper">
          <div className="warning-modal-title">{'WARNNING!'}</div>
          <div className="warning-modal-message">{message}</div>
          <div className="warning-modal-button">
            <button className="btn warning" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default WarningModal;
