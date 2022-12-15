import { createSelector, Selector } from 'reselect';

import { State } from '@/store';

const selectLogin = (state: State) => state.loginReducer;

export const selectIsLoginPending: Selector<State, boolean> = createSelector(
  selectLogin,
  ({ isPending }) => isPending,
);

export const selectIsLoginResolved: Selector<State, boolean> = createSelector(
  selectLogin,
  ({ isResolved }) => isResolved,
);

export const selectIsLoginReject: Selector<State, boolean> = createSelector(
  selectLogin,
  ({ isRejected }) => isRejected,
);

export const selectIsAvailable: Selector<State, boolean> = createSelector(
  selectLogin,
  ({ isAvailable }) => isAvailable,
);

export const selectIsChangePasswordReject: Selector<State, boolean> = createSelector(
  selectLogin,
  ({ isChangePasswordRejected }) => isChangePasswordRejected,
);

export const selectIsSaveLoading: Selector<State, boolean> = createSelector(
  selectLogin,
  ({ isSaveLoading }) => isSaveLoading,
);
