import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { cleanActions, getActions } from '@/store/actions/actions';
import { selectUser } from '@/store/selectors/user';

import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';
import ItemHeader from '@/components/actions/ItemHeader';
import EmptyCatalog from '@/components/actions/EmptyCatalog';
import Catalog from '@/components/salesActions/Catalog';
import Loader from '@/components/common/Loader';
import Navigation from '@/components/Navigation';
import { Action, ActionType } from '@/store/reducers/actions';
import { selectArchivedActions } from '@/store/selectors/actions';
import { getCustomers, cleanCustomers } from '@/store/actions/customers';
import { getProjects, cleanProjects } from '@/store/actions/projects';
import { getUsersWithManagers, cleanUsers } from '@/store/actions/users';

const SalesActionsArchive: React.FC = () => {
  const [isFilterActive, toggleIsFilterActive] = useToggle();
  const [filteredActions, setFilteredActions] = useState<Action[] | null>(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const actions = useSelector(selectArchivedActions);
  const user = useSelector(selectUser);

  const [{ common }] = useLanguage();

  useEffect(() => {
    const getInfo = async () => {
      dispatch(getActions(user?.role));
      dispatch(getUsersWithManagers());
      dispatch(getProjects());
      dispatch(getCustomers());
    };
    if (!actions) {
      getInfo();
    }
    return () => {
      if (!history.location.pathname.includes('actions')) {
        dispatch(cleanActions());
        dispatch(cleanUsers());
        dispatch(cleanProjects());
        dispatch(cleanCustomers());
      }
    };
  }, []);

  useEffect(() => {
    if (isFilterActive) {
      const filtered = actions!.filter((action) => (
        action.type === ActionType.SALES && action.assign.includes(user!._id)
      ));

      setFilteredActions(filtered);
    } else {
      setFilteredActions(actions);
    }
  }, [isFilterActive, actions]);

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <>
      {!filteredActions || !actions
        ? <Loader scale="0.5" />
        : (
          <>
            <ItemHeader
                headerName={common.archive}
                toggleFilter={toggleIsFilterActive}
                isFilterActive={isFilterActive}
                goBack={handleGoBack}
            />
            <ItemsContainer className="scrollbar">
              {filteredActions.length ? (
                <Catalog
                  pageType="archived"
                  actions={filteredActions}
                />
              ) : (
                <EmptyCatalog />
              )}
            </ItemsContainer>
            <Navigation path="actions" />
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

export default SalesActionsArchive;