import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import {
  cleanVacations,
  getCurrentVacations,
  getFutureVacations,
  getRecentVacations,
} from '@/store/actions/vacations';
import {
  selectCurrentVacations,
  selectFutureVacations,
  selectRecentVacations,
} from '@/store/selectors/vacations';

import EmptyCatalog from '@/components/vacations/EmptyCatalog';
import ItemHeader from '@/components/vacations/ItemHeader';
import Catalog from '@/components/currentVacations/Catalog';
import Loader from '@/components/common/Loader';

const CurrentVacations: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentVacations = useSelector(selectCurrentVacations);
  const futureVacations = useSelector(selectFutureVacations);
  const recentVacations = useSelector(selectRecentVacations);

  useEffect(() => {
    dispatch(getCurrentVacations());
    dispatch(getFutureVacations());
    dispatch(getRecentVacations());

    return () => {
      dispatch(cleanVacations());
    };
  }, []);

  const goBack = () => {
    history.push('/me');
  };

  return (
    <>
      <ItemHeader goBack={goBack} />
      {!currentVacations
      || !futureVacations
      || !recentVacations
        ? <Loader scale="0.5" />
        : (
          <ItemsContainer className="scrollbar">
            {currentVacations.length > 0
            || futureVacations.length > 0
            || recentVacations.length > 0
              ? (
                <Catalog
                  currentVacations={currentVacations}
                  futureVacations={futureVacations}
                  recentVacations={recentVacations}
                />
              ) : (
                <EmptyCatalog />
              )}
          </ItemsContainer>
        )}
    </>
  );
};

const ItemsContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  position: relative;
  overflow-y: auto;
`;

export default CurrentVacations;
