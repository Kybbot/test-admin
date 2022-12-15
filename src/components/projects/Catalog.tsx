import React from 'react';
import styled from 'styled-components';

import { ProjectLight } from '@/store/reducers/projects';

import Item from './Item';

interface ModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  projects: ProjectLight[] | null;
}

const Catalog: React.FC<ModalProps> = ({ projects }) => (
  <Wrap>
    <ItemsWrap>
      {
        projects!.map((project) => (
          <Item key={project._id} project={project} />
        ))
      }
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
