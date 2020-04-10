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
  };

  setActivities = activities => {
    const activitiesById = _.keyBy(activities, 'id');
    this.setState({ activitiesById });
  };

  setActivityDetails = activity => {
    this.setState({ ...this.state, activitiesDetailsById: { ...this.state.activitiesDetailsById, [activity.id]: activity } });
  };

  render() {
    const { children } = this.props;
    const { activitiesById, activitiesDetailsById } = this.state;
    const { setActivities, setActivityDetails } = this;

    return <ActivityContext.Provider value={{ activitiesById, activitiesDetailsById, setActivities, setActivityDetails }}>{children}</ActivityContext.Provider>;
  }
}

export default ActivityContext;

export { ActivityProvider };
