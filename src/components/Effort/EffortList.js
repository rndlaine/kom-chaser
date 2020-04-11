import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EffortCard from './EffortCard';
import LoadingCard from '../Activity/LoadingCard';
import EmptyCard from '../Activity/LoadingCard';
import _ from 'lodash';
import Select from 'react-select';

const options = [
  { value: '', label: 'Date' },
  { value: 'komScore', label: 'KOM Reachability Score' },
  { value: 'average_watts', label: 'Average Power' },
  { value: 'distance', label: 'Distance' },
  { value: 'elapsed_time', label: 'Elapsed Time' },
  { value: 'total_elevation_gain', label: 'Elevation' },
];

const EffortList = ({ isLoading, activity, efforts, leaderboardBySegmentId }) => {
  const [sortBy, setSortBy] = useState();
  const sortedEfforts = _.orderBy(
    efforts,
    effort => {
      if (sortBy === 'komScore') {
        const leaderboard = leaderboardBySegmentId[effort.segment.id];
        return leaderboard ? leaderboard.komAnalysis[sortBy] : 0;
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
              const leaderboard = leaderboardBySegmentId[effort.segment.id];

              if (leaderboard) {
                return <EffortCard key={effort.segment.id} effort={effort} {...leaderboard.komAnalysis} />;
              }

              return <LoadingCard key={effort.segment.id} />;
            })}
          </>
        )}
        {isLoading && _.times(50, index => <LoadingCard key={index} />)}
        {!isLoading && _.isEmpty(activity.segment_efforts) && <EmptyCard text="Nothing to show..." />}
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
