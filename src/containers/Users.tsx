/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import {
  getUsers,
  cleanUsers,
  setFilters,
} from '@/store/actions/users';
import {
  selectExtendedUsers,
  selectFilters,
  selectIsSaveLoading,
  selectUsers,
} from '@/store/selectors/users';
import { selectRole } from '@/store/selectors/user';

import useToggle from '@/components/common/hooks/useToggle';
import useLanguage from '@/components/common/hooks/useLanguage';
import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';
import ArchiveIcon from '@/components/common/icons/ArchiveIcon';
import Catalog from '@/components/users/Catalog';
import EmptyCatalog from '@/components/users/EmptyCatalog';
import ItemHeader from '@/components/users/ItemHeader';
import { User, UserExtended } from '@/store/reducers/user';
import Search from '@/components/users/Search';
import Loader from '@/components/common/Loader';
import Navigation from '@/components/Navigation';
import ModalFilters from '@/components/users/ModalFiltration';
import CatalogExtended from '@/components/users/CatalogExtended';
import Empty from '@/components/Empty';

const Users: React.FC = () => {
  const [isActiveSearch, setActiveSearch] = useToggle();
  const [isModalFiltersActive, toggleIsModalFiltersActive] = useToggle();
  const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);
  const [filteredExtendedUsers, setFilteredExtendedUsers] = useState<UserExtended[] | null>(null);

  const dispatch = useDispatch();
  const [{ common }] = useLanguage();
  const users = useSelector(selectUsers);
  const isLoading = useSelector(selectIsSaveLoading);
  const extendedUsers = useSelector(selectExtendedUsers);
  const role = useSelector(selectRole);
  const filters = useSelector(selectFilters);
  const history = useHistory();
  const handleSetFilters = (filtersArr: string[]) => {
    dispatch(setFilters(filtersArr));
  };

  useEffect(() => {
    if (history.action === 'REPLACE' || !users) {
      dispatch(getUsers());
    }
    return () => {
      if (!history.location.pathname.includes('users')) {
        dispatch(cleanUsers());
      }
    };
  }, []);

  const employees = filteredUsers?.filter((user) => user.role !== 'admin' && user.role !== 'hr');

  useEffect(() => {
    if (!filters.length && users) {
      setFilteredUsers(users);
    }

    if (filters.length && users) {
      const filteredByTag = users!.filter(({ tags, grade }) => (
        filters.every((filter) => tags?.includes(filter) || grade === filter)));

      setFilteredUsers(filteredByTag);
    }
  }, [users, filters]);

  useEffect(() => {
    if (!filters.length && extendedUsers) {
      setFilteredExtendedUsers(extendedUsers);
    }

    if (filters.length && extendedUsers) {
      const filteredByTag = extendedUsers!.filter(({ tags, grade }) => (
        filters.every((filter) => tags?.includes(filter) || grade === filter)));

      setFilteredExtendedUsers(filteredByTag);
    }
  }, [extendedUsers, filters]);

  if (isActiveSearch) {
    return (
      <Search
        users={extendedUsers ? filteredExtendedUsers! : filteredUsers!}
        hideSearch={setActiveSearch}
      />
    );
  }

  return (
    <>
      {filteredUsers === null || isLoading
        ? (
          <Loader scale="0.5" />
        )
        : (
          <>
            <ItemHeader
              isLoading={isLoading}
              count={employees?.length}
              filters={filters}
              openSearch={setActiveSearch}
              openFilters={toggleIsModalFiltersActive}
              setFilters={handleSetFilters}
              isAdmin={role === 'admin'}
              isSales={role === 'sales'}
              isFiltersActive={Boolean(filters.length)}
            />
            <Empty height="72px" />
            <ItemsContainer className="scrollbar">
              <ItemsWrapper>
                {!extendedUsers ? (
                  filteredUsers.length > 0 ? (
                    <Catalog
                      users={filteredUsers}
                    />
                  ) : (
                    <EmptyCatalog />
                  )
                ) : (
                  filteredExtendedUsers!.length > 0 ? (
                    <CatalogExtended
                      users={filteredExtendedUsers}
                    />
                  ) : (
                    <EmptyCatalog />
                  )
                )}
                {role === 'admin' && !filters.length && (
                <ItemWrap to="/users-archive">
                  <ItemInfo>
                    <LinkUser>
                      <IconWrap>
                        <ArchiveIcon />
                      </IconWrap>
                      <NameItem isColor>{common.users_archive}</NameItem>
                    </LinkUser>
                  </ItemInfo>
                  <LinkUser>
                    <RightArrow>
                      <SmallArrowIcon />
                    </RightArrow>
                  </LinkUser>
                </ItemWrap>
                )}
              </ItemsWrapper>
            </ItemsContainer>
            <Empty height="64px" />
            {!isActiveSearch && (
            <Navigation path="users" />
            )}
          </>
        )}
      {isModalFiltersActive && (
        <ModalFilters
          hideModal={toggleIsModalFiltersActive}
          filters={filters}
          setFilters={handleSetFilters}
          users={filteredUsers}
        />
      )}
    </>
  );
};

const ItemsWrapper = styled.div`
  margin-top: 8px;

  &:last-child {
    margin-bottom: 12px;
  }
`;

const ItemsContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  position: relative;
  overflow-y: auto;
  padding: 8px 0;
  flex: 1;
`;

const ItemInfo = styled.div`
  width: 100%;
`;

const NameItem = styled.div<{isColor: boolean}>`
  font-size: 14px;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.3px;
  color: ${({ isColor }) => (isColor ? '#21272e' : '#909599')};
  word-break: break-word;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  
  &:first-letter {
    text-transform: uppercase;
  }


  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const ItemWrap = styled(Link)`
  padding: 0 10px;
  height: 61px;
  margin: 4px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
  position: relative;
  text-decoration: none;
  align-self: end;
`;

const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px #dae1e8;
  background-color: #f0f1f2;
  border-radius: 50%;
  width: 43px;
  height: 43px;
  margin-right: 10px;
  background-position: center;
`;

const LinkUser = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const RightArrow = styled.div`
  margin-top: 3px;
`;

export default Users;
