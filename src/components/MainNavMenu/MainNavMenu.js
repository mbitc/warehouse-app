import { NavLink } from 'react-router-dom';
import style from './MainNavMenu.module.scss';
import { useState } from 'react';

const MainNavMenu = () => {
  const [stack, setStack] = useState(false);

  const onStackHandler = () => setStack(true);
  const closeStackHandler = () => setStack(false);

  return (
    <nav className={style.mainNavMenu}>
      <div className={style.navGroup}>
        <ul className={`list ${style.menuList}`}>
          <li><NavLink className={`link ${style.menuLink}`} to='/warehouse-app/dashboard'>Dashboard</NavLink></li>
          <li><NavLink className={`link ${style.menuLink}`} to='/warehouse-app/catalog'>Catalog</NavLink></li>
          <li><NavLink className={`link ${style.menuLink}`} to='/warehouse-app/location'>Location</NavLink></li>
          <li><NavLink className={`link ${style.menuLink}`} to='/warehouse-app/team'>Team</NavLink></li>
        </ul>
        <ul className='list'>
          <li><NavLink className={`link ${style.menuLink}`} to='/warehouse-app'>Logout</NavLink></li>
        </ul>
      </div>
      <div className={`${style.navGroupStack} ${!stack && style.onStack}`}>
        <ul className='list' onClick={closeStackHandler}>
          <li><NavLink className={`link ${style.menuLink}`} to='/warehouse-app/dashboard'>Dashboard</NavLink></li>
          <li><NavLink className={`link ${style.menuLink}`} to='/warehouse-app/catalog'>Catalog</NavLink></li>
          <li><NavLink className={`link ${style.menuLink}`} to='/warehouse-app/location'>Location</NavLink></li>
          <li><NavLink className={`link ${style.menuLink}`} to='/warehouse-app/team'>Team</NavLink></li>
          <li><NavLink className={`link ${style.menuLink}`} to='/warehouse-app'>Logout</NavLink></li>
        </ul>
      </div>
        <button onClick={onStackHandler} className={`${style.stack} ${stack && style.onStack}`}></button>
    </nav>
  );
};

export { MainNavMenu };