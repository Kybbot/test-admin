import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { HandleToggle } from '@/components/common/hooks/useToggle';

import ArchiveIcon from '@/components/common/icons/ArchiveIcon';
import BackIcon from '@/components/common/icons/BackIcon';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import SearchIcon from '@/components/common/icons/SearchIcon';
import UnsortedIcon from '@/components/common/icons/UnsortedIcon';
import SortedIcon from '@/components/common/icons/SortedIcon';

interface Props {
  headerName: string
  goBack?: () => void;
  openSearch: HandleToggle;
  isAdmin: boolean;
  isSortActive?: boolean;
  toggleSort?: HandleToggle;
}

const ItemHeader: React.FC<Props> = ({
  headerName,
  goBack,
  openSearch,
  isAdmin,
  isSortActive,
  toggleSort,
}) => (
  <Header>
    <HeaderWrap>
      {
        Boolean(goBack) && (
          <TopButton onClick={goBack}>
            <BackIcon />
          </TopButton>
        )
      }
      <HeaderText>{headerName}</HeaderText>
      <HeaderSmallWrapper>
        <HeaderIcon onClick={openSearch}>
          <SearchIcon />
        </HeaderIcon>
        {isSortActive !== undefined && (
          <HeaderRectangleIcon isActive={isSortActive} onClick={toggleSort}>
            <HeaderPlus>
              { isSortActive ? <SortedIcon color="rgb(56, 151, 255)" /> : <UnsortedIcon />}
            </HeaderPlus>
          </HeaderRectangleIcon>
        )}
        {
          !goBack && (
            <HeaderRectangleLink to="/projects-archive">
              <HeaderPlus>
                <ArchiveIcon />
              </HeaderPlus>
            </HeaderRectangleLink>
          )
        }
        {
          !goBack && isAdmin && (
            <HeaderRectangleLink to="/add-project">
              <HeaderPlus>
                <PlusIcon />
              </HeaderPlus>
            </HeaderRectangleLink>
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
  
  padding: 12px 16px;
`;

const HeaderSmallWrapper = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const HeaderText = styled.div`
  width: 60%;
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

const HeaderRectangleLink = styled(Link)`
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

const HeaderRectangleIcon = styled.div<{isActive: boolean}>`
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: ${({ isActive }) => (isActive ? '#3897ff40' : '#f0f1f2')};
  border: ${({ isActive }) => (isActive ? '1px solid #3897ff' : 'solid 1px #dae1e8')};
  margin-left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #21272e;
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
  margin-left: 8px;
  width: 48px;
  height: 48px;
  padding: 12px;
  cursor: pointer;
`;

export default ItemHeader;
