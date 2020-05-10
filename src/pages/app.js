import _ from 'lodash';
import React, { useEffect, useState, useContext } from 'react';
import { usePosition } from 'use-position';

import Layout from '../components/layout';
import SEO from '../components/seo';
import windAgents from '../agents/windAgents';
import backendAgents from '../agents/backendAgents';
import { getCardinal } from '../helpers/cardinalHelpers';
import SegmentEffortList from '../components/Segment/SegmentEffortList';
import AthleteContext from '../contexts/AthleteContext';
import { getWindFactor } from '../helpers/scoreHelpers';

const IndexPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [coords, setCoords] = useState({});
  const [city, setCity] = useState('Quebec');
  const [wind, setWind] = useState();
  const [segmentEffortsBySegmentId, setSegmentEffortsBySegmentId] = useState([]);

  const { latitude: posLat, longitude: posLon } = usePosition();
  const { athlete } = useContext(AthleteContext);

  useEffect(() => {
    if (city) {
      setIsLoading(true);
      windAgents.getCoordinates(city).then(coordinates => setCoords(coordinates));
    }
  }, [city]);

  useEffect(() => {
    const lat = coords.lat || posLat;
    const lon = coords.lon || posLon;

    if (lat && lon) {
      windAgents.getCurrentWind(lat, lon).then(data => {
        setWind(data);

        backendAgents.getClosestSegmentEffortsByUser(athlete.id, lat, lon).then(async efforts => {
          const promises = efforts.map(effort => backendAgents.getSegment(effort.segmentid));
          const result = await Promise.all(promises);

          const updatedEfforts = efforts.map(effort => {
            const seg = result.find(item => item.id === effort.segmentid);
            const updatedEffort = { ...effort, direction: seg.direction };
            return { ...updatedEffort, start_date: null, windFactor: getWindFactor(updatedEffort, data) };
          });

          setSegmentEffortsBySegmentId(_.keyBy(updatedEfforts, 'segmentid'));
          setIsLoading(false);
        });
      });
    }
  }, [coords, posLat, posLon]);

  const segmentEfforts = _.values(segmentEffortsBySegmentId);

  return (
    <Layout>
      <SEO title="App" />

      <SegmentEffortList
        noClick={false}
        title="Today's Forecast"
        subtitle={wind ? `Wind Direction: ${getCardinal(wind.deg)} - Wind Speed: ${wind.speed.toFixed(1)} km/h` : ''}
        isLoading={isLoading}
        options={[{ value: 'windFactor.factor', label: 'Wind Factor' }]}
        efforts={segmentEfforts}
      />
    </Layout>
  );
};

export default IndexPage;
