import * as React from 'react';
import './styles.scss';

const PageTemplate = ({ children }) => (
  <div className="page">
    <header className="page__header">
      <div className="page__header-title">BINGO</div>
    </header>
    <main className="page__body">{children}</main>
  </div>
);

export default PageTemplate;
