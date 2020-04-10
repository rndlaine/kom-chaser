import React, { useEffect, useState } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import stravaAgents from '../agents/stravaAgents';
import smoke from '../images/smoke.jpg';

const IndexPage = () => {
  const [profile, setProfile] = useState({});
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    stravaAgents.getProfile().then(profile => setProfile(profile));
    stravaAgents.listActivities().then(act => setActivities(act));
  }, []);

  console.log('activities: ', activities);

  return (
    <Layout>
      <SEO title="Home" />
      <img src={smoke} width={200} />

      <p>Mon Profil</p>
      {Object.keys(profile).map(key => (
        <p key={key}>
          {key}: {profile[key]}
        </p>
      ))}
      <br />
      <br />
      <br />
      <p>Activities</p>
      {activities.map(activity => (
        <>
          <p>{activity.name}</p>
          <p>{activity.type}</p>
          <p>{activity.start_date}</p>
          <p>{(activity.distance / 1000).toFixed(2)} km</p>
          <br />
        </>
      ))}
    </Layout>
  );
};

export default IndexPage;
