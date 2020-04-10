import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import stravaLogo from '../images/strava-logo.png';

const Header = ({ siteTitle }) => (
  <header className="header">
    <Link to="/" className="header__title">
      <img style={{ width: 100 }} src={stravaLogo} />
      {siteTitle}
    </Link>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
