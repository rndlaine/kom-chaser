import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import Layout from '../components/layout';
import SEO from '../components/seo';
import backendAgents from '../agents/backendAgents';
import AthleteContext from '../contexts/AthleteContext';
import refresh from '../images/icons/refresh.svg';
import Loader from '../components/Loader/Loader';

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
        <p>
          Because of Strava's API design, we are limited in the number of calls we can do in a timeframe. In order to use KOM Chaser, you have sync your activities in our system.
        </p>
        <br />
        <p>It will take a couple of minutes to complete the sync, especially if you have a lot of activities.</p>
        <br />
        <p>Peace!</p>
      </div>

      <div className="sync__buttons">
        <button className={classNames('button --full-width', isSyncing && '--disabled')} disabled={isSyncing} onClick={() => handleSync(backendAgents.syncActivities)}>
          Sync Activities
          <img alt="" className={classNames('button__icon', isSyncing && '--spin')} src={refresh} />
        </button>
        <button className={classNames('button --full-width', isSyncing && '--disabled')} disabled={isSyncing} onClick={() => handleSync(backendAgents.syncEfforts)}>
          Sync Efforts
          <img alt="" className={classNames('button__icon', isSyncing && '--spin')} src={refresh} />
        </button>
        <button className={classNames('button --full-width', isSyncing && '--disabled')} disabled={isSyncing} onClick={() => handleSync(backendAgents.syncLeaderboard)}>
          Sync Leaderboard
          <img alt="" className={classNames('button__icon', isSyncing && '--spin')} src={refresh} />
        </button>
      </div>

      {isSyncing && (
        <>
          <div className="loader__center">
            <Loader />
          </div>
          <div className="loader__center">
            <span>Syncing your data!</span>
          </div>
        </>
      )}
    </Layout>
  );
};

export default SyncPage;
