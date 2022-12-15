import React, { FC } from 'react';
import styled from 'styled-components';

type EmptyProps = {
  height: string;
};

const Empty: FC<EmptyProps> = ({ height }) => (
  <EmptyDiv height={height} />
);

const EmptyDiv = styled.div<{height: string}>`
  height: ${({ height }) => height && height};
  width: 100%;
`;

export default Empty;
