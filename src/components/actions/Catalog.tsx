import React from 'react';
import styled from 'styled-components';
import { HandleToggle } from '@/components/common/hooks/useToggle';
import Item from '@/components/actions/Item';
import ItemVacation from '@/components/actions/ItemVacation';
import { Action, ActionType } from '@/store/reducers/actions';
import ItemSickLeave from '@/components/actions/ItemSickLeave';

interface ModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  actions: Action[];
  pageType: 'current' | 'future' | 'archived' | 'recurrent';
  openApproveModal?: HandleToggle
  openRejectModal?: HandleToggle
}

const Catalog: React.FC<ModalProps> = ({
  actions,
  pageType,
  openApproveModal,
  openRejectModal,
}) => (
  <Wrap>
    {actions.map((action:Action) => {
      switch (action.type) {
        case (ActionType.VACATION):
          return (
            <ItemVacation
              key={`${action.vacation._id}vacation`}
              vacation={action.vacation}
              openApproveModal={openApproveModal!}
              openRejectModal={openRejectModal!}
              withButtons
            />
          );
        case (ActionType.SICK_LEAVE):
          return (
            <ItemSickLeave
              key={`${action.sickLeave._id}sickLeave`}
              sickLeave={action.sickLeave}
            />
          );
        case (ActionType.ADMIN):
          return (
            <Item
              pageType={pageType}
              key={`${action._id}admin`}
              action={action}
            />
          );
        default: return null;
      }
    })}
  </Wrap>
);

const Wrap = styled.div`
  padding: 0 0 16px;
`;

export default Catalog;
