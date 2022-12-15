import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

import { SelectedCalendarEntity, SickLeaveWithType, VacationWithType } from '@/components/calendar/VacationsCalendar';
import AdminCalendarSelect from '@/components/vacations/VacationsCalendarSelect';
import getPhoto from '@/utils/getPhoto';
import { Teammate } from '@/store/reducers/projects';
import { useSelector } from 'react-redux';
import { selectUsers } from '@/store/selectors/users';

interface Props {
  item: VacationWithType | SickLeaveWithType;
  onClick: () => void;
  selected: SelectedCalendarEntity;
  date: moment.Moment;
  activeUsers:Teammate[];

}

const AdminCalendarItem: React.FC<Props> = ({
  item,
  onClick,
  selected,
  activeUsers,
}) => {
  const users = useSelector(selectUsers);
  const user = users?.find((u) => u._id === item.userId);

  if (user === undefined) return null;

  const changeBorder = () => {
    if (selected) {
      if (selected._id === item?._id || selected._id === item?._id) {
        return true;
      }
    }
    return false;
  };
  if (!activeUsers) {
    return (
      <Wrapper onClick={() => onClick()}>
        <AdminCalendarSelect
          type={item.type}
          clicked={changeBorder()}
          photo={getPhoto(user.smallPhoto)}
          title={user.name}
          item={item}
          activeUsers={activeUsers}
        />
      </Wrapper>
    );
  }
  if (activeUsers && activeUsers.some((activeUser) => activeUser.user.name === user!.name)) {
    return (
      <Wrapper onClick={() => onClick()}>
        <AdminCalendarSelect
          type={item.type}
          clicked={changeBorder()}
          photo={getPhoto(user.smallPhoto)}
          title={user.name}
          item={item}
          activeUsers={activeUsers}
        />
      </Wrapper>
    );
  }
  return null;
};
const Wrapper = styled.div<{onClick: () => void}>`
`;

export default AdminCalendarItem;
