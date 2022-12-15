import React from 'react';
import styled from 'styled-components';

import SearchIcon from '@/components/common/icons/SearchIcon';
import BackIcon from '@/components/common/icons/BackIcon';
import { HandleToggle } from '@/components/common/hooks/useToggle';
import useLanguage from '@/components/common/hooks/useLanguage';

interface Props {
  openSearch: HandleToggle;
  goBack: () => void;
}

const ItemHeader: React.FC<Props> = ({
  openSearch,
  goBack,
}) => {
  const [{ mePage }] = useLanguage();

  return (
    <Header>
      <HeaderWrap>
        <HeaderSmallWrapper>
          <IconWrap onClick={goBack}>
            <BackIcon />
          </IconWrap>
          <HeaderText>
            {mePage.team_tags}
          </HeaderText>
        </HeaderSmallWrapper>
        <HeaderSmallWrapper>
          <HeaderIcon onClick={openSearch}>
            <SearchIcon />
          </HeaderIcon>
        </HeaderSmallWrapper>
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
  justify-content: space-between;
  padding: 12px 16px;
`;

const HeaderSmallWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderText = styled.div`
  font-size: 29px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const HeaderIcon = styled.div`
  margin-left: 8px;
  width: 48px;
  height: 48px;
  padding: 12px;
  cursor: pointer;
`;

const IconWrap = styled.div`
  min-width: 24px;
  height: 24px;
  margin-right: 24px;
  cursor: pointer;
`;

export default ItemHeader;
