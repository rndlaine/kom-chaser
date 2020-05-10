import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EffortCard from '../Effort/EffortCard';
import LoadingCard from '../Activity/LoadingCard';
import EmptyCard from '../Activity/EmptyCard';
import _ from 'lodash';
import Select from 'react-select';

const initialOptions = [
  { value: '', label: 'Date' },
  { value: 'komScore', label: 'KOM Reachability Score' },
  { value: 'average_watts', label: 'Average Power' },
  { value: 'distance', label: 'Distance' },
  { value: 'elapsed_time', label: 'Elapsed Time' },
  { value: 'total_elevation_gain', label: 'Elevation' },
];

const SegmentEffortList = ({ title, options = [], subtitle, isLoading, efforts, noClick }) => {
  const [sortBy, setSortBy] = useState();
  const sortedEfforts = _.orderBy(efforts, effort => _.get(effort, sortBy), 'desc');

  const finalOptions = [...options, ...initialOptions];

  return (
    <>
      <section className="activity-list__header">
        <div className="activity-list__title">
          <span className="label__header">{title || `Segments Efforts: ${_.get(efforts, '[0].name', 'Activity')}`}</span>
          {subtitle && <span className="label__subheader">{subtitle}</span>}
        </div>

        <div className="activity-list__filter">
          <h1 className="label__subheader">Sort by</h1>
          <Select className="activity-list__select" options={finalOptions} onChange={select => setSortBy(select.value)} />
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
