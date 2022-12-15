import { createSelector, Selector } from 'reselect';

import { State } from '@/store';
import { CombinedSickLeaves, SickLeave } from '@/store/reducers/sick-leaves';

const selectSickLeave = (state: State) => state.sickLeaveReducer;

export const selectSickLeaves: Selector<State, SickLeave[] | null> = createSelector(
  selectSickLeave,
  ({ sickLeaves }) => sickLeaves,
);

export const selectCombinedSickLeaves:
Selector<State, CombinedSickLeaves[] | null> = createSelector(
  selectSickLeave,
  ({ combinedSickLeaves }) => combinedSickLeaves,
);

export const selectPersonalSickLeaves: Selector<State, SickLeave[] | null> = createSelector(
  selectSickLeave,
  ({ personalSickLeaves }) => personalSickLeaves,
);

export const selectPersonalCombinedSickLeaves:
Selector<State, CombinedSickLeaves[] | null> = createSelector(
  selectSickLeave,
  ({ combinedPersonalSickLeaves }) => combinedPersonalSickLeaves,
);
