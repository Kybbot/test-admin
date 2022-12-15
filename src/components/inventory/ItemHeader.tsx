import React from 'react';
import styled from 'styled-components';

import SearchIcon from '@/components/common/icons/SearchIcon';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import BackIcon from '@/components/common/icons/BackIcon';
import { HandleToggle } from '@/components/common/hooks/useToggle';
import useLanguage from '@/components/common/hooks/useLanguage';
import ComputerIcon from '../common/icons/ComputerIcon';

interface Props {
  openSearch: HandleToggle;
  openAdd: HandleToggle;
  goBack: () => void;
  count?: number;
  openPersonal?: HandleToggle;
  isPersonalActive?: boolean;
}

const ItemHeader: React.FC<Props> = ({
  openSearch,
  goBack,
  openAdd,
  count,
  openPersonal,
  isPersonalActive,
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
            {mePage.inventory}
            <Count>{count}</Count>
          </HeaderText>
        </HeaderSmallWrapper>
        <HeaderSmallWrapper>
          {Boolean(!isPersonalActive) && (
          <HeaderIcon onClick={openSearch}>
            <SearchIcon />
          </HeaderIcon>
          )}
          {Boolean(openPersonal) && (
            <HeaderRectangle onClick={openPersonal} isActive={isPersonalActive}>
              <HeaderPlus>
                { isPersonalActive ? <ComputerIcon color="rgb(56, 151, 255)" /> : <ComputerIcon color="black" />}
              </HeaderPlus>
            </HeaderRectangle>
          )}
          <HeaderRectangle onClick={openAdd}>
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
  padding: 12px;
`;

const HeaderSmallWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderText = styled.div`
  font-size: 26px;
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
`;

const HeaderRectangle = styled.div<{isActive?: boolean}>`
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: ${({ isActive }) => (isActive ? '#3897ff40' : '#f0f1f2')};
  border: ${({ isActive }) => (isActive ? '1px solid #3897ff' : 'solid 1px #dae1e8')};
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color:#21272e;
`;

const IconWrap = styled.div`
  min-width: 24px;
  height: 24px;
  margin-right: 5px;
  cursor: pointer;
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
  margin-left: 5px;
  flex-shrink: 0;
`;

export default ItemHeader;
