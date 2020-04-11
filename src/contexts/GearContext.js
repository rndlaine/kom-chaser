import React from 'react';
import _ from 'lodash';
import { setWithExpiry, getWithExpiry } from '../helpers/localStorageHelpers';

const defaultState = {
  gearById: {},
  setGear: () => {},
};

const GearContext = React.createContext(defaultState);

class GearProvider extends React.Component {
  state = {
    gearsById: {},
    storeHydrated: false,
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const gearsById = getWithExpiry('gearsById');
      if (gearsById) {
        this.setState({ gearsById });
      }
    }

    this.setState({ storeHydrated: true });
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.gearsById !== this.state.gearsById) {
      setWithExpiry('gearsById', this.state.gearsById, 1000 * 60 * 60 * 24 * 7);
    }
  }

  setGear = gear => {
    this.setState({ ...this.state, gearsById: { ...this.state.gearsById, [gear.id]: gear } });
  };

  render() {
    const { children } = this.props;
    const { gearsById, storeHydrated } = this.state;
    const { setGear } = this;

    return <GearContext.Provider value={{ storeHydrated, gearsById, setGear }}>{children}</GearContext.Provider>;
  }
}

export default GearContext;

export { GearProvider };
