import React from 'react';
import _ from 'lodash';
import { setWithExpiry, getWithExpiry, getWithItemExpiry, setWithItemExpiry } from '../helpers/localStorageHelpers';

const defaultState = {
  activitiesById: {},
  setActivities: () => {},
  activitiesDetailsById: {},
  setActivityDetails: () => {},
};

const ActivityContext = React.createContext(defaultState);

class ActivityProvider extends React.Component {
  state = {
    activitiesById: {},
    activitiesDetailsById: {},
    storeHydrated: false,
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const activitiesDetailsById = getWithItemExpiry('activitiesDetailsById');
      if (activitiesDetailsById) {
        this.setState({ activitiesDetailsById });
      }

      const activitiesById = getWithExpiry('activitiesById');
      if (activitiesById) {
        this.setState({ activitiesById });
      }
    }

    this.setState({ storeHydrated: true });
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.activitiesDetailsById !== this.state.activitiesDetailsById) {
      setWithItemExpiry('activitiesDetailsById', this.state.activitiesDetailsById, 1000 * 60 * 60 * 24 * 30);
    }

    if (prevState.activitiesById !== this.state.activitiesById) {
      setWithExpiry('activitiesById', this.state.activitiesById, 1000 * 60 * 60 * 2);
    }
  }

  setActivities = activities => {
    const activitiesById = _.keyBy(activities, 'id');
    this.setState({ activitiesById });
  };

  setActivityDetails = activity => {
    this.setState({ ...this.state, activitiesDetailsById: { ...this.state.activitiesDetailsById, [activity.id]: activity } });
  };

  render() {
    const { children } = this.props;
    const { activitiesById, activitiesDetailsById, storeHydrated } = this.state;
    const { setActivities, setActivityDetails } = this;

    return <ActivityContext.Provider value={{ storeHydrated, activitiesById, activitiesDetailsById, setActivities, setActivityDetails }}>{children}</ActivityContext.Provider>;
  }
}

export default ActivityContext;

export { ActivityProvider };
