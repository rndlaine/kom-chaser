import React from 'react';
import { setWithExpiry, getWithExpiry } from '../helpers/localStorageHelpers';

const defaultState = {
  segmentEffortById: {},
  setSegmentEffort: () => {},
};

const SegmentEffortContext = React.createContext(defaultState);

class SegmentEffortProvider extends React.Component {
  state = {
    segmentEffortsBySegmentId: {},
    storeHydrated: false,
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const segmentEffortsBySegmentId = getWithExpiry('segmentEffortsBySegmentId');
      if (segmentEffortsBySegmentId) {
        this.setState({ segmentEffortsBySegmentId });
      }
    }

    this.setState({ storeHydrated: true });
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.segmentEffortsBySegmentId !== this.state.segmentEffortsBySegmentId) {
      setWithExpiry('segmentEffortsBySegmentId', this.state.segmentEffortsBySegmentId, 1000 * 60 * 60 * 2);
    }
  }

  setSegmentEffortsBySegmentId = (segmentId, segmentEfforts) => {
    this.setState({ segmentEffortsBySegmentId: { ...this.state.segmentEffortsBySegmentId, [segmentId]: segmentEfforts } });
  };

  render() {
    const { children } = this.props;
    const { segmentEffortsBySegmentId, storeHydrated } = this.state;
    const { setSegmentEffortsBySegmentId } = this;

    return <SegmentEffortContext.Provider value={{ storeHydrated, segmentEffortsBySegmentId, setSegmentEffortsBySegmentId }}>{children}</SegmentEffortContext.Provider>;
  }
}

export default SegmentEffortContext;

export { SegmentEffortProvider };
