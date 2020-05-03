import axios from 'axios';

// TODO: .env
const baseUrl = 'http://localhost:3000';

export default {
  getActivities: async athleteId => {
    const result = await axios.get(`${baseUrl}/athlete/${athleteId}/activity`);

    return result.data;
  },
  getGear: async id => {
    const result = await axios.get(`${baseUrl}/gear/${id}`);

    return result.data;
  },
  getActivity: async id => {
    const result = await axios.get(`${baseUrl}/activity/${id}`);

    return result.data;
  },
  getSegment: async id => {
    const result = await axios.get(`${baseUrl}/segment/${id}`);

    return result.data;
  },
  getSegmentEffortsByActivity: async activityId => {
    const result = await axios.get(`${baseUrl}/activity/${activityId}/segmentefforts`);

    return result.data;
  },
  getSegmentEffortsBySegment: async segmentId => {
    const result = await axios.get(`${baseUrl}/segment/${segmentId}/segmentefforts`);

    return result.data;
  },
  getSegmentEffortsByUser: async userId => {
    const result = await axios.get(`${baseUrl}/athlete/${userId}/segmentefforts`);

    return result.data;
  },
  getSegmentLeaderBoard: async segmentId => {
    const result = await axios.get(`${baseUrl}/segment/${segmentId}/leaderboard`);

    return result.data;
  },
};
