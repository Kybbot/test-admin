import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import useLanguage from '@/components/common/hooks/useLanguage';
import FilterIcon from '@/components/common/icons/FilterIcon';
import SearchIcon from '@/components/common/icons/SearchIcon';
import ExtendIcon from '@/components/common/icons/ExtendIcon';
import { selectIsExtended } from '@/store/selectors/users';
import { setIsExtended } from '@/store/actions/users';
import PlusIcon from '../common/icons/catalogs/PlusIcon';
import { HandleToggle } from '../common/hooks/useToggle';

interface Props {
  openSearch: HandleToggle;
  openFilters: HandleToggle;
  setFilters: (arr: string[]) => void;
  filters: string[];
  isAdmin: boolean;
  isLoading: boolean;
  isSales: boolean;
  isFiltersActive: boolean;
  count?: number;
}

const ItemHeader: React.FC<Props> = ({
  openSearch,
  isAdmin,
  openFilters,
  isLoading,
  isFiltersActive,
  count,
  isSales,
}) => {
  const [{ common }] = useLanguage();

  const dispatch = useDispatch();
  const isExtended = useSelector(selectIsExtended);

  const handleExtend = () => {
    dispatch(setIsExtended(true));
  };

  const handleCollapse = () => {
    dispatch(setIsExtended(false));
  };

  return (
    <Header>
      <HeaderWrap>
        <HeaderText>
          {common.team}
          {!isLoading && <Count>{count}</Count>}
        </HeaderText>
        <HeaderSmallWrapper>
          {(isAdmin || isSales) && (
            <>
              <HeaderIcon onClick={isExtended ? handleCollapse : handleExtend}>
                <ExtendIcon color={isExtended ? '#3897ff' : '#333'} />
              </HeaderIcon>
              <HeaderIcon onClick={openFilters}>
                <FilterIcon color={isFiltersActive ? '#3897ff' : '#333'} />
              </HeaderIcon>
            </>
          )}
          <HeaderIcon onClick={openSearch}>
            <SearchIcon />
          </HeaderIcon>
          {isAdmin && (
            <HeaderRectangle to="/add-user">
              <HeaderPlus>
                <PlusIcon color="black" />
              </HeaderPlus>
            </HeaderRectangle>
          )}
        </HeaderSmallWrapper>
      </HeaderWrap>
    </Header>
  );
};

const Header = styled.header`
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  height: 72px;
  width: 100%;
  z-index: 110;
  max-width: 552px;
  position: fixed;
  top: 0;
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
  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const HeaderPlus = styled.div`
  width: 24px;
  height: 24px;
`;

const HeaderIcon = styled.div`
  margin-left: 5px;
  width: 48px;
  height: 48px;
  padding: 12px;
  cursor: pointer;

  &:first-child {
    margin-left: 0px
  }
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
  color: #21272e;
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
