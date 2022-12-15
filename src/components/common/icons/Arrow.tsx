import React from 'react';
import styled from 'styled-components';

interface Props {
  color?: string;
}

const Arrow: React.FC<Props> = ({ color = '#b6babe' }) => (
  <ArrowWrap>
    <ArrowLine color={color} />
    <ArrowLineReverse color={color} />
  </ArrowWrap>
);

const ArrowWrap = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

const ArrowLine = styled.div<{ color: string }>`
    width: 100%;
    height: 2px;
    position: absolute;
    transform: rotate(43deg);
    background-color: ${({ color }) => color};
    top: 0;
`;

const ArrowLineReverse = styled.div<{ color: string }>`
    width: 100%;
    height: 2px;
    position: absolute;
    transform: rotate(-40deg);
    background-color: ${({ color }) => color};
    bottom: 0;
`;

export default Arrow;
