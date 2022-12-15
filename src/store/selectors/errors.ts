import { createSelector, Selector } from 'reselect';

import { State } from '@/store';

const ErrorsState = (state: State) => state.errorsReducer;

// eslint-disable-next-line import/prefer-default-export
export const selectErrorMessage: Selector<State, string | null> = createSelector(
  ErrorsState,
  ({ message }) => message,
);
