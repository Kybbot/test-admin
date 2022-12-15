import React from 'react';
import styled from 'styled-components';

interface Props {
  fixed?: boolean;
}

const BtnWrapper: React.FC<Props> = ({ children, fixed = true }) => (
  <BtnWrapperStyled fixed={fixed}>{children}</BtnWrapperStyled>
);

const BtnWrapperStyled = styled.div<{ fixed: boolean }>`
  position: ${({ fixed }) => (fixed ? 'fixed' : 'initial')};
  bottom: 24px;
  max-width: 552px;
  margin-top: ${({ fixed }) => !fixed && '50px'};
  width: ${({ fixed }) => fixed && 'calc(100% - 48px)'};
  left: ${({ fixed }) => fixed && '50%'};
  transform: ${({ fixed }) => fixed && 'translateX(-50%)'};
  transition: margin-top 200 ease;
`;

export default BtnWrapper;
