import React from 'react';
import sumTimes from '@/utils/csv/sumTimes';
import HoursAndDollars from '@/components/csvTable/HoursAndDollars';

interface Props {
  weekMoney: number[];
  weekHours: number[][]
}

const TotalForTheWeek: React.FC<Props> = ({ weekMoney, weekHours }) => (
  <td colSpan={2}>
    <HoursAndDollars
      time={weekHours.reduce((prev, curr) => sumTimes(prev, curr), [0, 0])}
      money={weekMoney.reduce((prev, curr) => +prev + +curr, 0)}
    />
  </td>
);

export default TotalForTheWeek;
