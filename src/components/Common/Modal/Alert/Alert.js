import React, { Component } from 'react';
import './style.scss';

class AlertModal extends Component {
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
      <div className="modal">
        <div className="modal__wapper">
          <div className="modal-message">{message}</div>
          <div className="modal-button">
            <button className="btn" onClick={onClose}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AlertModal;
