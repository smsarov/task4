import { NavLink } from 'react-router-dom';
import type { NavLinkRenderProps } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import upload from '../../assets/upload.svg';
import history from '../../assets/history.svg';
import generate from '../../assets/generate.svg';

import styles from './Header.module.css';

function getNavLinkClasses({ isActive }: NavLinkRenderProps) {
  return (isActive ? [styles.nav_item, styles.active] : [styles.nav_item]).join(
    ' ',
  );
}

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.leftBlock}>
        <img src={logo} alt="Logo" />
        <h1 className={styles.title}>МЕЖГАЛАКТИЧЕСКАЯ АНАЛИТИКА</h1>
      </div>
      <nav className={styles.nav}>
        <NavLink to="/" className={getNavLinkClasses}>
          <img src={upload} alt="Upload" />
          CSV Аналитик
        </NavLink>
        <NavLink to="/generate" className={getNavLinkClasses}>
          <img src={generate} alt="Generate" />
          CSV Генератор
        </NavLink>
        <NavLink to="/history" className={getNavLinkClasses}>
          <img src={history} alt="History" />
          История
        </NavLink>
      </nav>
    </header>
  );
};
