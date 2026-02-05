// Header
import { NavLink } from 'react-router-dom';

const Header = ({ title }) => (
    <header>
        <nav id='nav-bar'>
            <NavLink id='logo' to="/">{title}</NavLink>
            <ul>
                <li><NavLink className='nav-links' to="/">Home</NavLink></li>
                <li><NavLink className='nav-links' to="/favourites">Favourites</NavLink></li>
                <li><NavLink className='nav-links' to="/about">About</NavLink></li>
            </ul>
        </nav>
    </header>
);

Header.defaultProps = {
    title: '.MOV'
}

export default Header;
