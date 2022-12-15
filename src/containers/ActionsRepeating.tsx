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
import { Action, ActionType } from '@/store/reducers/actions';
import Catalog from '@/components/actions/Catalog';
import Loader from '@/components/common/Loader';
import Navigation from '@/components/Navigation';
import { selectRecurrentActions } from '@/store/selectors/actions';
import { cleanProjects, getProjects } from '@/store/actions/projects';
import { cleanUsers, getUsersWithManagers } from '@/store/actions/users';
import { cleanCustomers, getCustomers } from '@/store/actions/customers';

const ActionsRepeating: React.FC = () => {
  const [isFilterActive, toggleIsFilterActive] = useToggle();
  const [filteredActions, setFilteredActions] = useState<Action[] | null>(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const actions = useSelector(selectRecurrentActions);
  const user = useSelector(selectUser);

  const [{ common }] = useLanguage();

  useEffect(() => {
    if (!actions) {
      dispatch(getCustomers());
      dispatch(getActions());
      dispatch(getUsersWithManagers());
      dispatch(getProjects());
    }
    return () => {
      if (!history.location.pathname.includes('/actions')) {
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
        action.type === ActionType.VACATION
        || action.type === ActionType.SICK_LEAVE
        || action.assign.includes(user!._id)
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
                headerName={common.recurrent_actions}
                toggleFilter={toggleIsFilterActive}
                isFilterActive={isFilterActive}
                goBack={handleGoBack}
            />
            <ItemsContainer className="scrollbar">
              {filteredActions.length ? (
                <Catalog
                  pageType="recurrent"
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
  padding-top: 8px;
  overflow-y: auto;
`;

export default ActionsRepeating;
