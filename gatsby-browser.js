import React from 'react';
import './src/styles/index.scss';

import { ActivityProvider } from './src/contexts/ActivityContext';
import { LeaderBoardProvider } from './src/contexts/LeaderBoardContext';
import { GearProvider } from './src/contexts/GearContext';
import { AthleteProvider } from './src/contexts/AthleteContext';

export const wrapRootElement = ({ element }) => (
  <ActivityProvider>
    <AthleteProvider>
      <GearProvider>
        <LeaderBoardProvider>{element}</LeaderBoardProvider>
      </GearProvider>
    </AthleteProvider>
  </ActivityProvider>
);
