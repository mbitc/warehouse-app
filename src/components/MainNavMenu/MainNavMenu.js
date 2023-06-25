import { NavLink } from 'react-router-dom';

const MainNavMenu = () => {
  return (
    <nav>
      <div>
        <ul>
          <li><NavLink to='/catalog'>Catalog</NavLink></li>
          <li><NavLink to='/location'>Location</NavLink></li>
          <li><NavLink to='/team'>Team</NavLink></li>
        </ul>
      </div>
      <div>
        <ul>
          <li><NavLink to='/'>Logout</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

export { MainNavMenu };