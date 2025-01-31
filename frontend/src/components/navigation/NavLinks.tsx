import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';
import { AuthContext } from '../../shared/context/auth-context';

const NavLinks = () => {

  const auth = useContext(AuthContext);

  return <ul className="nav-links">
    <li>
      <NavLink to="/">ALL USERS</NavLink>
    </li>
    {!auth.isLoggedIn && (
      <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
    )}
    {auth.isLoggedIn && (
      <li>
        <button onClick={auth.logout}>LOGOUT</button>
      </li>
    )}
  </ul>
};

export default NavLinks;