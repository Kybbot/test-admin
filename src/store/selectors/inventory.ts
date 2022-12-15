import { createSelector, Selector } from 'reselect';
import { Computer, InventoryItem, Parameters } from '@/store/reducers/inventory';
import { State } from '@/store';

const InventoryState = (state: State) => state.inventoryReducer;

export const selectItems: Selector<State, InventoryItem[] | null> = createSelector(
  InventoryState,
  ({ items }) => items,
);

export const selectUsersItems: Selector<State, Computer[] | null> = createSelector(
  InventoryState,
  ({ usersItems }) => usersItems,
);

export const selectItemHistoryUsers: Selector<State, Computer | null> = createSelector(
  InventoryState,
  ({ itemHistoryUsers }) => itemHistoryUsers,
);

export const selectParams: Selector<State, Parameters | null> = createSelector(
  InventoryState,
  ({ parameters }) => parameters,
);

export const selectIsSaveLoading: Selector<State, boolean> = createSelector(
  InventoryState,
  ({ isSaveLoading }) => isSaveLoading,
);
