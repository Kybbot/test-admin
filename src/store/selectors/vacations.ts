import { createSelector, Selector } from 'reselect';
import {
  Holiday,
  Overtime,
  Vacation,
  VacationInfo,
} from '@/store/reducers/vacations';

import { State } from '@/store';

const VacationsState = (state: State) => state.vacationsReducer;
export const selectVacations: Selector<State, Vacation[] | null> = createSelector(
  VacationsState,
  ({ vacations }) => vacations,
);

export const selectPendingVacations: Selector<State, Vacation[] | null> = createSelector(
  VacationsState,
  ({ pendingVacations }) => pendingVacations,
);

export const selectRecentVacations: Selector<State, Vacation[] | null> = createSelector(
  VacationsState,
  ({ recentVacations }) => recentVacations,
);

export const selectCurrentVacations: Selector<State, Vacation[] | null> = createSelector(
  VacationsState,
  ({ currentVacations }) => currentVacations,
);

export const selectFutureVacations: Selector<State, Vacation[] | null> = createSelector(
  VacationsState,
  ({ futureVacations }) => futureVacations,
);

export const selectApprovedVacations: Selector<State, Vacation[] | null> = createSelector(
  VacationsState,
  ({ approvedVacations }) => approvedVacations,
);

export const selectIsSaveLoading: Selector<State, boolean> = createSelector(
  VacationsState,
  ({ isSaveLoading }) => isSaveLoading,
);

export const selectUserOvertimes: Selector<State, Overtime[] | null> = createSelector(
  VacationsState,
  ({ userOvertimes }) => userOvertimes,
);

export const selectStartDate: Selector<State, number | null> = createSelector(
  VacationsState,
  ({ startDate }) => startDate,
);

export const selectHolidays: Selector<State, Holiday[] | null> = createSelector(
  VacationsState,
  ({ holidays }) => holidays,
);

export const selectVacationInfo: Selector<State, VacationInfo | null> = createSelector(
  VacationsState,
  ({ vacationInfo }) => vacationInfo,
);
