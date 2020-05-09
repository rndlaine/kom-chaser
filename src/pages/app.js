import React, { useEffect, useState } from 'react';
import { usePosition } from 'use-position';

import Layout from '../components/layout';
import SEO from '../components/seo';
import windAgents from '../agents/windAgents';

const IndexPage = () => {
  const [coords, setCoords] = useState({});
  const [city, setCity] = useState('Quebec');
  const [wind, setWind] = useState();
  const { latitude: posLat, longitude: posLon } = usePosition();

  useEffect(() => {
    if (city) {
      windAgents.getCoordinates(city).then(coordinates => setCoords(coordinates));
    }
  }, [city]);

  useEffect(() => {
    const lat = coords.lat || posLat;
    const lon = coords.lon || posLon;

    if (lat && lon) {
      windAgents.getCurrentWind(52.939915, -73.549133).then(data => setWind(data));
    }
  }, [coords, posLat, posLon]);

  return (
    <Layout>
      <SEO title="App" />
      {wind && (
        <>
          <p>Wind speed: {wind.speed}</p>
          <p>Wind deg: {wind.deg}</p>
        </>
      )}
    </Layout>
  );
};

export default IndexPage;
