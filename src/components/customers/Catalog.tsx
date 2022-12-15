import React from 'react';
import styled from 'styled-components';

import { Customer } from '@/store/reducers/customers';
import Item from './Item';

interface ModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  customers: Customer[] | null;
}

const Catalog: React.FC<ModalProps> = ({ customers }) => (
  <Wrap>
    <ItemsWrap>
      {customers?.map((customer) => <Item key={customer._id} customer={customer} />)}
    </ItemsWrap>
  </Wrap>
);

const Wrap = styled.div`
`;

const ItemsWrap = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

export default Catalog;
