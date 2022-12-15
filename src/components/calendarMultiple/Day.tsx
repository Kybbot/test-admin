import React from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import { Holiday } from '@/store/reducers/vacations';

interface Props {
  startDate: moment.Moment | null,
  endDate: null | moment.Moment;
  date: moment.Moment;
  onClick: (date: moment.Moment) => void;
  currentDate: moment.Moment;
  fromDate: boolean;
  minDate?: moment.Moment | null;
  maxDate?: moment.Moment | null;
  holidays?: Holiday[];
}

const Day: React.FC<Props> = ({
  currentDate,
  date,
  onClick,
  endDate,
  startDate,
  holidays,
}) => {
  const getIsOnRange = () => {
    if (startDate && endDate) {
      return startDate.valueOf() <= date.valueOf() && date.valueOf() <= endDate.valueOf();
    }

    return false;
  };

  const getIsHoliday = () => {
    if (holidays) {
      return Boolean(holidays.find(({ date: timestamp }) => moment(timestamp).isSame(date, 'day')));
    }

    return false;
  };

  const isSelectedWeekend = ((getIsOnRange() && date.day() === 0)
    || (getIsOnRange() && date.day() === 6)
    || (date.isSame(endDate, 'day') && date.day() === 0)
    || (date.isSame(endDate, 'day') && date.day() === 6));

  const handleClick = () => {
    onClick(date);
  };

  return (
    <StyledDay onClick={handleClick} disabled={!date.isSame(currentDate, 'month')}>
      <Text
        colorGrey={false}
        active={moment().isSame(date, 'day')}
        muted={!date.isSame(currentDate, 'month')}
        selected={(endDate !== null && date.isSame(endDate, 'day')) || getIsOnRange()}
        selectedWeekend={isSelectedWeekend}
        holiday={getIsHoliday()}
      >
        {date.date()}
      </Text>
    </StyledDay>
  );
};

const StyledDay = styled.button`
  display: inline-block;
  text-align: center;
  cursor: pointer;
  padding: 11px 0;
  line-height: 34px;
  position: relative;
  font-size: 16px;
  outline: none;
  user-select: none;
  height: 36px;

  background: transparent;
  border: none;

  &:disabled {
    cursor: default;
    opacity: 0;
  }
`;

const Text = styled.p<{
  active: boolean;
  muted: boolean;
  selected: boolean;
  colorGrey: boolean;
  holiday: boolean;
  selectedWeekend: boolean;
}>`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${({ colorGrey }) => (colorGrey ? '#909599' : 'rgba(0, 0, 0, 0.87)')};
  width: 100%;
  outline: none;
  user-select: none;

  ${({ active }) => active
    && css`
      color: #3897ff;
    `};

  ${({ muted }) => muted
    && css`
      display: none;
    `};

  ${({ selected }) => selected
    && css`
      color: #fff;
      height: 34px;
      width: 34px;
      background-color: #fb7e14;
      border-radius: 50%;
      position: absolute;
      top: 2px;
      left: calc(50% - 17px);

      display: flex;
      align-items: center;
      justify-content: center;
    `};
    
  ${({ selectedWeekend }) => selectedWeekend
    && css`
      color: #fff;
      height: 34px;
      width: 34px;
      background-color: #ff464ba8;
      border-radius: 50%;
      position: absolute;
      top: 2px;
      left: calc(50% - 17px);

      display: flex;
      align-items: center;
      justify-content: center;
    `};
    
  ${({ holiday }) => holiday
    && css`
      color: #fff;
      height: 34px;
      width: 34px;
      background-color: #ff464c;
      border-radius: 50%;
      position: absolute;
      top: 2px;
      left: calc(50% - 17px);

      display: flex;
      align-items: center;
      justify-content: center;
    `};

  ${({ holiday, selected }) => holiday && selected
    && css`
      color: #fff;
      height: 34px;
      width: 34px;
      background-color: #ff464c;
      border-radius: 50%;
      position: absolute;
      top: 2px;
      left: calc(50% - 17px);
      border: 4px solid #fb7e14;

      display: flex;
      align-items: center;
      justify-content: center;
    `};
`;

export default Day;
