import axios from 'axios';

export default {
  authenticate: async code => {
    const result = await axios.post(
      process.env.GATSBY_AUTH_URL,
      {
        client_id: process.env.GATSBY_CLIENT_ID,
        client_secret: process.env.GATSBY_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
      },
      { crossDomain: true },
    );

    return result.data;
  },
  refreshToken: async refreshToken => {
    const result = await axios.post(
      process.env.GATSBY_AUTH_URL,
      {
        client_id: process.env.GATSBY_CLIENT_ID,
        client_secret: process.env.GATSBY_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      },
      { crossDomain: true },
    );

    return result.data;
  },
  getProfile: async () => {
    const result = await axios.get('https://www.strava.com/api/v3/athlete', {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      crossDomain: true,
    });

    return result.data;
  },
  listActivities: async () => {
    const limit = 200;
    const result = await axios.get(`https://www.strava.com/api/v3/athlete/activities?per_page=${limit}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      crossDomain: true,
    });

    return result.data;
  },
  getActivity: async id => {
    const result = await axios.get(`https://www.strava.com/api/v3/activities/${id}`, {
      headers: { Authorization: `Bearer ${typeof window !== 'undefined' && localStorage.getItem('access_token')}` },
      crossDomain: true,
    });

    return result.data;
  },
  getEquipment: async id => {
    console.log('getEquipment: ');
    const result = await axios.get(`https://www.strava.com/api/v3/gear/${id}`, {
      headers: { Authorization: `Bearer ${typeof window !== 'undefined' && localStorage.getItem('access_token')}` },
      crossDomain: true,
    });

    return result.data;
  },
  getSegmentLeaderBoard: async id => {
    console.log('getSegmentLeaderBoard: ');
    const result = await axios.get(`https://www.strava.com/api/v3/segments/${id}/leaderboard`, {
      headers: { Authorization: `Bearer ${typeof window !== 'undefined' && localStorage.getItem('access_token')}` },
      crossDomain: true,
    });

    return result.data;
  },
};
