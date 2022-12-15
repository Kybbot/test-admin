import React from 'react';
import styled from 'styled-components';

import SellSmarterIcon from '@/components/common/icons/auth/SaleSmarter';

interface HeaderProps {
}

const Header: React.FC < HeaderProps > = () => (
  <HeaderStyled>
    <SellSmarterIcon />
  </HeaderStyled>
);

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  min-height: 106px;
  justify-content: space-between;
  padding: 32px 24px 26px 12px;
`;

export default Header;
