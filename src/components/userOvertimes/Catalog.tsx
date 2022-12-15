import React from 'react';
import styled from 'styled-components';

import { Overtime } from '@/store/reducers/vacations';
import useLanguage from '@/components/common/hooks/useLanguage';
import Item from './Item';

interface ModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  overtimes: Overtime[] | null;
}

const Catalog: React.FC<ModalProps> = ({ overtimes }) => {
  const [{ common }] = useLanguage();

  if (!overtimes?.length) {
    return null;
  }

  return (
    <Wrap>
      <TopWrap>
        <CountItems>
          {`${common.overtimes}
      (${overtimes!.length})`}
        </CountItems>
      </TopWrap>
      <ItemsWrap>
        {overtimes?.map((overtime: Overtime) => <Item key={overtime._id} overtime={overtime} />)}
      </ItemsWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 16px 0;
`;

const ItemsWrap = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  align-items: center;
`;

const CountItems = styled.div`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1.3px;
  color: #909599;
  white-space: nowrap;
  padding: 10px 0;
`;

export default Catalog;
