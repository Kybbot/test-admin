import React from 'react';
import styled from 'styled-components';

import Item from '@/components/projects/UserItem';
import { Teammate } from '@/store/reducers/projects';

interface ModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  projectId: number;
  isAdmin: boolean;
  team: Teammate[];
}

const UsersCatalog: React.FC<ModalProps> = ({
  team,
  projectId,
  isAdmin,
}) => (
  <Wrap>
    <ItemsWrap>
      {team!.map((teammate) => (
        <Item
          key={teammate.user._id}
          teammate={teammate}
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
  cursor: pointer;
  display: flex;
  flex-direction: column-reverse;
`;

export default UsersCatalog;
