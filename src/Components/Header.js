import React from 'react';
import gif from '../images/projectIntro.gif';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={ styles.container }>
      <img src={ gif } alt="star wars planets intro" />
    </header>
  );
}

export default Header;
