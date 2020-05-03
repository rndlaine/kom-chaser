import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import Layout from '../components/layout';
import SEO from '../components/seo';
import backendAgents from '../agents/backendAgents';
import AthleteContext from '../contexts/AthleteContext';
import refresh from '../images/icons/refresh.svg';

const SyncPage = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const { athlete } = useContext(AthleteContext);

  const handleSync = callback => {
    if (athlete.id) {
      setIsSyncing(true);
      callback(athlete.id).finally(() => setIsSyncing(false));
    }
  };

  return (
    <Layout>
      <SEO title="Sync" />

      <div className="jumbotron">
        <p>Because of Strava's API design, we are limited in the number of calls we can do. For this reason, you can sync you activities in KOM Chaser's backend.</p>
        <p>
          Sometimes, it can take a couple of tries to complete the sync and it may fail if you do too much call in a 15 mins timeframe but once the initial sync is done, things
          should go A-1.
        </p>
        <br />
        <p>Peace!</p>
      </div>

      <button className={classNames('button', isSyncing && '--disabled')} disabled={isSyncing} onClick={() => handleSync(backendAgents.syncActivities)}>
        Sync Activities
        <img alt="" className={classNames('button__icon', isSyncing && '--spin')} src={refresh} />
      </button>
      <button className={classNames('button', isSyncing && '--disabled')} disabled={isSyncing} onClick={() => handleSync(backendAgents.syncEfforts)}>
        Sync Efforts
        <img alt="" className={classNames('button__icon', isSyncing && '--spin')} src={refresh} />
      </button>
      <button className={classNames('button', isSyncing && '--disabled')} disabled={isSyncing} onClick={() => handleSync(backendAgents.syncLeaderboard)}>
        Sync Leaderboard
        <img alt="" className={classNames('button__icon', isSyncing && '--spin')} src={refresh} />
      </button>
    </Layout>
  );
};

export default SyncPage;
