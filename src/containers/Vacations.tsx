import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import {
  approveVacation,
  cleanVacations,
  getCurrentVacations,
  getFutureVacations,
  getPendingVacations,
  getRecentVacations,
  rejectVacation,
} from '@/store/actions/vacations';
import {
  selectCurrentVacations,
  selectFutureVacations,
  selectPendingVacations,
  selectRecentVacations,
} from '@/store/selectors/vacations';

import ModalApprove from '@/components/vacations/ModalApprove';
import EmptyCatalog from '@/components/vacations/EmptyCatalog';
import ModalReject from '@/components/vacations/ModalReject';
import useToggle from '@/components/common/hooks/useToggle';
import ItemHeader from '@/components/vacations/ItemHeader';
import Catalog from '@/components/vacations/Catalog';
import Loader from '@/components/common/Loader';

interface Props extends RouteComponentProps<{ vacationId: string }> {}

const Vacations: React.FC<Props> = ({ match, history }) => {
  const { vacationId } = match.params;
  const [isActiveModalApprove, setIsActiveModalApprove] = useToggle();
  const [isActiveModalReject, setIsActiveModalReject] = useToggle();

  const dispatch = useDispatch();
  const pendingVacations = useSelector(selectPendingVacations);
  const recentVacations = useSelector(selectRecentVacations);
  const futureVacations = useSelector(selectFutureVacations);
  const currentVacations = useSelector(selectCurrentVacations);

  useEffect(() => {
    dispatch(getPendingVacations());
    dispatch(getRecentVacations());
    dispatch(getCurrentVacations());
    dispatch(getFutureVacations());

    return () => {
      dispatch(cleanVacations());
    };
  }, []);

  const handleApprove = () => {
    dispatch(approveVacation(+vacationId));
  };

  const handleReject = () => {
    dispatch(rejectVacation(+vacationId));
  };

  const goBack = () => {
    history.push('/me');
  };

  return (
    <>
      <ItemHeader goBack={goBack} />
      {!pendingVacations
        || !futureVacations
        || !currentVacations
        || !recentVacations
        ? <Loader scale="0.5" />
        : (
          <ItemsContainer className="scrollbar">
            {pendingVacations.length > 0
              || futureVacations.length > 0
              || currentVacations.length > 0
              || recentVacations.length > 0 ? (
                <Catalog
                  currentVacations={currentVacations}
                  recentVacations={recentVacations}
                  pendingVacations={pendingVacations}
                  futureVacations={futureVacations}
                  openApproveModal={setIsActiveModalApprove}
                  openRejectModal={setIsActiveModalReject}
                />
              ) : (
                <EmptyCatalog />
              )}
          </ItemsContainer>
        )}
      {isActiveModalApprove && (
        <ModalApprove
          approve={handleApprove}
          hideModal={setIsActiveModalApprove}
        />
      )}
      {isActiveModalReject && (
        <ModalReject
          reject={handleReject}
          hideModal={setIsActiveModalReject}
        />
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

export default Vacations;
