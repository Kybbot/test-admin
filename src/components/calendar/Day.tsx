import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { selectDate, selectDateCalendar } from '@/store/selectors/date';
import useToggle from '@/components/common/hooks/useToggle';
import { Holiday } from '@/store/reducers/vacations';
import { SelectedCalendarEntity, SickLeaveWithType, VacationWithType } from '@/components/calendar/VacationsCalendar';
import { clearDateCalendar, DateCalendar } from '@/store/actions/date';
import { Teammate } from '@/store/reducers/projects';

interface Props {
  startDate?: moment.Moment | null;
  date: moment.Moment;
  onClick: (date: moment.Moment) => void;
  selectedDate: null | moment.Moment;
  currentDate: moment.Moment;
  fromDate: boolean;
  minDate?: moment.Moment | null;
  maxDate?: moment.Moment | null;
  holidays?: Holiday[] | null;
  items?: Array<VacationWithType | SickLeaveWithType>
  selected?: SelectedCalendarEntity;
  activeUsers?:Teammate[];
}

const Day: React.FC<Props> = ({
  currentDate,
  date,
  onClick,
  selectedDate,
  fromDate,
  minDate,
  maxDate,
  startDate,
  holidays,
  items,
  selected,
  activeUsers,
}) => {
  const dateState = useSelector(selectDate);
  const [isDisabled, setIsDisabled] = useToggle();
  const dispatch = useDispatch();
  const selectedDay = useSelector(selectDateCalendar);

  const disableDays = () => {
    const isMin = minDate && minDate.unix() > date.unix();
    const isMax = maxDate && maxDate.unix() < date.unix();
    if (isMin || isMax) {
      setIsDisabled(true);
      return;
    }

    if (fromDate) {
      if (dateState.dateTill) {
        setIsDisabled(dateState.dateTill < date.unix());
      }
    } else if (dateState.dateFrom) {
      setIsDisabled(dateState.dateFrom > date.unix());
    }
  };

  const getIsOnRange = () => {
    if (startDate && selectedDate) {
      return (
        startDate.valueOf() <= date.valueOf()
        && date.valueOf() <= selectedDate.valueOf()
      );
    }

    return false;
  };
  const getIsHoliday = () => {
    if (holidays && !getIsSelectedVacation()) {
      return Boolean(
        holidays.find(({ date: timestamp }) => moment(timestamp).isSame(date, 'day')),
      );
    }
    return false;
  };

  const getIsVacation = () => {
    let isHighlighted = false;
    if (activeUsers) {
      items?.forEach((item) => {
        if (moment(date, 'day').isBetween(moment(item.startDate), moment(item.endDate), 'day', '[]')
         && activeUsers.some((activeUser) => activeUser.user._id === item.userId)) {
          isHighlighted = true;
        }
      });
    } else {
      items?.forEach((item) => {
        if ('sickLeaves' in item) {
          item.sickLeaves.forEach((sickLeave) => {
            if (moment(date).isSame(moment(sickLeave.date), 'day')) {
              isHighlighted = true;
            }
          });
        }
        if ('vacations' in item) {
          item.vacations.forEach((vacation) => {
            if (moment(date).isBetween(moment(vacation.startDate), moment(vacation.endDate), 'day', '[]')) {
              isHighlighted = true;
            }
          });
        }
      });
    }
    return isHighlighted;
  };

  const day = date.day();
  const getIsSelectedVacation = () => {
    if (!selected) return false;
    if (selected.type === 'sick-leave' && selected.sickLeaves) {
      return selected.sickLeaves.some(({ date: sickLeaveDate }) => moment(sickLeaveDate).isSame(date, 'day') && day !== 6 && day !== 0);
    }
    if (selected.type === 'vacation' && selected.vacations) {
      return selected.vacations.some(({ startDate: start, endDate }) => date.isBetween(moment(start), moment(endDate), 'day', '[]') && day !== 6 && day !== 0);
    }
    return date.isBetween(moment(selected.startDate), moment(selected.endDate), 'day', '[]');
  };
  const getIsWeekend = () => Boolean(date.day() === 6 || date.day() === 0);

  const isSelectedWeekend = (getIsOnRange() && date.day() === 0)
    || (getIsOnRange() && date.day() === 6)
    || (date.isSame(selectedDate, 'day') && date.day() === 0)
    || (date.isSame(selectedDate, 'day') && date.day() === 6);

  const handleClick = () => {
    if (!isDisabled) onClick(date);
    if (moment(selectedDay).isSame(moment(date))) {
      dispatch(clearDateCalendar());
    } else {
      dispatch(DateCalendar(date));
    }
  };
  useEffect(() => {
    disableDays();
  });
  return (
    <StyledDay
      onClick={handleClick}
      // disabled={!date.isSame(currentDate, 'month')}
    >
      <Text
        colorGrey={isDisabled}
        active={moment().isSame(date, 'day')}
        muted={!date.isSame(currentDate, 'month')}
        selected={
          (selectedDay !== null && date.isSame(selectedDay, 'day'))
          || getIsOnRange()
        }
        // inActive={!!selectedDay}
        selectedWeekend={isSelectedWeekend}
        holiday={getIsHoliday()}
        vacation={getIsVacation()}
        weekend={getIsWeekend()}
        isSelectedVacation={getIsSelectedVacation()}
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
  vacation: boolean;
  weekend: boolean;
  selectedWeekend: boolean;
  isSelectedVacation?: boolean;
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
      display: block;
      opacity: 0.2;
      color: rgba(0,0,0,0.87) !important;
      border: 0 !important;
      background-color: white !important;
    `};

  ${({ selected }) => selected
    && css`
      height: 34px;
      width: 34px;
      color: #fff !important;
      border: 1px solid #0067d9 !important;
      background-color: #3897ff !important;
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
      background-color: #fda161;
      border-radius: 50%;
      position: absolute;
      top: 2px;
      left: calc(50% - 17px);

      display: flex;
      align-items: center;
      justify-content: center;
    `};

  ${({ vacation }) => vacation
    && css`
      height: 33px;
      width: 33px;
      background-color: #fcfcfc;
      border: solid 1px rgba(33,39,46,0.12);
      border-radius: 50%;
      position: absolute;
      top: 4px;
      left: calc(50% - 17px);

      display: flex;
      align-items: center;
      justify-content: center;
    `};

    ${({ vacation, active }) => active
    && vacation
    && css`
      color: #3897ff;
      background-color: #fcfcfc;
      border-radius: 50%;
    `};

    ${({ weekend }) => weekend
    && css`
      color: #909599;
    `};

    ${({ vacation, weekend }) => weekend
    && vacation
    && css`
      color: #909599;
      background-color: #fcfcfc;
      border-radius: 50%;
    `};

  ${({ isSelectedVacation }) => isSelectedVacation
    && css`
      color: #fff;
      height: 33px;
      width: 33px;
      border: 1px solid #0067d9;
      background-color: #3897ff;
    `};

  ${({ holiday }) => holiday
    && css`
      color: #fff;
      height: 33px;
      width: 33px;
      background-color: #ff464c;
      border: 1px solid #e30007;
      border-radius: 50%;
      position: absolute;
      top: 4px;
      left: calc(50% - 17px);

      display: flex;
      align-items: center;
      justify-content: center;
    `};
`;

export default Day;
