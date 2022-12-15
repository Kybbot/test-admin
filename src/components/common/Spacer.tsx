import React from 'react';
import styled from 'styled-components';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  height: string;
}

export const Spacer: React.FC<Props> = ({ height }) => (
  <Block height={height} />
);

const Block = styled.div<{height?: string}>`
  height: ${({ height }) => height || '72px'};
  width: 100%;
`;

export default Spacer;
