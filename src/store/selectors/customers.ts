import { createSelector, Selector } from 'reselect';
import { Customer } from '@/store/reducers/customers';

import { State } from '@/store';

const CustomersState = (state: State) => state.customersReducer;

export const selectCustomers: Selector<State, Customer[] | null> = createSelector(
  CustomersState,
  ({ customers }) => customers,
);

export const selectCustomer: Selector<State, Customer | null> = createSelector(
  CustomersState,
  ({ customer }) => customer,
);

export const selectIsSaveLoading: Selector<State, boolean> = createSelector(
  CustomersState,
  ({ isSaveLoading }) => isSaveLoading,
);
