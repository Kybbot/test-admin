import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectIsLoading,
  selectIsSearchActive,
  selectSearchItems,
} from '@/store/selectors/search';
import {
  cleanSearch as clear,
  searchTeam,
} from '@/store/actions/search';

import { HandleToggle } from '@/components/common/hooks/useToggle';
import { SearchItem } from '@/store/reducers/search';

import SearchGreyIcon from '@/components/common/icons/items/SearchGreyIcon';
import useFocusInput from '@/components/common/hooks/useFocusInput';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import BackIcon from '@/components/common/icons/BackIcon';
import useLanguage from '@/components/common/hooks/useLanguage';
import useInput from '@/components/common/hooks/useInput';
import Loader from '@/components/common/Loader';
import UserItem from '@/components/users/Item';

interface Props {
  assign: number[];
  setAssign: React.Dispatch<React.SetStateAction<number[]>>;
  hide: HandleToggle;
}

const AddMentionModal: React.FC<Props> = ({
  hide,
  assign,
  setAssign,
}) => {
  const [searchValue, setSearch] = useInput('');
  const [inputRef, focusInput] = useFocusInput();

  const dispatch = useDispatch();
  const items = useSelector(selectSearchItems);
  const isLoading = useSelector(selectIsLoading);
  const isActive = useSelector(selectIsSearchActive);
  const [{ common }] = useLanguage();

  const users = items?.filter((item) => (
    item.type === 'user'
    && !assign.includes(item.content._id)
    && item.content.role === 'developer'
  ));

  useEffect(() => {
    if (searchValue.length === 0) dispatch(clear());
    if (searchValue === '/') setSearch('');
    if (searchValue && searchValue.length) dispatch(searchTeam({ filter: searchValue }));
  }, [searchValue]);

  useEffect(() => {
    if (!isActive) setSearch('');
  }, [isActive]);

  const listWrapper = useRef<HTMLDivElement>(null);

  const clearSearch = () => setSearch('');

  const handleUpdateAssign = (item: SearchItem) => {
    if (item.type === 'user') {
      const updated = [...assign];
      updated.push(item.content._id);
      setAssign(updated);
    }

    hide(false);
  };

  return (
    <>
      <SearchWrap>
        <Header>
          <HeaderWrap>
            <TopButton onClick={hide}>
              <BackIcon />
            </TopButton>
            <SearchInput
              onClick={focusInput}
              type="text"
              autoFocus
              value={searchValue}
              onChange={setSearch}
              placeholder={common.global_search}
              ref={inputRef}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              autoCapitalize="off"
            />
            {isLoading && (
              <SmallLoader>
                <Loader position={false} width="100%" height="100%" />
              </SmallLoader>
            )}
            <PlusButton visibility={searchValue} onClick={clearSearch}>
              <PlusIcon width="27px" height="27px" />
            </PlusButton>
          </HeaderWrap>
        </Header>
        <ItemsContainer ref={listWrapper}>
          {(!users.length || searchValue.length === 0 ? (
            searchValue.length >= 0 && (
              <WrapNoResult>
                <SearchIcon>
                  <SearchGreyIcon />
                </SearchIcon>
                <NoResult>{common.no_results}</NoResult>
              </WrapNoResult>
            )
          ) : (
            <ResultsWrap onClick={hide}>
              {users.map((item) => {
                switch (item.type) {
                  case 'user':
                    return (
                      <UserItem
                        onClick={() => handleUpdateAssign(item)}
                        key={item.content._id}
                        user={item.content}
                      />
                    );
                  default: return null;
                }
              })}
            </ResultsWrap>
          ))}
        </ItemsContainer>
      </SearchWrap>
    </>
  );
};

const SearchWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const WrapNoResult = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  padding-bottom: 88px;
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
  display: flex;
  flex-direction: column;
  height: calc(100% - 72px);
  border-radius: 0 0 5px 5px;
  padding: 20px 0;
`;

const SearchInput = styled.input`
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
  width: 100%;
  max-width: 552px;
  border-radius: 5px 5px 0 0;
`;

const HeaderWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 16px;
  border-bottom: 1px solid rgb(33 39 46 / 12%);
`;

const SmallLoader = styled.div`
  position: absolute;
  top: 35px;
  right: 70px;
  transform: scale(0.5);
`;

const ResultsWrap = styled.div`
  height: 100%;
  overflow: scroll;
`;

export default AddMentionModal;
