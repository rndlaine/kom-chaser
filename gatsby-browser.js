import React from 'react';
import './src/styles/index.scss';

import { ActivityProvider } from './src/contexts/ActivityContext';
import { LeaderBoardProvider } from './src/contexts/LeaderBoardContext';
import { GearProvider } from './src/contexts/GearContext';
import { AthleteProvider } from './src/contexts/AthleteContext';
import { SegmentEffortProvider } from './src/contexts/SegmentEffortContext';
import { SegmentProvider } from './src/contexts/SegmentContext';

export const wrapRootElement = ({ element }) => (
  <ActivityProvider>
    <AthleteProvider>
      <GearProvider>
        <SegmentEffortProvider>
          <SegmentProvider>
            <LeaderBoardProvider>{element}</LeaderBoardProvider>
          </SegmentProvider>
        </SegmentEffortProvider>
      </GearProvider>
    </AthleteProvider>
  </ActivityProvider>
);
