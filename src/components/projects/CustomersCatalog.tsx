import React from 'react';
import styled from 'styled-components';

import CustomerItem from '@/components/projects/CustomerItem';
import { User } from '@/store/reducers/user';

interface ModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  projectId: number;
  isAdmin: boolean;
  customers: User[];
}

const CustomersCatalog: React.FC<ModalProps> = ({
  customers,
  projectId,
  isAdmin,
}) => (
  <Wrap>
    <ItemsWrap>
      {customers!.map((customer) => (
        <CustomerItem
          key={customer._id}
          customer={customer}
          projectId={projectId}
          isAdmin={isAdmin}
        />
      ))}
    </ItemsWrap>
  </Wrap>
);

const Wrap = styled.div`
`;

const ItemsWrap = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

export default CustomersCatalog;
