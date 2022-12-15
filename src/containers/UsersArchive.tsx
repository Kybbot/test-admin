/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { cleanDeletedUsers, cleanUsers, getDeletedUsers } from '@/store/actions/users';
import { selectDeletedUsers } from '@/store/selectors/users';

import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';
import BackIcon from '@/components/common/icons/BackIcon';
import SearchIcon from '@/components/common/icons/SearchIcon';
import Catalog from '@/components/users/Catalog';
import EmptyCatalog from '@/components/users/EmptyCatalog';
import Search from '@/components/users/Search';
import Loader from '@/components/common/Loader';
import Navigation from '@/components/Navigation';

const UsersArchive: React.FC = () => {
  const [isActiveSearch, setActiveSearch] = useToggle();

  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector(selectDeletedUsers);
  const [{ common }] = useLanguage();

  useEffect(() => {
    dispatch(getDeletedUsers());
    return () => {
      dispatch(cleanDeletedUsers());
    };
  }, []);

  if (isActiveSearch) {
    return (
      <Search
        users={users!}
        hideSearch={setActiveSearch}
      />
    );
  }

  const handleGoBack = () => {
    dispatch(cleanUsers());
    history.goBack();
  };

  return (
    <>
      {!users
        ? <Loader scale="0.5" />
        : (
          <>
            <Header>
              <HeaderWrap>
                <HeaderSmallWrapper>
                  <IconWrap onClick={handleGoBack}>
                    <BackIcon />
                  </IconWrap>
                  <HeaderText>
                    {common.users_archive}
                  </HeaderText>
                </HeaderSmallWrapper>
                <HeaderSmallWrapper>
                  <HeaderIcon onClick={setActiveSearch}>
                    <SearchIcon />
                  </HeaderIcon>
                </HeaderSmallWrapper>
              </HeaderWrap>
            </Header>
            <ItemsContainer className="scrollbar">
              {users!.length > 0 ? (
                <Catalog
                  users={users}
                />
              ) : (
                <EmptyCatalog />
              )}
            </ItemsContainer>
            {!isActiveSearch && (
            <Navigation path="users" />
            )}
          </>
        )}
    </>
  );
};

const ItemsContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  position: relative;
  padding: 16px 0;
  overflow-y: auto;
`;

const Header = styled.header`
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  height: 72px;
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

export default UsersArchive;
