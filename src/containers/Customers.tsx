import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { cleanCustomers, getCustomers } from '@/store/actions/customers';
import { selectCustomers } from '@/store/selectors/customers';

import useToggle from '@/components/common/hooks/useToggle';
import Catalog from '@/components/customers/Catalog';
import EmptyCatalog from '@/components/customers/EmptyCatalog';
import ItemHeader from '@/components/customers/ItemHeader';
import Navigation from '@/components/Navigation';
import Search from '@/components/customers/Search';
import Loader from '@/components/common/Loader';

const Customers: React.FC = () => {
  const [isActiveSearch, setActiveSearch] = useToggle();

  const dispatch = useDispatch();
  const customers = useSelector(selectCustomers);

  useEffect(() => {
    dispatch(getCustomers());

    return () => {
      dispatch(cleanCustomers());
    };
  }, []);

  if (isActiveSearch) {
    return <Search customers={customers!} hideSearch={setActiveSearch} />;
  }

  return (
    <>
      {customers === null
        ? <Loader scale="0.5" />
        : (
          <>
            <ItemHeader openSearch={setActiveSearch} />
            <ItemsContainer className="scrollbar">
              {customers!.length > 0 ? (
                <Catalog
                  customers={customers}
                />
              ) : (
                <EmptyCatalog />
              )}
            </ItemsContainer>
            {!isActiveSearch && (
            <Navigation path="customers" />
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

export default Customers;
