import React from 'react';
import styled from 'styled-components';

import { HandleToggle } from '@/components/common/hooks/useToggle';

import BackIcon from '@/components/common/icons/BackIcon';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import FilterIcon from '@/components/common/icons/FilterIcon';

interface Props {
  headerName: string
  goBack?: () => void;
  openAdd?: HandleToggle;
  toggleFilter: HandleToggle;
  isFilterActive: boolean;
}

const ItemHeader: React.FC<Props> = ({
  headerName,
  goBack,
  openAdd,
  toggleFilter,
  isFilterActive,
}) => (
  <Header>
    <HeaderWrap>
      <HeaderSmallWrapper>
        {
          Boolean(goBack) && (
            <TopButton onClick={goBack}>
              <BackIcon />
            </TopButton>
          )
        }
        <HeaderText>{headerName}</HeaderText>
      </HeaderSmallWrapper>
      <HeaderSmallWrapper>
        <HeaderIcon onClick={toggleFilter}>
          <FilterIcon color={isFilterActive ? '#3897ff' : '#333'} />
        </HeaderIcon>
        {
          Boolean(openAdd) && (
            <HeaderRectangle onClick={openAdd}>
              <HeaderPlus>
                <PlusIcon />
              </HeaderPlus>
            </HeaderRectangle>
          )
        }
      </HeaderSmallWrapper>
    </HeaderWrap>
  </Header>
);

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

const HeaderPlus = styled.div`
  width: 24px;
  height: 24px;
`;

const HeaderRectangle = styled.div`
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: solid 1px #dae1e8;
  background-color: #f0f1f2;
  margin-left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color:#21272e;
  flex-shrink: 0;
`;

const TopButton = styled.div`
  color: black;
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 25px;
`;

const HeaderIcon = styled.div`
  width: 40px;
  height: 40px;
  padding: 8px;
  cursor: pointer;
  margin-left: 8px;
`;

export default ItemHeader;
