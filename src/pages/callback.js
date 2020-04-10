import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

import stravaAgent from '../agents/stravaAgents';

const Callback = ({ location }) => {
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    stravaAgent
      .authenticate(code)
      .then(({ expires_at, refresh_token, access_token, athlete }) => {
        localStorage.setItem('expires_at', expires_at);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('access_token', access_token);
        navigate('/');
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  }, []);

  return <span>Loading...</span>;
};

Callback.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Callback;
