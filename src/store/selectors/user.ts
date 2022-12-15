import { createSelector, Selector } from 'reselect';

import { User } from '@/store/reducers/user';
import { State } from '@/store';

const selectUserState = (state: State) => state.userReducer;

export const selectIsLoggedIn: Selector<State, boolean> = createSelector(
  selectUserState,
  ({ isLoggedIn }) => isLoggedIn,
);

export const selectUser: Selector<State, User | null> = createSelector(
  selectUserState,
  ({ user }) => user,
);

export const selectRole: Selector<State, string | null> = createSelector(
  selectUserState,
  ({ role }) => role,
);
