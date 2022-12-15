import { createSelector, Selector } from 'reselect';

import { CombinedSickLeaves, SickLeave } from '@/store/reducers/sick-leaves';
import { CalendarVacation, Vacation } from '@/store/reducers/vacations';
import { Computer } from '@/store/reducers/inventory';
import { Project } from '@/store/reducers/projects';
import { State } from '@/store';
import { CombinedCalendarVacations, CombinedVacations } from '@/store/actions/vacations';

const selectUserState = (state: State) => state.profileReducer;

export const selectVacations: Selector<State, Vacation[] | null> = createSelector(
  selectUserState,
  ({ vacations }) => vacations,
);

export const selectVacationsCalendar: Selector<State, CalendarVacation[] | null> = createSelector(
  selectUserState,
  ({ vacationsCalendar }) => vacationsCalendar,
);

export const selectSickLeaves: Selector<State, SickLeave[] | null> = createSelector(
  selectUserState,
  ({ sickLeaves }) => sickLeaves,
);

export const selectCombinedSickLeaves:
Selector<State, CombinedSickLeaves[] | null> = createSelector(
  selectUserState,
  ({ combinedSickLeaves }) => combinedSickLeaves,
);

export const selectCombinedVacations: Selector<State, CombinedVacations[] | null> = createSelector(
  selectUserState,
  ({ combinedVacations }) => combinedVacations,
);

export const selectCombinedVacationsCalendar:
Selector<State, CombinedCalendarVacations[] | null> = createSelector(
  selectUserState,
  ({ combinedVacationsCalendar }) => combinedVacationsCalendar,
);

export const selectMyInventory: Selector<State, Computer[] | null> = createSelector(
  selectUserState,
  ({ inventory }) => inventory,
);

export const selectMyProjects: Selector<State, Project[] | null> = createSelector(
  selectUserState,
  ({ projects }) => projects,
);
