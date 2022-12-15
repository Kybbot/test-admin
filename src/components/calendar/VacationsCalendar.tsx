import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Days from '@/components/calendar/Days';
import ArrowCalendar from '@/components/common/icons/dashboard/ArrowCalendar';
import { Holiday } from '@/store/reducers/vacations';

import AdminCalendarCatalog from '@/components/vacations/VacationsCalendarCatalog';
import { CombinedSickLeaves } from '@/store/reducers/sick-leaves';
import { CombinedCalendarVacations, CombinedVacations } from '@/store/actions/vacations';
import { useDispatch, useSelector } from 'react-redux';
import { selectDateCalendar } from '@/store/selectors/date';
import { clearDateCalendar } from '@/store/actions/date';
import { Teammate } from '@/store/reducers/projects';
import { selectUsers } from '@/store/selectors/users';
import useLanguage from '@/components/common/hooks/useLanguage';
import { User } from '@/store/reducers/user';

interface Props {
  tempDate: moment.Moment | null;
  setTempDate: (value: moment.Moment | null) => void;
  fromDate: boolean;
  minDate?: moment.Moment | null;
  maxDate?: moment.Moment | null;
  startDate?: moment.Moment | null
  holidays: Holiday[] | null;
  vacations: CombinedVacations[] | CombinedCalendarVacations[] | null;
  sickLeaves: CombinedSickLeaves[] | null;
  activeUsers: Teammate[],
  isMePage?: boolean
}

interface VacationsDays {
  vacations: number,
  sickLeaves: number,
  holidaysCounter: number
}

export interface VacationWithType extends CombinedVacations {
  type: 'vacation',
}

export interface SickLeaveWithType extends CombinedSickLeaves {
  type: 'sick-leave',
}

export type SelectedCalendarEntity = VacationWithType | SickLeaveWithType | null;

