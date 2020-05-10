import axios from 'axios';

const baseUrl = process.env.GATSBY_BACKEND_API_URL;

export default {
  getAthlete: async athleteId => {
    const result = await axios.get(`${baseUrl}/athlete/${athleteId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      crossDomain: true,
    });

    return result.data;
  },
  getActivities: async athleteId => {
    const result = await axios.get(`${baseUrl}/athlete/${athleteId}/activity`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      crossDomain: true,
    });

    return result.data;
  },
  getGear: async id => {
    const result = await axios.get(`${baseUrl}/gear/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      crossDomain: true,
    });

    return result.data;
  },
  getActivity: async id => {
    const result = await axios.get(`${baseUrl}/activity/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      crossDomain: true,
    });

    return result.data;
  },
  getSegment: async id => {
    const result = await axios.get(`${baseUrl}/segment/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      crossDomain: true,
    });

    return result.data;
  },
  getSegmentEffortsByActivity: async activityId => {
    const result = await axios.get(`${baseUrl}/activity/${activityId}/segmentefforts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      crossDomain: true,
    });

    return result.data;
  },
  getSegmentEffortsBySegment: async segmentId => {
    const result = await axios.get(`${baseUrl}/segment/${segmentId}/segmentefforts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      crossDomain: true,
    });

    return result.data;
  },
  getSegmentEffortsByUser: async userId => {
    const result = await axios.get(`${baseUrl}/athlete/${userId}/segmentefforts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      crossDomain: true,
    });

    return result.data;
  },
  getBestSegmentEffortsByUser: async userId => {
    const result = await axios.get(`${baseUrl}/athlete/${userId}/bestsegmentefforts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      crossDomain: true,
    });

    return result.data;
  },
  getClosestSegmentEffortsByUser: async (userId, lat, lon) => {
    const result = await axios.get(`${baseUrl}/athlete/${userId}/closestsegmentefforts/${lat}/${lon}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      crossDomain: true,
    });

    return result.data;
  },
  sync: async userId => {
    const result = await axios.post(
      `${baseUrl}/athlete/${userId}/sync`,
      { accessToken: localStorage.getItem('access_token') },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        crossDomain: true,
      },
    );

    return result.data;
  },
};
