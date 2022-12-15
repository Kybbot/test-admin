import React from 'react';
import styled from 'styled-components';

import { User } from '@/store/reducers/user';
import Item from '@/components/users/Item';

interface ModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  users: User[] | null;
}

const Catalog: React.FC<ModalProps> = ({ users }) => {
  const employees = users?.filter((user) => user.role !== 'admin');

  return (
    <Wrap>
      <ItemsWrap>
        {employees?.map((user: User) => <Item key={user.name} user={user} />)}
      </ItemsWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
`;

const ItemsWrap = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

export default Catalog;
