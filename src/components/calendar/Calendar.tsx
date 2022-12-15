import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Days from '@/components/calendar/Days';
import ArrowCalendar from '@/components/common/icons/dashboard/ArrowCalendar';
import { Holiday } from '@/store/reducers/vacations';

interface Props {
  tempDate: moment.Moment | null;
  setTempDate: (value: moment.Moment | null) => void;
  fromDate: boolean;
  minDate?: moment.Moment | null;
  maxDate?: moment.Moment | null;
  startDate?: moment.Moment | null
  holidays?: Holiday[] | null;
}

const Calendar: React.FC<Props> = ({
  tempDate,
  setTempDate,
  fromDate,
  minDate,
  maxDate,
  startDate,
  holidays,
}) => {
  const CURRENT_DATE = tempDate ? moment(new Date(tempDate.toDate())) : null;

  const [date, setDate] = useState<moment.Moment>(CURRENT_DATE || moment());

  const [rerender, setRerender] = useState(false);

  const resetDate = () => setDate(moment());

  const changeMonth = (value: number) => {
    setDate(date.month(value));
    setRerender(!rerender);
  };

  const changeYear = (value: number) => {
    setDate(date.year(value));
    setRerender(!rerender);
  };

  const changeDate = (select: moment.Moment) => {
    let tempSelectedDate = tempDate;

    if (tempDate === null) {
      tempSelectedDate = moment(select);
    } else if (select.isBefore(tempDate, 'day') || select.isAfter(tempDate, 'day')) {
      tempSelectedDate = moment(select);
    }

    setTempDate(tempSelectedDate);
  };

  useEffect(() => {
    if (tempDate) {
      changeMonth(tempDate.month());
      changeYear(tempDate.year());
    }
  }, [tempDate]);

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
        selectedDate={tempDate}
        fromDate={fromDate}
        minDate={minDate}
        maxDate={maxDate}
        holidays={holidays}
        selected={null}
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
