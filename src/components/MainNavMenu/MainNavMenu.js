import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { ROOT_PATH } from '../../config';
import style from './MainNavMenu.module.scss';

const MainNavMenu = () => {
  const [stack, setStack] = useState(false);

  const onStackHandler = () => setStack(true);
  const closeStackHandler = () => setStack(false);

  return (
    <nav className={style.mainNavMenu}>
      <div className={style.navGroup}>
        <ul className={`list ${style.menuList}`}>
          <li>
            <NavLink
              className={`link ${style.menuLink}`}
              to={`${ROOT_PATH}dashboard`}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`link ${style.menuLink}`}
              to={`${ROOT_PATH}catalog`}
            >
              Catalog
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`link ${style.menuLink}`}
              to={`${ROOT_PATH}location`}
            >
              Location
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`link ${style.menuLink}`}
              to={`${ROOT_PATH}picking`}
            >
              Picking
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`link ${style.menuLink}`}
              to={`${ROOT_PATH}team`}
            >
              Team
            </NavLink>
          </li>
        </ul>
        <ul className='list'>
          <li>
            <NavLink className={`link ${style.menuLink}`} to={ROOT_PATH}>
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={`${style.navGroupStack} ${!stack && style.onStack}`}>
        <ul className='list' onClick={closeStackHandler}>
          <li>
            <NavLink
              className={`link ${style.menuLink}`}
              to={`${ROOT_PATH}dashboard`}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`link ${style.menuLink}`}
              to={`${ROOT_PATH}catalog`}
            >
              Catalog
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`link ${style.menuLink}`}
              to={`${ROOT_PATH}location`}
            >
              Location
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`link ${style.menuLink}`}
              to={`${ROOT_PATH}picking`}
            >
              Picking
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`link ${style.menuLink}`}
              to={`${ROOT_PATH}team`}
            >
              Team
            </NavLink>
          </li>
          <li>
            <NavLink className={`link ${style.menuLink}`} to={ROOT_PATH}>
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
      <button
        onClick={onStackHandler}
        className={`${style.stack} ${stack && style.onStack}`}
      ></button>
    </nav>
  );
};

export { MainNavMenu };
