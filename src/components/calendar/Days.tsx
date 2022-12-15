import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Holiday } from '@/store/reducers/vacations';
import Day from '@/components/calendar/Day';
import { SelectedCalendarEntity, SickLeaveWithType, VacationWithType } from '@/components/calendar/VacationsCalendar';
import { Teammate } from '@/store/reducers/projects';

interface Props {
  startDate?: moment.Moment | null
  date: moment.Moment;
  onClick: (date: moment.Moment) => void;
  selectedDate: null | moment.Moment;
  fromDate: boolean;
  minDate?: moment.Moment | null;
  maxDate?: moment.Moment | null;
  holidays?: Holiday[] | null;
  items?: Array<VacationWithType | SickLeaveWithType>
  selected: SelectedCalendarEntity;
  activeUsers?:Teammate[];
  prevMonth?: () => void;
  nextMonth?: () => void;
}

const Days: React.FC<Props> = ({
  startDate,
  date,
  onClick,
  selectedDate,
  fromDate,
  minDate,
  maxDate,
  holidays,
  items,
  selected,
  activeUsers,
  prevMonth,
  nextMonth,
}) => {
  const thisDate = moment(date);
  const daysInMonth = moment(date).daysInMonth();
  const firstDayDate = moment(date).startOf('month');
  const previousMonth = moment(date).subtract(1, 'month');
  const previousMonthDays = previousMonth.daysInMonth();
  const nextsMonth = moment(date).add(1, 'month');
  const days: React.ReactNode[] = [];

  const labels: React.ReactNode[] = [];

  const firstDayDateCorrected = firstDayDate.day() === 0 ? 7 : firstDayDate.day();
  for (let i = 1; i <= 7; i += 1) {
    thisDate.date(i);

    labels.push(
      <WeekDay key={moment(thisDate).format('DD MM YYYY')}>
        <Text weekend={moment().day(i).day() === 0 || moment().day(i).day() === 6}>
          { moment().locale('').day(i).format('dd')
            .slice(0, 1) }
        </Text>
      </WeekDay>,
    );
  }

  for (let i = firstDayDateCorrected; i > 1; i -= 1) {
    previousMonth.date(previousMonthDays - i + 2);

    days.push(
      <Day
        key={moment(previousMonth).format('DD MM YYYY')}
        onClick={(date1: moment.Moment) => {
          onClick(date1);
          if (prevMonth) {
            prevMonth();
          }
        }}
        currentDate={date}
        date={moment(previousMonth)}
        selectedDate={selectedDate}
        fromDate={fromDate}
        startDate={startDate}
        holidays={holidays}
        items={items}
        selected={selected}
        activeUsers={activeUsers}
      />,
    );
  }

  for (let i = 1; i <= daysInMonth; i += 1) {
    thisDate.date(i);

    days.push(
      <Day
        key={moment(thisDate).format('DD MM YYYY')}
        onClick={(date2: moment.Moment) => onClick(date2)}
        currentDate={date}
        date={moment(thisDate)}
        selectedDate={selectedDate}
        fromDate={fromDate}
        minDate={minDate}
        maxDate={maxDate}
        startDate={startDate}
        holidays={holidays}
        items={items}
        selected={selected}
        activeUsers={activeUsers}
      />,
    );
  }
  const daysInMonthW = Math.ceil(days.length / 7) * 7;
  const restDays = daysInMonthW - days.length;
  for (let i = 1; i <= restDays; i += 1) {
    nextsMonth.date(i);
    days.push(
      <Day
        key={moment(nextsMonth).format('DD MM YYYY')}
        onClick={(date3: moment.Moment) => {
          onClick(date3);
          if (nextMonth) {
            nextMonth();
          }
        }}
        currentDate={date}
        date={moment(nextsMonth)}
        selectedDate={selectedDate}
        fromDate={fromDate}
        minDate={minDate}
        maxDate={maxDate}
        startDate={startDate}
        holidays={holidays}
        items={items}
        selected={selected}
        activeUsers={activeUsers}
      />,
    );
  }

  return (
    <Wrapper>
      <WeekDays>{labels.concat()}</WeekDays>
      <WrapDays>{days.concat()}</WrapDays>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  margin-top: 24px;
  margin-bottom: 12px;
`;

const Text = styled.p<{weekend: boolean}>`
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${({ weekend }) => (weekend ? '#ff464c' : '#909599')};
  width: 100%;
`;

const WeekDay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  user-select: none;
  margin: 0 auto;

  width: 16px;
  height: 16px;
`;

const WrapDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 216px
`;

export default Days;
