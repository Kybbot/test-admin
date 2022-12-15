import React from 'react';
import styled from 'styled-components';
import { IVacations } from '@/utils/csv/formatVacations';
import VacationBlock from '@/components/csvTable/VacationBlock';

interface Props {
  vacations: IVacations;
}

const Header: React.FC<Props> = ({ vacations }) => {
  const daysInWeek = [1, 2, 3, 4, 5, 6, 7];
  const arrOfDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const checkHolidays = () => daysInWeek.map((day, index) => {
    let holiday = false;
    let holidayName = '';
    vacations.holidays.forEach((it) => {
      if (
        (new Date(it.date!).getDay() === 0
          ? 7
          : new Date(it.date!).getDay()) === day
      ) {
        holiday = true;
        holidayName = it.name!;
      }
    });
    return holiday ? (
      <VacationBlock vacation={holidayName} key={holidayName}>
        {arrOfDays[index]}
      </VacationBlock>
    ) : (
      <HeaderCol key={arrOfDays[index]}>{arrOfDays[index]}</HeaderCol>
    );
  });
  return (
    <HeaderRow>
      <th>Person</th>
      <th>Contract</th>
      {checkHolidays()}
      <th colSpan={2}>Total</th>
    </HeaderRow>
  );
};

const HeaderRow = styled.tr`
    th {
        padding: 10px 0;
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
        font-size: 12px;
        line-height: 14px;
        background: #f2f2f2;
        align-items: center;
    }
`;

const HeaderCol = styled.th`
    width: 72px;
`;

export default Header;
