import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { cleanActions, getActions, setAcrhivedActionsOffset } from '@/store/actions/actions';
import { selectUser } from '@/store/selectors/user';

import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';
import ItemHeader from '@/components/actions/ItemHeader';
import EmptyCatalog from '@/components/actions/EmptyCatalog';
import Catalog from '@/components/teamActions/Catalog';
import Loader from '@/components/common/Loader';
import Navigation from '@/components/Navigation';
import { Action, ActionLoaderState } from '@/store/reducers/actions';
import { selectActionLoaderState, selectArchivedActions, selectArchivedActionsOffset } from '@/store/selectors/actions';
import { getCustomers, cleanCustomers } from '@/store/actions/customers';
import { getProjects, cleanProjects } from '@/store/actions/projects';
import { getUsersWithManagers, cleanUsers } from '@/store/actions/users';
import LoaderDots from '@/components/common/LoaderDots';

const TeamActionsArchive: React.FC = () => {
  const [isFilterActive, toggleIsFilterActive] = useToggle();
  const [filteredActions, setFilteredActions] = useState<Action[] | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isPaginating, setIsPaginating] = useState(false);
  const loader = useRef(null);
  const dispatch = useDispatch();
  const offset = useSelector(selectArchivedActionsOffset);
  const actionLoader = useSelector(selectActionLoaderState);
  const [page, setPage] = useState<number>(offset);
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
    if (isMounted && user) {
      dispatch(getActions(user.role, page));
      dispatch(setAcrhivedActionsOffset(page));
    } else {
      setIsMounted(true);
    }
  }, [page]);

  useEffect(() => {
    if (actions) {
      setIsPaginating(true);
    }
  }, [actions]);

  useEffect(() => {
    if (isFilterActive) {
      const filtered = actions!.filter((action) => (
        action.type === 'team' && action.assign.includes(user!._id)
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
      {actionLoader === ActionLoaderState.LOADING && (
      <div style={{ marginTop: -85 }}>
        <LoaderDots />
        <div style={{ paddingBottom: 74 }} />
      </div>
      )}
      <div ref={loader} />
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

export default TeamActionsArchive;
