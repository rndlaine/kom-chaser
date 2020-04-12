import React from 'react';
import { getWithItemExpiry, setWithItemExpiry } from '../helpers/localStorageHelpers';

const defaultState = {
  segmentsById: {},
  setSegment: () => {},
};

const SegmentContext = React.createContext(defaultState);

class SegmentProvider extends React.Component {
  state = {
    segmentsById: {},
    storeHydrated: false,
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const segmentsById = getWithItemExpiry('segmentsById');
      if (segmentsById) {
        this.setState({ segmentsById });
      }
    }

    this.setState({ storeHydrated: true });
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.segmentsById !== this.state.segmentsById) {
      setWithItemExpiry('segmentsById', this.state.segmentsById, 1000 * 60 * 60 * 24 * 30);
    }
  }

  setSegment = segment => {
    this.setState({ ...this.state, segmentsById: { ...this.state.segmentsById, [segment.id]: segment } });
  };

  render() {
    const { children } = this.props;
    const { segmentsById, storeHydrated } = this.state;
    const { setSegment } = this;

    return <SegmentContext.Provider value={{ storeHydrated, segmentsById, setSegment }}>{children}</SegmentContext.Provider>;
  }
}

export default SegmentContext;

export { SegmentProvider };
