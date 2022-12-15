import React from 'react';
import Item from '@/components/salesActions/Item';
import { Action, ActionType } from '@/store/reducers/actions';

interface ModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  actions: Action[];
  pageType: 'current' | 'future' | 'archived' | 'recurrent';
}

const Catalog: React.FC<ModalProps> = ({
  actions,
  pageType,
}) => (
  <div>
    {actions.map((action:Action) => {
      switch (action.type) {
        case (ActionType.SALES):
          return (
            <Item
              pageType={pageType}
              key={action._id}
              action={action}
            />
          );
        default: return null;
      }
    })}
  </div>
);

export default Catalog;
