import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import {
  getInventoryItems,
  getInventoryParams,
  cleanInventory,
} from '@/store/actions/inventory';
import { selectItems, selectParams } from '@/store/selectors/inventory';

import EmptyCatalog from '@/components/inventory/EmptyCatalog';
import useToggle from '@/components/common/hooks/useToggle';
import ItemHeader from '@/components/inventory/ItemHeader';
import Catalog from '@/components/inventory/Catalog';
import Loader from '@/components/common/Loader';
import Search from '@/components/inventory/Search';
import ModalAdd from '@/components/inventory/ModalAdd';
import { cleanUsers, getUsers } from '@/store/actions/users';
import { selectUsers } from '@/store/selectors/users';

const Inventory: React.FC = () => {
  const [isActiveSearch, setActiveSearch] = useToggle();
  const [isActiveAdd, setActiveAdd] = useToggle();
  const [isActivePersonal, setIsActivePersonal] = useToggle();

  const history = useHistory();
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const users = useSelector(selectUsers);
  const parameters = useSelector(selectParams);
  let itemsCount = 0;

  const personalUsers = users?.filter((user) => user.hasPersonalInventory);
  const computerUsers = items?.map((item) => item.user).slice(0, -1).concat(personalUsers!);
  const noInventoryUsers = users?.filter((obj1) => !computerUsers?.some((obj2) => obj1._id === obj2._id));

  useEffect(() => {
    dispatch(getInventoryItems());
    dispatch(getInventoryParams());
    dispatch(getUsers());

    return () => {
      dispatch(cleanInventory());
      dispatch(cleanUsers());
    };
  }, []);

  const goBack = () => {
    history.goBack();
  };

  if (isActiveSearch) {
    return <Search items={items!} hideSearch={setActiveSearch} />;
  }

  items?.forEach((item) => {
    itemsCount += item.items.length;
  });

  const personalCount = personalUsers ? personalUsers.length : 0;

  return (
    <>
      <ItemHeader
        goBack={goBack}
        openSearch={setActiveSearch}
        openAdd={setActiveAdd}
        openPersonal={setIsActivePersonal}
        isPersonalActive={isActivePersonal}
        count={isActivePersonal ? personalCount : itemsCount}
      />
      {!items || !parameters
        ? <Loader scale="0.5" />
        : (
          <ItemsContainer className="scrollbar">
            {items.length > 0 ? (
              <Catalog
                items={items}
                isActivePersonal={isActivePersonal}
                personalUsers={personalUsers}
                noInventoryUsers={noInventoryUsers}
              />
            ) : (
              <EmptyCatalog />
            )}
          </ItemsContainer>
        )}
      {
        isActiveAdd && (
          <ModalAdd
            hideModal={setActiveAdd}
          />
        )
      }
    </>
  );
};

const ItemsContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  position: relative;
  padding: 16px;
  overflow-y: auto;
`;

export default Inventory;
