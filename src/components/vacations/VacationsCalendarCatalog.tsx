import React from 'react';
import styled from 'styled-components';

import { SelectedCalendarEntity, SickLeaveWithType, VacationWithType } from '@/components/calendar/VacationsCalendar';
import AdminCalendarItem from '@/components/vacations/VacationsCalendarItem';
import moment from 'moment';
import { Teammate } from '@/store/reducers/projects';

interface ModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  items: Array<VacationWithType | SickLeaveWithType>
  handleSelectVacation: (item : VacationWithType | SickLeaveWithType) => void;
  selected: SelectedCalendarEntity;
  date: moment.Moment
  activeUsers:Teammate[]
}

const AdminCalendarCatalog: React.FC<ModalProps> = ({
  items,
  handleSelectVacation,
  selected,
  date,
  activeUsers,
}) => (
  <Wrap>
    {!!items.length && (
    <ItemsWrap>
      {items.map((item) => (
        <AdminCalendarItem
          onClick={() => handleSelectVacation(item)}
          key={item._id}
          item={item}
          selected={selected}
          date={date}
          activeUsers={activeUsers}
        />
      ))}
    </ItemsWrap>
    )}
  </Wrap>
);

const Wrap = styled.div`
  padding: 10px 0 0 0;
`;

const ItemsWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 10px;
  row-gap: 10px;

  @media screen and (max-width: 540px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default AdminCalendarCatalog;
