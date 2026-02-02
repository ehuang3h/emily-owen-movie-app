import { NavLink } from 'react-router-dom';

const Nav = () => (
	<nav id='nav-bar'>
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/favourites">Favourites</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
        </ul>
	</nav>
);

export default Nav;