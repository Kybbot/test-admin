import React from 'react';
import styled from 'styled-components';

import { InventoryItem } from '@/store/reducers/inventory';
import { User } from '@/store/reducers/user';
import PersonalItem from './PersonalItem';
import Item from './Item';

interface ModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  items: InventoryItem[];
  isActivePersonal: boolean;
  personalUsers: User[] | undefined;
  noInventoryUsers: User[] | undefined;
}

const Catalog: React.FC<ModalProps> = ({
  items, isActivePersonal,
  personalUsers, noInventoryUsers,
}) => (
  <Wrap>
    {isActivePersonal ? (
      <ItemsWrap>
        <PersonalItem
          users={noInventoryUsers}
          title="No Computer"
        />
        <PersonalItem
          users={personalUsers}
          title="Personal Computer"
        />
      </ItemsWrap>
    ) : (
      <ItemsWrap>
        {items?.map((item) => (
          <Item
            key={item.items[0]._id}
            item={item}
          />
        ))}
      </ItemsWrap>
    )}

  </Wrap>
);

const Wrap = styled.div`
`;

const ItemsWrap = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

export default Catalog;
