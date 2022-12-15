import React from 'react';
import styled from 'styled-components';
import { IVacations } from '@/utils/csv/formatVacations';
import { IContract } from '@/components/csvTable/Person';
import HoursAndDollars from '@/components/csvTable/HoursAndDollars';

const DatesFunc = (
  contract: IContract,
  day: number,
  personId: string,
  vacations: IVacations,
  ind: number,
) => {
  const element = contract.dates.find((item) => item.date === day);
  let isHoliday = false;
  let res;
  vacations.holidays.forEach((it) => {
    if (
      (new Date(it.date!).getDay() === 0
        ? 7
        : new Date(it.date!).getDay()) === day
    ) {
      isHoliday = true;
    }
  });
  let vacation;
  Object.keys(vacations).forEach((key) => {
    vacation = vacations[key].find((vac) => {
      if (vac.date) {
        return (
          vac.personId === personId
          && day
          === (new Date(vac.date).getDay() === 0
            ? 7
            : new Date(vac.date).getDay())
        );
      }
      if (vac.startDate) {
        let timestamp = vac.startDate;
        while (timestamp <= vac.endDate!) {
          if (
            vac.personId === personId
            && day
            === (new Date(timestamp).getDay() === 0
              ? 7
              : new Date(timestamp).getDay())
          ) return true;
          timestamp += 86400000;
        }
      }
      return 0;
    });
    if (vacation) {
      if (key === 'vacations' || key === 'sickLeaves') {
        if (isHoliday) {
          res = element ? (
            <Holiday key={ind}>
              <HoursAndDollars
                time={element.hours}
                money={element.money}
              />
              {key === 'vacations' ? (
                <Circle color="blue" />
              ) : (
                <Circle color="red" />
              )}
            </Holiday>
          ) : (
            <Holiday key={ind}>
              {key === 'vacations' ? (
                <Circle color="blue" />
              ) : (
                <Circle color="red" />
              )}
            </Holiday>
          );
        } else {
          res = element ? (
            <td key={ind}>
              <HoursAndDollars
                time={element.hours}
                money={element.money}
              />
              {key === 'vacations' ? (
                <Circle color="blue" />
              ) : (
                <Circle color="red" />
              )}
            </td>
          ) : (
            <td key={ind}>
              {key === 'vacations' ? (
                <Circle color="blue" />
              ) : (
                <Circle color="red" />
              )}
            </td>
          );
        }
      }
    }
    return <td key={ind} />;
  });
  if (isHoliday) {
    return element ? (
      <Holiday key={ind}>
        <HoursAndDollars time={element.hours} money={element.money} />
      </Holiday>
    ) : (
      <Holiday key={ind} />
    );
  }
  if (res) {
    return res;
  }
  return element ? (
    <td key={ind}>
      <HoursAndDollars time={element.hours} money={element.money} />
    </td>
  ) : (
    <td key={ind} />
  );
};

const Circle = styled.div<{ color: string }>`
  width: 5px;
  height: 5px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  float: right;
  margin-right: 5px;
  margin-bottom: 5px;
  position: absolute;
  right: 0;
  bottom: 0;
`;
const Holiday = styled.td`
  background: repeating-linear-gradient( -45deg, #f0f0f0, #f0f0f0 2px, #f8f8f8 2px, #f8f8f8 6px );
`;
export default DatesFunc;
