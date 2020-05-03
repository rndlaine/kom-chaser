import React from 'react';
import './src/styles/index.scss';

import { LeaderBoardProvider } from './src/contexts/LeaderBoardContext';
import { AthleteProvider } from './src/contexts/AthleteContext';
import { SegmentEffortProvider } from './src/contexts/SegmentEffortContext';
import { SegmentProvider } from './src/contexts/SegmentContext';

export const wrapRootElement = ({ element }) => (
  <AthleteProvider>
    <SegmentEffortProvider>
      <SegmentProvider>
        <LeaderBoardProvider>{element}</LeaderBoardProvider>
      </SegmentProvider>
    </SegmentEffortProvider>
  </AthleteProvider>
);
