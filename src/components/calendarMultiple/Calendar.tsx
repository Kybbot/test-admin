import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Days from '@/components/calendarMultiple/Days';
import ArrowCalendar from '@/components/common/icons/dashboard/ArrowCalendar';
import { Holiday } from '@/store/reducers/vacations';

interface Props {
  startDate: moment.Moment | null;
  setStartDate: (value: moment.Moment | null) => void;
  endDate: moment.Moment | null;
  setEndDate: (value: moment.Moment | null) => void;
  fromDate: boolean;
  minDate?: moment.Moment | null;
  maxDate?: moment.Moment | null;
  holidays?: Holiday[];
}

const Calendar: React.FC<Props> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  fromDate,
  minDate,
  maxDate,
  holidays,
}) => {
  const [date, setDate] = useState<moment.Moment>(moment());

  const [rerender, setRerender] = useState(false);

  const resetDate = () => {
    setStartDate(moment());
    setEndDate(moment());
  };

  const changeMonth = (value: number) => {
    setDate(date.month(value));
    setRerender(!rerender);
  };

  const changeDate = (select: moment.Moment) => {
    let start = startDate;
    let end = endDate;

    if (start === null) {
      start = moment(select);
    } else if (
      (select.isBefore(start, 'day')
        || select.isAfter(start, 'day'))
      && (select.isBefore(end, 'day')
        || select.isSame(end, 'day'))
    ) {
      start = moment(select);
    }

    if (end === null) {
      end = moment(select);
    } else if (
      (select.isBefore(end, 'day')
        || select.isAfter(end, 'day'))
      && (select.isAfter(start, 'day')
        || select.isSame(start, 'day'))
    ) {
      end = moment(select);
    }

    setEndDate(end);
    setStartDate(start);
  };

  return (
    <MyCalendar>
      <Heading>
        <IconLeftArrow onClick={() => changeMonth(date.month() - 1)}>
          <ArrowCalendar />
        </IconLeftArrow>
        <Text onClick={resetDate}>{date.format('MMMM YYYY')}</Text>
        <IconRightArrow onClick={() => changeMonth(date.month() + 1)}>
          <ArrowCalendar />
        </IconRightArrow>
      </Heading>

      <Days
        startDate={startDate}
        onClick={(data: moment.Moment) => changeDate(data)}
        date={date}
        endDate={endDate}
        fromDate={fromDate}
        minDate={minDate}
        maxDate={maxDate}
        holidays={holidays}
      />
    </MyCalendar>
  );
};

const MyCalendar = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 100%;
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  height: 24px;
  user-select: none;
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: normal;
  text-align: center;
  color: rgba(0, 0, 0, 0.87);
  user-select: none;
`;

const IconLeftArrow = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconRightArrow = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  transform: rotate(180deg);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Calendar;
