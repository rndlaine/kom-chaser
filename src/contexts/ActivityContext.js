import React from 'react';
import _ from 'lodash';

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
      const activitiesDetailsById = localStorage.getItem('activitiesDetailsById');

      if (activitiesDetailsById) {
        this.setState({ activitiesDetailsById: JSON.parse(activitiesDetailsById) });
      }
    }

    this.setState({ storeHydrated: true });
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.activitiesDetailsById !== this.state.activitiesDetailsById) {
      localStorage.setItem('activitiesDetailsById', JSON.stringify(this.state.activitiesDetailsById));
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
