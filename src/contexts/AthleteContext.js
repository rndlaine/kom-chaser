import React from 'react';
import _ from 'lodash';
import { setWithExpiry, getWithExpiry } from '../helpers/localStorageHelpers';

const defaultState = {
  athlete: {},
  setAthlete: () => {},
};

const AthleteContext = React.createContext(defaultState);

class AthleteProvider extends React.Component {
  state = {
    athlete: {},
    storeHydrated: false,
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const athlete = getWithExpiry('athlete');
      if (athlete) {
        this.setState({ athlete });
      }
    }

    this.setState({ storeHydrated: true });
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.athlete !== this.state.athlete) {
      setWithExpiry('athlete', this.state.athlete, 1000 * 60 * 60 * 24 * 7);
    }
  }

  setAthlete = athlete => this.setState({ athlete });

  render() {
    const { children } = this.props;
    const { athlete, storeHydrated } = this.state;
    const { setAthlete } = this;

    return <AthleteContext.Provider value={{ storeHydrated, athlete, setAthlete }}>{children}</AthleteContext.Provider>;
  }
}

export default AthleteContext;

export { AthleteProvider };
