import React from 'react';

import { ActivityProvider } from './src/contexts/ActivityContext';
import { LeaderBoardProvider } from './src/contexts/LeaderBoardContext';

export const wrapRootElement = ({ element }) => (
  <ActivityProvider>
    <LeaderBoardProvider>{element}</LeaderBoardProvider>
  </ActivityProvider>
);
