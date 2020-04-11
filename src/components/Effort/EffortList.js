import React from 'react';
import PropTypes from 'prop-types';
import EffortCard from './EffortCard';
import LoadingCard from '../Activity/LoadingCard';
import _ from 'lodash';

const EffortList = ({ efforts, leaderboardBySegmentId }) => {
  console.log('leaderboardBySegmentId: ', leaderboardBySegmentId);
  const sortedEfforts = _.orderBy(
    efforts,
    effort => {
      const leaderboard = leaderboardBySegmentId[effort.segment.id];
      return leaderboard ? leaderboard.komAnalysis.komScore : 0;
    },
    'desc',
  );

  return (
    <>
      {sortedEfforts.map(effort => {
        const leaderboard = leaderboardBySegmentId[effort.segment.id];

        if (leaderboard) {
          return <EffortCard key={effort.segment.id} effort={effort} {...leaderboard.komAnalysis} />;
        }

        return <LoadingCard key={effort.segment.id} />;
      })}
    </>
  );
};

EffortList.propTypes = {
  efforts: PropTypes.array,
  leaderboardBySegmentId: PropTypes.object,
};

EffortList.defaultProps = {
  efforts: [],
};

export default EffortList;
