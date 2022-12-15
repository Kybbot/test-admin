import moment, { Moment } from 'moment';

const getMomentSting = (date: Moment) => moment(date).format('YYYY-MM-DD');

export default getMomentSting;
