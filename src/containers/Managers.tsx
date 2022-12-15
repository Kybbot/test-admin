import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { cleanUsers, getManagers } from '@/store/actions/users';
import { selectUsers } from '@/store/selectors/users';
import { selectRole } from '@/store/selectors/user';

import useToggle from '@/components/common/hooks/useToggle';
import Catalog from '@/components/managers/Catalog';
import EmptyCatalog from '@/components/users/EmptyCatalog';
import ItemHeader from '@/components/managers/ItemHeader';
import Search from '@/components/managers/Search';
import Loader from '@/components/common/Loader';
import Navigation from '@/components/Navigation';

const Managers: React.FC = () => {
  const [isActiveSearch, setActiveSearch] = useToggle();

  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const role = useSelector(selectRole);

  useEffect(() => {
    dispatch(getManagers());
    return () => {
      dispatch(cleanUsers());
    };
  }, []);

  if (isActiveSearch) {
    return <Search users={users!} hideSearch={setActiveSearch} />;
  }

  return (
    <>
      {users === null
        ? <Loader scale="0.5" />
        : (
          <>
            <ItemHeader
                count={users?.length}
                openSearch={setActiveSearch}
                isAdmin={role === 'admin'}
            />
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

export default Managers;
