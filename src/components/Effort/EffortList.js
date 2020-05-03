import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EffortCard from './EffortCard';
import LoadingCard from '../Activity/LoadingCard';
import EmptyCard from '../Activity/EmptyCard';
import _ from 'lodash';
import Select from 'react-select';
import { getKOMRating } from '../../helpers/KOMRatingHelpers';

const options = [
  { value: '', label: 'Date' },
  { value: 'komScore', label: 'KOM Reachability Score' },
  { value: 'average_watts', label: 'Average Power' },
  { value: 'distance', label: 'Distance' },
  { value: 'elapsed_time', label: 'Elapsed Time' },
  { value: 'total_elevation_gain', label: 'Elevation' },
];

const EffortList = ({ isLoading, activity, efforts, segment, leaderboardBySegmentId }) => {
  const [sortBy, setSortBy] = useState();
  const sortedEfforts = _.orderBy(
    efforts,
    effort => {
      if (sortBy === 'komScore') {
        const leaderboard = leaderboardBySegmentId[effort.segmentid];
        const komAnalysis = getKOMRating(effort, leaderboard);
        return leaderboard ? komAnalysis[sortBy] : 0;
      } else {
        return effort[sortBy];
      }
    },
    'desc',
  );

  return (
    <>
      <section className="activity-list__header">
        <h1 className="label__header">{activity.name || 'Activity'} - Segments</h1>
        <div className="activity-list__filter">
          <h1 className="label__subheader">Sort by</h1>
          <Select className="activity-list__select" options={options} onChange={select => setSortBy(select.value)} />
        </div>
      </section>

      <section className="activity-list">
        {!isLoading && (
          <>
            {sortedEfforts.map(effort => {
              const leaderboard = leaderboardBySegmentId[effort.segmentid];

              if (leaderboard) {
                const komAnalysis = getKOMRating(effort, leaderboard);
                return <EffortCard key={`${effort.id}-${effort.segmentid}`} effort={effort} {...komAnalysis} />;
              }

              return <LoadingCard key={`${effort.id}-${effort.segmentid}`} />;
            })}
          </>
        )}
        {isLoading && _.times(50, index => <LoadingCard key={index} />)}
        {!isLoading && _.isEmpty(efforts) && <EmptyCard text="Nothing to show..." />}
      </section>
    </>
  );
};

EffortList.propTypes = {
  efforts: PropTypes.array,
  leaderboardBySegmentId: PropTypes.object,
  activity: PropTypes.object,
  isLoading: PropTypes.bool,
};

EffortList.defaultProps = {
  efforts: [],
};

export default EffortList;
