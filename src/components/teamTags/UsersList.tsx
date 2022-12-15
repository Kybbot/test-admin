import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import useLanguage from '@/components/common/hooks/useLanguage';
import useInput from '@/components/common/hooks/useInput';
import useFocusInput from '@/components/common/hooks/useFocusInput';
import { HandleToggle } from '@/components/common/hooks/useToggle';
import SearchGreyIcon from '@/components/common/icons/items/SearchGreyIcon';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import BackIcon from '@/components/common/icons/BackIcon';
import { User } from '@/store/reducers/user';
import search from '@/utils/search';
import { toggleUsersTagFromList } from '@/store/actions/users';
import CircleCheckIcon from '@/components/common/icons/CircleCheckIcon';
import CircleIcon from '@/components/common/icons/CircleIcon';
import getPhoto from '@/utils/getPhoto';

interface Props {
  hideSearch: HandleToggle;
  users: User[];
  tag: string
}

const UsersList: React.FC<Props> = ({ hideSearch, users, tag }) => {
  const [searchValue, setSearch] = useInput();
  const [inputRef, focusInput] = useFocusInput();

  const [{ common }] = useLanguage();
  const dispatch = useDispatch();

  const listWrapper = useRef<HTMLDivElement>(null);

  const employees = users?.filter((user) => user.role !== 'admin' && user.role !== 'hr');

  const searchItem = search(employees, searchValue, ({ name }) => name);

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

  const getIsTagSelected = (user: User) => {
    if (!user.tags) return false;
    return user.tags.includes(tag);
  };

  const handleClick = (id: number) => () => {
    dispatch(toggleUsersTagFromList(tag, id));
  };

  return (
    <>
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
            placeholder={tag}
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
      <ItemsContainer ref={listWrapper} className="scrollbar">
        {(!searchItem.length ? (
          searchValue.length > 0 && (
            <WrapNoResult>
              <SearchIcon>
                <SearchGreyIcon />
              </SearchIcon>
              <NoResult>{common.no_results}</NoResult>
            </WrapNoResult>
          )
        ) : (
          <>
            {searchItem.map((user: User) => (
              <ItemWrap key={user._id} onClick={handleClick(user._id)}>
                <ItemInfo>
                  <LinkUser>
                    <Photo url={getPhoto(user.smallPhoto)} />
                    <NameItem isColor>{user!.name}</NameItem>
                  </LinkUser>
                </ItemInfo>
                <LinkUser>
                  <RightArrow>
                    {getIsTagSelected(user) ? <CircleCheckIcon /> : <CircleIcon />}
                  </RightArrow>
                </LinkUser>
              </ItemWrap>
            )).reverse()}
          </>
        ))}
      </ItemsContainer>
    </>
  );
};

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
  height: 100%;
  background-color: #ffffff;
  position: relative;
  padding: 12px 0;
  overflow-y: auto;
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
  position: relative;
  z-index: 100;
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
  padding: 24px 16px;
`;

const ItemInfo = styled.div`
  width: 100%;
`;

const NameItem = styled.div<{isColor: boolean}>`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.3px;
  color: ${({ isColor }) => (isColor ? '#21272e' : '#909599')};
  word-break: break-word;
  text-transform: capitalize;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;


  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const ItemWrap = styled.div`
  padding: 8px 10px;
  margin: 4px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
  position: relative;
  cursor: pointer;
`;

const Photo = styled.div<{url: string}>`
  width: 43px;
  height: 43px;
  background-image: ${({ url }) => (`url('${url}')`)};
  background-size: cover;
  border-radius: 100%;
  margin-right: 10px;
  background-position: center;
`;

const LinkUser = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const RightArrow = styled.div`
  width: 25px;
  height: 25px;
`;

export default UsersList;
