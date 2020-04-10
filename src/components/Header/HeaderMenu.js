import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HeaderProfileButton from './HeaderProfileButton';

const HeaderMenu = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOffClick = () => {
    localStorage.removeItem('expires_at');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token');
    window.location.replace('/');
  };

  return (
    <>
      <button className="header__menu" onClick={() => setIsOpen(!isOpen)}>
        {profile ? <HeaderProfileButton profile={profile} /> : <div className="header__image" />}

        {isOpen && (
          <button className="header__menu-open" onClick={handleLogOffClick}>
            Log off
          </button>
        )}
      </button>
    </>
  );
};

HeaderMenu.propTypes = {
  profile: PropTypes.object,
};

export default HeaderMenu;
