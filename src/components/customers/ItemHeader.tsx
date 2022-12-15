import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import useLanguage from '@/components/common/hooks/useLanguage';
import SearchIcon from '@/components/common/icons/SearchIcon';
import { HandleToggle } from '../common/hooks/useToggle';
import PlusIcon from '../common/icons/catalogs/PlusIcon';

interface Props {
  openSearch: HandleToggle;
}

const ItemHeader: React.FC<Props> = ({ openSearch }) => {
  const [{ mePage }] = useLanguage();

  return (
    <Header>
      <HeaderWrap>
        <HeaderText>{mePage.customers}</HeaderText>
        <HeaderSmallWrapper>
          <HeaderIcon onClick={openSearch}>
            <SearchIcon />
          </HeaderIcon>
          <HeaderRectangle to="/add-customer">
            <HeaderPlus>
              <PlusIcon color="black" />
            </HeaderPlus>
          </HeaderRectangle>
        </HeaderSmallWrapper>
      </HeaderWrap>
    </Header>
  );
};

const Header = styled.header`
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  height: 72px;
  z-index: 110;
  width: 100%;
  top: 0;
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

const HeaderIcon = styled.div`
  width: 24px;
  height: 24px;
  margin: 2px 5px 0 10px;
  cursor: pointer;
`;

const HeaderRectangle = styled(Link)`
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: solid 1px #dae1e8;
  background-color: #f0f1f2;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color:#21272e;
`;

export default ItemHeader;
