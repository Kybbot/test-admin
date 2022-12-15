import React from 'react';
import styled from 'styled-components';

import Icon from '@/components/Icon';
import { HandleToggle } from '@/components/common/hooks/useToggle';

interface Props {
  workload: number;
  onClick: (workload: number) => void
  isAdmin?: boolean;
  openModalFuck?: HandleToggle;
}

const WorkloadPanel: React.FC<Props> = ({
  workload,
  onClick,
  isAdmin = true,
  openModalFuck,
}) => {
  const handleCLick = (num: number) => (isAdmin ? onClick(num) : () => null);

  return (
    <Wrap>
      <Workload
        key={`${workload}1`}
        selected={workload === 1}
        onClick={() => handleCLick(1)}
      >
        <Icon
          img="Workload1.png"
          width="36px"
          height="36px"
          disabled={!isAdmin && workload !== 1}
        />
      </Workload>
      <Workload
        key={`${workload}2`}
        selected={workload === 2}
        onClick={() => handleCLick(2)}
      >
        <Icon
          img="Workload2.png"
          width="36px"
          height="36px"
          disabled={!isAdmin && workload !== 2}
        />
      </Workload>
      <Workload
        key={`${workload}3`}
        selected={workload === 3}
        onClick={() => handleCLick(3)}
      >
        <Icon
          img="Workload3.png"
          width="36px"
          height="36px"
          disabled={!isAdmin && workload !== 3}
        />
      </Workload>
      <Workload
        key={`${workload}4`}
        selected={workload === 4}
        onClick={() => handleCLick(4)}
      >
        <Icon
          img="Workload4.png"
          width="36px"
          height="36px"
          disabled={!isAdmin && workload !== 4}
        />
      </Workload>
      <RedWorkload
        key={`${workload}5`}
        selected={workload === 5}
        onClick={() => (openModalFuck ? openModalFuck(true) : handleCLick(5))}
      >
        <Icon
          img="Workload5.png"
          width="36px"
          height="36px"
          disabled={!isAdmin && workload !== 5}
        />
      </RedWorkload>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 8px 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.05);
`;

const Workload = styled.div<{selected: boolean}>`
  padding: ${({ selected }) => (selected ? '11px' : '12px')};
  background-color: ${({ selected }) => (selected ? '#3897ff40' : 'white')};
  border-radius: 100%;
  background-position: center;
  cursor: pointer;
  border: ${({ selected }) => (selected ? '1px solid #3897ff' : 'none')};

  @media (max-width: 400px) {
    padding: ${({ selected }) => (selected ? '5px' : '6px')};
  }
`;

const RedWorkload = styled.div<{selected: boolean}>`
  padding: ${({ selected }) => (selected ? '11px' : '12px')};
  background-color: ${({ selected }) => (selected ? '#fec2c2' : 'white')};
  border-radius: 100%;
  background-position: center;
  cursor: pointer;
  border: ${({ selected }) => (selected ? '1px solid red' : 'none')};

  @media (max-width: 400px) {  
    padding: ${({ selected }) => (selected ? '5px' : '6px')};
  }
`;

export default WorkloadPanel;
