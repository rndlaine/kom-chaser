import React from 'react';
import _ from 'lodash';
import { setWithItemExpiry, getWithItemExpiry } from '../helpers/localStorageHelpers';

const defaultState = {
  leaderboardBySegmentId: {},
  setLeaderboard: () => {},
};

const LeaderBoardContext = React.createContext(defaultState);

class LeaderBoardProvider extends React.Component {
  state = {
    leaderboardBySegmentId: {},
    storeHydrated: false,
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const leaderboardBySegmentId = getWithItemExpiry('leaderboardBySegmentId');
      if (leaderboardBySegmentId) {
        this.setState({ leaderboardBySegmentId });
      }
    }

    this.setState({ storeHydrated: true });
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.leaderboardBySegmentId !== this.state.leaderboardBySegmentId) {
      setWithItemExpiry('leaderboardBySegmentId', this.state.leaderboardBySegmentId, 1000 * 60 * 60 * 2);
    }
  }

  setLeaderboard = (segmentId, leaderboard) => {
    this.setState({ ...this.state, leaderboardBySegmentId: { ...this.state.leaderboardBySegmentId, [segmentId]: leaderboard } });
  };

  render() {
    const { children } = this.props;
    const { leaderboardBySegmentId, storeHydrated } = this.state;

    return <LeaderBoardContext.Provider value={{ storeHydrated, leaderboardBySegmentId, setLeaderboard: this.setLeaderboard }}>{children}</LeaderBoardContext.Provider>;
  }
}

export default LeaderBoardContext;

export { LeaderBoardProvider };
