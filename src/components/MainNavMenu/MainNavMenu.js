import { NavLink } from 'react-router-dom';
import style from './MainNavMenu.module.scss';

const MainNavMenu = () => {
  return (
    <nav className={style.mainNavMenu}>
      <div className={style.navGroup}>
        <ul className={`list ${style.menuList}`}>
          <li><NavLink className={`link ${style.menuLink}`} to='/dashboard'>Dashboard</NavLink></li>
          <li><NavLink className={`link ${style.menuLink}`} to='/catalog'>Catalog</NavLink></li>
          <li><NavLink className={`link ${style.menuLink}`} to='/location'>Location</NavLink></li>
          <li><NavLink className={`link ${style.menuLink}`} to='/team'>Team</NavLink></li>
        </ul>
        <ul className='list'>
          <li><NavLink className={`link ${style.menuLink}`} to='/'>Logout</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

export { MainNavMenu };