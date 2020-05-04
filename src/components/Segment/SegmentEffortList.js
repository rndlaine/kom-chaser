import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EffortCard from '../Effort/EffortCard';
import LoadingCard from '../Activity/LoadingCard';
import EmptyCard from '../Activity/EmptyCard';
import _ from 'lodash';
import Select from 'react-select';
import stravaLogo from '../../images/strava-logo.png';

const options = [
  { value: '', label: 'Date' },
  { value: 'komScore', label: 'KOM Reachability Score' },
  { value: 'average_watts', label: 'Average Power' },
  { value: 'distance', label: 'Distance' },
  { value: 'elapsed_time', label: 'Elapsed Time' },
  { value: 'total_elevation_gain', label: 'Elevation' },
];

const SegmentEffortList = ({ title, isLoading, efforts, noClick }) => {
  const [sortBy, setSortBy] = useState();
  const sortedEfforts = _.orderBy(efforts, effort => effort[sortBy], 'desc');

  return (
    <>
      <section className="activity-list__header">
        <a className="label__header" href={`https://www.strava.com/segments/${_.get(efforts, '[0].segmentid')}?filter=overall`} rel="noopener noreferrer" target="_blank">
          {title || `Segments Efforts: ${_.get(efforts, '[0].name', 'Activity')}`}
        </a>
        <div className="activity-list__filter">
          <h1 className="label__subheader">Sort by</h1>
          <Select className="activity-list__select" options={options} onChange={select => setSortBy(select.value)} />
        </div>
      </section>

      <section className="activity-list">
        {!isLoading && sortedEfforts.map(effort => <EffortCard noClick={noClick} key={`${effort.id}-${effort.segmentid}`} effort={effort} />)}
        {isLoading && _.times(50, index => <LoadingCard key={index} />)}
        {!isLoading && _.isEmpty(efforts) && <EmptyCard text="Nothing to show..." />}
      </section>
    </>
  );
};

SegmentEffortList.propTypes = {
  efforts: PropTypes.array,
  activity: PropTypes.object,
  isLoading: PropTypes.bool,
  noClick: PropTypes.bool,
};

SegmentEffortList.defaultProps = {
  efforts: [],
  noClick: true,
};

export default SegmentEffortList;
