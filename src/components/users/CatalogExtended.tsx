import React from 'react';
import styled from 'styled-components';

import { UserExtended } from '@/store/reducers/user';
import ItemExtended from './ItemExtended';

interface ModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  users: UserExtended[] | null;
}

const CatalogExtended: React.FC<ModalProps> = ({ users }) => {
  const employees = users?.filter((user) => user.role !== 'admin' && user.role !== 'hr');

  return (
    <Wrap>
      <ItemsWrap>
        {employees?.map((user: UserExtended) => <ItemExtended key={user.name} user={user} />)}
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

export default CatalogExtended;
