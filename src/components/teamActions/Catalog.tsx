import React from 'react';
import Item from '@/components/teamActions/Item';
import { Action } from '@/store/reducers/actions';

interface ModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  actions: Action[];
  pageType: 'current' | 'future' | 'archived' | 'recurrent';
}

const Catalog: React.FC<ModalProps> = ({
  pageType,
  actions,
}) => (
  <div>
    {actions.map((action:Action) => {
      switch (action.type) {
        case ('team'):
          return (
            <Item
              key={action._id}
              action={action}
              pageType={pageType}
            />
          );
        default: return null;
      }
    })}
  </div>
);

export default Catalog;
