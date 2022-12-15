import React from 'react';
import styled from 'styled-components';

import { HandleToggle } from './common/hooks/useToggle';

interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClick: HandleToggle;
  isActive: boolean;
  classTrackingOn?: string;
  classTrackingOff?: string;
}

const Switch: React.FC<ToggleProps> = ({
  onClick,
  isActive = false,
  classTrackingOn = '',
  classTrackingOff = '',
}) => (
  <Commutator
    className={isActive ? classTrackingOn : classTrackingOff}
    isActive={isActive}
    onClick={onClick}
  >
    <Track />
    <Knob />
  </Commutator>
);

const Knob = styled.div`
  width: 20px;
  height: 20px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.24), 0 0 1px 0 rgba(0, 0, 0, 0.12);
  border-style: solid;
  border-width: 0.5px;
  border-image-source: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.12),
    rgba(255, 255, 255, 0.06) 20%,
    rgba(255, 255, 255, 0)
  );
  border-image-slice: 1;
  border-radius: 50%;
  position: absolute;
  transition: 0.3s;
`;

const Track = styled.div`
  width: 34px;
  height: 14px;
  border-radius: 10px;
  position: absolute;
  top: 3px;
  left: 2px;
`;

const Commutator = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  width: 40px;
  height: 24px;
  position: relative;

  ${Knob} {
    left: ${({ isActive }) => (isActive ? '20px' : '0px')};
    background-color: ${({ isActive }) => (isActive ? '#3897ff' : '#f1f1f1')};
  }

  ${Track} {
    opacity: ${({ isActive }) => (isActive ? '0.5' : '1')};
    background-color: ${({ isActive }) => (isActive ? '#3897ff' : 'rgba(34, 31, 31, 0.26)')};
  }
`;

export default Switch;
