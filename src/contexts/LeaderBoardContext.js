import React from 'react';
import _ from 'lodash';

const defaultState = {
  leaderboardBySegmentId: {},
  setLeaderboard: () => {},
};

const LeaderBoardContext = React.createContext(defaultState);

class LeaderBoardProvider extends React.Component {
  state = {
    leaderboardBySegmentId: {},
  };

  setLeaderboard = (segmentId, leaderboard) => {
    this.setState({ ...this.state, leaderboardBySegmentId: { ...this.state.leaderboardBySegmentId, [segmentId]: leaderboard } });
  };

  render() {
    const { children } = this.props;
    const { leaderboardBySegmentId } = this.state;

    return <LeaderBoardContext.Provider value={{ leaderboardBySegmentId, setLeaderboard: this.setLeaderboard }}>{children}</LeaderBoardContext.Provider>;
  }
}

export default LeaderBoardContext;

export { LeaderBoardProvider };
