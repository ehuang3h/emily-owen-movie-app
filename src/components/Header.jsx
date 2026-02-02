// Header

const Header = ({ title }) => (
    <header>
        <h1>{title}</h1>
    </header>
);

Header.defaultProps = {
    title: '.MOV'
}

export default Header;
