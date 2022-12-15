import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import useInput from '@/components/common/hooks/useInput';
import Item from '@/components/userVacations/Item';
import search from '@/utils/search';
import { HandleToggle } from '@/components/common/hooks/useToggle';
import { Vacation } from '@/store/reducers/vacations';
import BackIcon from '@/components/common/icons/BackIcon';
import SearchGreyIcon from '@/components/common/icons/items/SearchGreyIcon';
import useFocusInput from '../common/hooks/useFocusInput';
import PlusIcon from '../common/icons/catalogs/PlusIcon';

interface Props {
  hideSearch: HandleToggle;
  vacations: Vacation[];
}

const Search: React.FC<Props> = ({ hideSearch, vacations }) => {
  const [searchValue, setSearch] = useInput();
  const [inputRef, focusInput] = useFocusInput();

  const listWrapper = useRef<HTMLDivElement>(null);

  const getVacationRangeString = (vacation: Vacation) => {
    const startDate = moment(vacation.startDate).format('DD/MM/YYYY');
    const endDate = moment(vacation.endDate).format('DD/MM/YYYY');

    return `${startDate} - ${endDate}`;
  };

  const searchItem = search(vacations, searchValue, (vacation) => getVacationRangeString(vacation));

  useEffect(() => {
    if (listWrapper.current) {
      listWrapper.current!.addEventListener('scroll', hideKeyboardOnScroll, false);
      window.addEventListener('scroll', hideKeyboardOnScroll, false);
    }

    return () => {
      listWrapper.current!.removeEventListener('scroll', hideKeyboardOnScroll, false);
      window.removeEventListener('scroll', hideKeyboardOnScroll, false);
    };
  }, [listWrapper]);

  const hideKeyboardOnScroll = () => {
    inputRef.current!.blur();
  };

  const clearSearch = () => setSearch('');

  return (
    <SearchWrap>
      <Header>
        <HeaderWrap>
          <TopButton onClick={hideSearch}>
            <BackIcon />
          </TopButton>
          <SearchItem
            onClick={focusInput}
            type="text"
            autoFocus
            value={searchValue}
            onChange={setSearch}
            placeholder="Search"
            ref={inputRef}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            autoCapitalize="off"
          />
          <PlusButton visibility={searchValue} onClick={clearSearch}>
            <PlusIcon width="27px" height="27px" />
          </PlusButton>
        </HeaderWrap>
      </Header>
      <Empty height="72px" />
      <ItemsContainer ref={listWrapper}>
        {(!searchItem.length ? (
          searchValue.length > 0 && (
            <WrapNoResult>
              <SearchIcon>
                <SearchGreyIcon />
              </SearchIcon>
              <NoResult>No results</NoResult>
            </WrapNoResult>
          )
        ) : (
          <>
            {searchItem.map((vacation: Vacation) => (
              <Item key={vacation._id} vacation={vacation} />
            ))}
          </>
        ))}
      </ItemsContainer>
    </SearchWrap>
  );
};

const SearchWrap = styled.div`
  width: 100%;
`;

const Empty = styled.div<{height: string}>`
  height: ${({ height }) => height && height};
  width: 100%;
`;

const WrapNoResult = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 280px;
  padding-bottom: 50px;
  margin: 86px auto 0;
`;

const SearchIcon = styled.div`
  width: 32px;
  height: 32px;
`;

const NoResult = styled.div`
  font-size: 17px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.44;
  letter-spacing: normal;
  text-align: center;
  color: #909599;
  margin-top: 18px;
`;

const ItemsContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  margin: 0 auto;
  position: relative;
  padding-top: 15px;
  display: flex;
  flex-direction: column;
`;

const SearchItem = styled.input`
  width: 85%;
  padding: 0 24px;
  height: 24px;
  font-size: 16.5px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #21272e;
  border: none;
  outline: none;
  caret-color: #fb7e14;
  &::placeholder{
    color: #b4babf;
  }
`;

const TopButton = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const PlusButton = styled.div<{visibility: string}>`
  cursor: pointer;
  width: 27px;
  height: 27px;
  margin-bottom: 2px;
  transform: rotate(45deg);
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ visibility }) => (visibility.length > 0 ? 'visibile' : 'hidden')};
`;

const Header = styled.header`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  height: 72px;
  position: fixed;
  z-index: 100;
  top: 0;
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
  padding: 24px;
`;

export default Search;
