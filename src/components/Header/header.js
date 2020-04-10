import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import stravaLogo from '../../images/strava-logo.png';
import HeaderMenu from './HeaderMenu';

const Header = ({ siteTitle, profile }) => {
  return (
    <header className="header">
      <Link to="/" className="header__title">
        <img className="header__logo" src={stravaLogo} />
        {siteTitle}
      </Link>
      <HeaderMenu profile={profile} />
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
  profile: PropTypes.object,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;