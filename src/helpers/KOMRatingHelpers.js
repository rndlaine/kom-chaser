import moment from 'moment';

export const getFormattedDate = seconds =>
  moment('2015-01-01')
    .startOf('day')
    .seconds(seconds)
    .format('H:mm:ss');
