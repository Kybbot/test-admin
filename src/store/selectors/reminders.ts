import { createSelector, Selector } from 'reselect';

import { State } from '@/store';

const RemindersState = (state: State) => state.remindersReducer;

// eslint-disable-next-line import/prefer-default-export
export const selectIsSaveLoading: Selector<State, boolean> = createSelector(
  RemindersState,
  ({ isSaveLoading }) => isSaveLoading,
);