const VacationsCalendar: React.FC<Props> = ({
  tempDate,
  setTempDate,
  fromDate,
  minDate,
  maxDate,
  startDate,
  holidays,
  vacations = [],
  sickLeaves,
  activeUsers,
  isMePage,
}) => {
  const CURRENT_DATE = tempDate || moment();

  const [date, setDate] = useState<moment.Moment>(CURRENT_DATE);
  const users = useSelector(selectUsers);
  const [{ mePage }] = useLanguage();

  const [rerender, setRerender] = useState(false);
  const [selected, setSelected] = useState<SelectedCalendarEntity>(null);
  const [vacationDays, setVacationDays] = useState<VacationsDays>();
  const [employees, setEmployees] = useState<User[] | null>();

  const selectedDay = useSelector(selectDateCalendar);
  const dispatch = useDispatch();
  const sickLeavesT = sickLeaves?.map((sickLeave) => (
    { ...sickLeave, type: 'sick-leave' }) as SickLeaveWithType);

  const vacationsT = vacations?.map((vacation: CombinedVacations | CombinedCalendarVacations) => (
    { ...vacation, type: 'vacation' }) as unknown as VacationWithType);
  const itemsOnCalendar: Array<VacationWithType | SickLeaveWithType> = [
    ...(vacationsT || []),
    ...(sickLeavesT || []),
  ].filter((item) => (
    moment(item?.endDate).isSame(date, 'month')
    || moment(item?.startDate).isSame(date, 'month')
  )).sort(({ startDate: a }, { startDate: b }) => moment(a).valueOf() - moment(b).valueOf());

  useEffect(() => {
    if (tempDate) {
      changeMonth(tempDate.month());
      changeYear(tempDate.year());
    }
  }, [tempDate]);

  useEffect(() => {
    if (selectedDay) setSelected(null);
  }, [selectedDay]);

  useEffect(() => {
    if (selected) dispatch(clearDateCalendar());
  }, [selected]);

  const resetDate = () => setDate(moment());

  const selectVacation = (item: VacationWithType | SickLeaveWithType) => {
    if (item._id !== selected?._id) {
      setSelected(item);
    } else if (item._id === selected._id) {
      setSelected(null);
    }
  };

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

  const prevMonthAndClearVacation = () => {
    changeMonth(date.month() - 1);
    if (selected?.type === 'sick-leave'
      || (selected?.type === 'vacation' && moment(selected?.startDate).format('MM') !== moment(date).format('MM'))
    ) {
      setSelected(null);
    }
    dispatch(clearDateCalendar());
  };

  const nextMonthAndClearVacation = () => {
    changeMonth(date.month() + 1);
    if (selected?.type === 'sick-leave'
      || (selected?.type === 'vacation' && moment(selected?.endDate).format('MM') !== moment(date).format('MM'))
    ) {
      setSelected(null);
    }
    dispatch(clearDateCalendar());
  };

  useEffect(() => {
    setEmployees(users?.filter((user) => user.role !== 'admin' && user.role !== 'hr' && user.role !== 'sales'));
  }, [users]);

  useEffect(() => {
    if (isMePage) {
      const vacationsStats = {
        vacations: 0,
        sickLeaves: 0,
        holidaysCounter: 0,
      };
      itemsOnCalendar.forEach((vac) => {
        if (vac.type === 'vacation') {
          vac.vacations.forEach((vacation) => { vacationsStats.vacations += vacation.usedDays; });
        }
        if (vac.type === 'sick-leave') {
          vac.sickLeaves.forEach(() => { vacationsStats.sickLeaves += 1; });
        }
      });
      if (employees) {
        holidays?.forEach((holiday) => {
          const day = moment(holiday.date);
          if (day.month() === date.month() && day.year() === date.year()) {
            vacationsStats.holidaysCounter += employees.length;
          }
        });
      }
      setVacationDays(vacationsStats);
    }
  }, [rerender, employees]);

  return (
    <MyCalendar>
      <Heading>
        <IconLeftArrow onClick={() => prevMonthAndClearVacation()}>
          <ArrowCalendar />
        </IconLeftArrow>
        <Text onClick={resetDate}>{date.format('MMMM YYYY')}</Text>
        <IconRightArrow onClick={() => nextMonthAndClearVacation()}>
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
        items={itemsOnCalendar}
        selected={selected}
        activeUsers={activeUsers}
        prevMonth={prevMonthAndClearVacation}
        nextMonth={nextMonthAndClearVacation}
      />
      <Line />
      <Container>
        {vacationDays && (
          <SmallCalendarText>
            <CalendarIcon>
              <img src="../../assets/emoji/sun.svg" alt="sun" />
              {vacationDays.vacations}
              <TooltipText>{mePage.vacations}</TooltipText>
            </CalendarIcon>
            <CalendarIcon>
              <img src="../../assets/emoji/coffee.svg" alt="coffee" />
              {vacationDays.sickLeaves}
              <TooltipText>{mePage.sick_leaves}</TooltipText>
            </CalendarIcon>
            <CalendarIcon>
              <img src="../../assets/emoji/calendar.svg" alt="calendar" />
              {vacationDays.holidaysCounter}
              <TooltipText>{mePage.holidays}</TooltipText>
            </CalendarIcon>
          </SmallCalendarText>
        )}
        {!itemsOnCalendar
          ? <Empty />
          : (
            <ItemsContainer>
              {users && (
              <AdminCalendarCatalog
                handleSelectVacation={selectVacation}
                items={itemsOnCalendar!}
                selected={selected}
                date={date}
                activeUsers={activeUsers}
              />
              )}
            </ItemsContainer>
          )}
      </Container>
    </MyCalendar>
  );
};

const Line = styled.div`
  width: calc(100%);
  height: 1px;
  background-color: #ebeced;
  margin-left: 0;
  margin-top: 20px;
`;

const Empty = styled.div`
`;

const Container = styled.div`
  height: auto;
  position: relative;
  background-color: white;
`;

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

const ItemsContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  margin: 0 auto;
  position: relative;
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

const SmallCalendarText = styled.div`
  margin-top: 10px;
  width: fit-content;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 11px;
  div {
    display: flex;
    margin-right: 10px;
    align-items: center;
  }
  img {
    height: 16px;
  }
`;

const CalendarIcon = styled.div`
    position: relative;
    padding: 0 10px;
    height: 32px;
    width: fit-content;
    border: solid 1px rgba(33,39,46,0.12);
    border-radius: 6px;
    img {
      margin-right: 5px;
    }
    &:hover span {
      visibility: visible;
      opacity: 1;
    }
`;

const TooltipText = styled.span`
  visibility: hidden;
  width: 82px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -41px;
  opacity: 0;
  transition: opacity 0.3s;
  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
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

export default VacationsCalendar;
