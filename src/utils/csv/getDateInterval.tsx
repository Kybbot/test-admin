import axios from 'axios';

const getDateInterval = async (startDay: Date, endDay: Date) => {
  const lowerThatNull = (num: number) => (num < 10 ? `0${num}` : num);
  const min = `${lowerThatNull(startDay.getDate())}/${lowerThatNull(
    startDay.getMonth() + 1,
  )}/${startDay.getFullYear()}`;
  const max = `${lowerThatNull(endDay.getDate())}/${lowerThatNull(
    endDay.getMonth() + 1,
  )}/${endDay.getFullYear()}`;
  const response = await axios
    .post(
      'https://api.lambda.direct/search/off-days',
      {
        from: min,
        to: max,
      },
      {
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    )
    .catch(() => console.log('error!'));
  return response?.data ? response.data : null;
};

export default getDateInterval;
