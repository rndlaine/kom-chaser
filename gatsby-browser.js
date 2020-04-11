import React from 'react';
import './src/styles/index.scss';

import { ActivityProvider } from './src/contexts/ActivityContext';
import { LeaderBoardProvider } from './src/contexts/LeaderBoardContext';
import { GearProvider } from './src/contexts/GearContext';

export const wrapRootElement = ({ element }) => (
  <ActivityProvider>
    <GearProvider>
      <LeaderBoardProvider>{element}</LeaderBoardProvider>
    </GearProvider>
  </ActivityProvider>
);
