import { createSelector, Selector } from 'reselect';

import { Action, ActionLoaderState } from '@/store/reducers/actions';
import { State } from '@/store';

const VacationsState = (state: State) => state.actionsReducer;

export const selectCurrentActions: Selector<State, Action[] | null> = createSelector(
  VacationsState,
  ({ currentActions }) => currentActions,
);

export const selectRecurrentActions: Selector<State, Action[] | null> = createSelector(
  VacationsState,
  ({ recurrentActions }) => recurrentActions,
);

export const selectArchivedActions: Selector<State, Action[] | null> = createSelector(
  VacationsState,
  ({ archivedActions }) => archivedActions,
);

export const selectArchivedActionsOffset: Selector<State, number> = createSelector(
  VacationsState,
  ({ archivedActionsOffset }) => archivedActionsOffset,
);

export const selectActionLoaderState: Selector<State, ActionLoaderState> = createSelector(
  VacationsState,
  ({ loaderState }) => loaderState,
);

export const selectUpcomingActions: Selector<State, Action[] | null> = createSelector(
  VacationsState,
  ({ upcomingActions }) => upcomingActions,
);

export const selectAction: Selector<State, Action | null> = createSelector(
  VacationsState,
  ({ action }) => action,
);

export const selectIsSaveLoading: Selector<State, boolean> = createSelector(
  VacationsState,
  ({ isSaveLoading }) => isSaveLoading,
);
