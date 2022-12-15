import { createSelector, Selector } from 'reselect';
import { User, UserExtended } from '@/store/reducers/user';

import { State } from '@/store';

const UsersState = (state: State) => state.usersReducer;
export const selectUsers: Selector<State, User[] | null> = createSelector(
  UsersState,
  ({ users }) => users,
);

export const selectDeletedUsers: Selector<State, User[] | null> = createSelector(
  UsersState,
  ({ deletedUsers }) => deletedUsers,
);

export const selectExtendedUsers: Selector<State, UserExtended[] | null> = createSelector(
  UsersState,
  ({ extendedUsers }) => extendedUsers,
);

export const selectUser: Selector<State, User | null> = createSelector(
  UsersState,
  ({ user }) => user,
);

export const selectUsersRoles: Selector<State, string[] | null> = createSelector(
  UsersState,
  ({ roles }) => roles,
);

export const selectEnglishLevels: Selector<State, string[] | null> = createSelector(
  UsersState,
  ({ englishLevels }) => englishLevels,
);

export const selectGrades: Selector<State, string[] | null> = createSelector(
  UsersState,
  ({ grades }) => grades,
);

export const selectUsersTags: Selector<State, string[] | null> = createSelector(
  UsersState,
  ({ tags }) => tags,
);

export const selectIsSaveLoading: Selector<State, boolean> = createSelector(
  UsersState,
  ({ isSaveLoading }) => isSaveLoading,
);

export const selectFilters: Selector<State, string[]> = createSelector(
  UsersState,
  ({ filters }) => filters,
);

export const selectPeopleFilter: Selector<State, string> = createSelector(
  UsersState,
  ({ peopleFilter }) => peopleFilter,
);

export const selectWorkloadFilter: Selector<State, number | null> = createSelector(
  UsersState,
  ({ workloadFilter }) => workloadFilter,
);

export const selectIsExtended: Selector<State, boolean> = createSelector(
  UsersState,
  ({ isExtended }) => isExtended,
);
