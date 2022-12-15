import React from 'react';
import styled from 'styled-components';

interface Props {
  color?: string;
}

const IconClose: React.FC<Props> = ({ color = ' #21272e' }) => <Icon color={color} />;

const Icon = styled.div<{ color: string}>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 2px;
  grid-area: left;
  cursor: pointer;

  :before,
  :after {
    position: absolute;
    content: '';
    height: 20px;
    width: 2px;
    background:${({ color }) => color}
  }

  :before {
    transform: rotate(45deg);
  }

  :after {
    transform: rotate(-45deg);
  }
`;

export default IconClose;
