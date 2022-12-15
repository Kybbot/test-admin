import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { cleanActions, getActions, setAcrhivedActionsOffset } from '@/store/actions/actions';
import { selectActionLoaderState, selectArchivedActions, selectArchivedActionsOffset } from '@/store/selectors/actions';
import { selectUser } from '@/store/selectors/user';

import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';
import ItemHeader from '@/components/actions/ItemHeader';
import EmptyCatalog from '@/components/actions/EmptyCatalog';
import Catalog from '@/components/actions/Catalog';
import Loader from '@/components/common/Loader';
import Navigation from '@/components/Navigation';
import { Action, ActionLoaderState, ActionType } from '@/store/reducers/actions';
import { cleanProjects, getProjects } from '@/store/actions/projects';
import { cleanUsers, getUsersWithManagers } from '@/store/actions/users';
import { cleanCustomers, getCustomers } from '@/store/actions/customers';
import LoaderDots from '@/components/common/LoaderDots';

const ActionsArchive: React.FC = () => {
  const [isFilterActive, toggleIsFilterActive] = useToggle();
  const [filteredActions, setFilteredActions] = useState<Action[] | null>(null);
  const [isPaginating, setIsPaginating] = useState(false);
  const loader = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();
  const offset = useSelector(selectArchivedActionsOffset);
  const actionLoader = useSelector(selectActionLoaderState);
  const [page, setPage] = useState<number>(offset);
  const history = useHistory();
  const actions = useSelector(selectArchivedActions);
  const user = useSelector(selectUser);
  const [{ common }] = useLanguage();
  useEffect(() => {
    if (!actions && user) {
      dispatch(getActions(user.role));
      dispatch(getUsersWithManagers());
      dispatch(getProjects());
      dispatch(getCustomers());
    }
    return () => {
      if (!history.location.pathname.includes('/actions')) {
        dispatch(setAcrhivedActionsOffset(0));
        dispatch(cleanActions());
        dispatch(cleanUsers());
        dispatch(cleanProjects());
        dispatch(cleanCustomers());
      }
    };
  }, []);
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 10);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
      delay: 100,
    };
    if (isPaginating) {
      const observer = new IntersectionObserver(handleObserver, option);
      if (loader.current) observer.observe(loader.current!);
    }
  }, [isPaginating]);

  useEffect(() => {
    if (actions) {
      setIsPaginating(true);
    }
  }, [actions]);

  useEffect(() => {
    if (isMounted && user) {
      dispatch(getActions(user.role, page));
      dispatch(setAcrhivedActionsOffset(page));
    } else {
      setIsMounted(true);
    }
  }, [page]);

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
                headerName={common.archive}
                toggleFilter={toggleIsFilterActive}
                isFilterActive={isFilterActive}
                goBack={handleGoBack}
            />
            <ItemsContainer className="scrollbar">
              {filteredActions.length ? (
                <>
                  <Catalog
                    pageType="archived"
                    actions={filteredActions}
                  />
                  {actions && <LoaderDiv ref={loader} />}
                </>
              ) : (
                <EmptyCatalog />
              )}
            </ItemsContainer>
            <Navigation path="actions" />
          </>
        )}
      {actionLoader === ActionLoaderState.LOADING && (
      <div style={{ marginTop: -85 }}>
        <LoaderDots />
        <div style={{ paddingBottom: 74 }} />
      </div>
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

const LoaderDiv = styled.div`
  width: 100%;
  height: 5px;
`;

export default ActionsArchive;
