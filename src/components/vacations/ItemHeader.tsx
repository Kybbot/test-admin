import React from 'react';
import styled from 'styled-components';

import useLanguage from '@/components/common/hooks/useLanguage';
import BackIcon from '@/components/common/icons/BackIcon';

interface Props {
  goBack: () => void;
}

const ItemHeader: React.FC<Props> = ({ goBack }) => {
  const [{ mePage }] = useLanguage();

  return (
    <Header>
      <HeaderWrap>
        <IconWrap onClick={goBack}>
          <BackIcon />
        </IconWrap>
        <HeaderText>{mePage.vacations}</HeaderText>
      </HeaderWrap>
    </Header>
  );
};

const Header = styled.header`
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  height: 72px;
  position: relative;
  z-index: 110;
  width: 100%;
  max-width: 552px;
`;

const HeaderWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 72px;
  display: flex;
  align-items: center;
  padding: 12px 16px;
`;

const HeaderText = styled.div`
  width: 142px;
  padding-bottom: 2px;
  font-size: 29px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const IconWrap = styled.div`
  min-width: 24px;
  height: 24px;
  margin-right: 24px;
  cursor: pointer;
`;

export default ItemHeader;
