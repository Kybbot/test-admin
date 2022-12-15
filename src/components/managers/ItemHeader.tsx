import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import useLanguage from '@/components/common/hooks/useLanguage';
import SearchIcon from '@/components/common/icons/SearchIcon';
import { HandleToggle } from '../common/hooks/useToggle';
import PlusIcon from '../common/icons/catalogs/PlusIcon';

interface Props {
  openSearch: HandleToggle;
  isAdmin: boolean;
  count?: number;
}

const ItemHeader: React.FC<Props> = ({
  openSearch,
  isAdmin,
  count,
}) => {
  const [{ common }] = useLanguage();

  return (
    <Header>
      <HeaderWrap>
        <HeaderText>
          {common.managers}
          <Count>{count}</Count>
        </HeaderText>
        <HeaderSmallWrapper>
          <HeaderIcon onClick={openSearch}>
            <SearchIcon />
          </HeaderIcon>
          {
            isAdmin && (
              <HeaderRectangle to="/add-manager">
                <HeaderPlus>
                  <PlusIcon color="black" />
                </HeaderPlus>
              </HeaderRectangle>
            )
          }
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
  width: 142px;
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

const HeaderPlus = styled.div`
  width: 24px;
  height: 24px;
`;

const HeaderIcon = styled.div`
  margin-left: 8px;
  width: 48px;
  height: 48px;
  padding: 12px;
  cursor: pointer;
`;

const HeaderRectangle = styled(Link)`
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
`;

const Count = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  font-size: 12px;
  align-items: center;
  background: #d1d2d45c;
  justify-content: center;
  border-radius: 100%;
  margin-left: 10px;
  flex-shrink: 0;
`;

export default ItemHeader;
