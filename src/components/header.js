import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import stravaLogo from '../images/strava-logo.png';

const Header = ({ siteTitle }) => {
  const handleLogOffClick = () => {
    localStorage.removeItem('expires_at');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token');
    window.location.replace('/');
  };

  return (
    <header className="header">
      <Link to="/" className="header__title">
        <img className="header__logo" src={stravaLogo} />
        {siteTitle}
      </Link>
      <button onClick={handleLogOffClick}>Log off</button>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
