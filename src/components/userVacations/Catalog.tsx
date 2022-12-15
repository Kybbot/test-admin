import React from 'react';
import styled from 'styled-components';

import { Vacation, VacationInfo } from '@/store/reducers/vacations';
import Item from './Item';

interface ModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  vacations: Vacation[] | null;
  vacationsInfo: VacationInfo;
}

const Catalog: React.FC<ModalProps> = ({ vacations }) => {
  if (!vacations?.length) {
    return null;
  }

  return (
    <Wrap>
      <ItemsWrap>
        {vacations?.map((vacation: Vacation) => <Item key={vacation._id} vacation={vacation} />)}
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
