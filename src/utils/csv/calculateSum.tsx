import { Dispatch, SetStateAction } from 'react';
import { IPerson } from '@/components/csvTable/Person';
import sumTimes from '@/utils/csv/sumTimes';

const calculateSum = (
  personsNContracts: IPerson[],
  setWeekMoney: Dispatch<SetStateAction<number[]>>,
  setWeekHours: Dispatch<SetStateAction<number[][]>>,
) => {
  const daysInWeek = [1, 2, 3, 4, 5, 6, 7];
  const tempWeekHours = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];
  const tempWeekMoney = [0, 0, 0, 0, 0, 0, 0];
  personsNContracts.forEach((item) => {
    item.contracts.forEach((contract) => {
      daysInWeek.forEach((day) => {
        const element = contract.dates.find(
          (date) => date.date === day,
        );
        if (element) {
          const sumMoney = tempWeekMoney[day - 1];
          const sumHours = tempWeekHours[day - 1];
          tempWeekMoney[day - 1] = +(
            +sumMoney + Number(element.money)
          ).toFixed(2);
          tempWeekHours[day - 1] = sumTimes(sumHours, element.hours);
        }
      });
    });
  });
  setWeekMoney(tempWeekMoney);
  setWeekHours(tempWeekHours);
};

export default calculateSum;
