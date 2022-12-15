import React from 'react';
import styled from 'styled-components';

interface Props {
  color?: string;
}

const Plus:React.FC<Props> = ({ color = 'black' }) => (
  <Wrap>
    <Line color={color} />
    <ReverseLine color={color} />
  </Wrap>
);

const Wrap = styled.div`
    position: relative;
    width:100%;
    height:100%;
`;

const Line = styled.div`
    width: 100%;
    height: 2px;
    position: absolute;
    background-color: ${({ color }) => color};
    top: calc(100% / 2);
`;

const ReverseLine = styled.div`
    width: 2px;
    height: 100%;
    position: absolute;
    top: 1px;
    left: calc((100% - 2px) / 2);
    background-color: ${({ color }) => color};
`;

export default Plus;
