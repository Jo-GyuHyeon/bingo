import * as React from 'react';
import './style.scss';

const Button = ({ children, onClick, disabled }) => (
  <button className="button" onClick={onClick} disabled={disabled || false}>
    {children}
  </button>
);

export default Button;
