// Header
import { NavLink } from 'react-router-dom';

const Header = ({ title }) => (
    <header>
        <nav id='nav-bar'>
            <NavLink id='logo' to="/">{title}</NavLink>
            <ul>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/contact">Favourites</NavLink></li>
            </ul>
        </nav>
    </header>
);

Header.defaultProps = {
    title: 'Default App'
}

export default Header;
