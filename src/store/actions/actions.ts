/* eslint no-case-declarations: 0 */
import { createActionCreators } from 'immer-reducer';

import {
  Action, ActionLoaderState, ActionsReducer, ActionType,
} from '@/store/reducers/actions';
import { changeWorkload } from '@/store/actions/users';

import { AsyncAction } from './common';

export const actionsActions = createActionCreators(ActionsReducer);

export type ActionsActions =
  | ReturnType<typeof actionsActions.setRecurrentAction>
  | ReturnType<typeof actionsActions.setCurrentActions>
  | ReturnType<typeof actionsActions.setArchivedActions>
  | ReturnType<typeof actionsActions.setUpcomingActions>
  | ReturnType<typeof actionsActions.setIsSaveLoading>
  | ReturnType<typeof actionsActions.setAction>
  | ReturnType<typeof actionsActions.cleanActions>
  | ReturnType<typeof actionsActions.setArchivedActionsOffset>
  | ReturnType<typeof actionsActions.addArchivedActions>
  | ReturnType<typeof actionsActions.setActionLoaderState>;

export const getActions = (
  role?: string,
  offset?: number,
): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(actionsActions.setActionLoaderState(ActionLoaderState.LOADING));
    if (offset !== undefined) {
      let archivedActions: Action[] = [];
      if (role === 'developer') {
        archivedActions = await mainProtectedApi.getTeamArchivedActions(10, offset);
      }
      if (role === 'admin') {
        archivedActions = await mainProtectedApi.getArchivedActions(10, offset);
      }
      if (role === 'sales') {
        archivedActions = await mainProtectedApi.getSalesArchivedActions(10, offset);
      }
      dispatch(actionsActions.addArchivedActions(archivedActions));
      dispatch(actionsActions.setActionLoaderState(ActionLoaderState.IDLE));
      return;
    }
    const [currentActions, archivedActions, upcomingActions, recurrentActions] = role === 'developer'
      ? await Promise.all([
        mainProtectedApi.getTeamActions('current'),
        mainProtectedApi.getTeamArchivedActions(10, 0),
        mainProtectedApi.getTeamActions('future'),
        mainProtectedApi.getTeamActions('recurrent'),
      ]) : await Promise.all([
        role === 'sales' ? mainProtectedApi.getSalesActions('current') : mainProtectedApi.getActionsByType('current'),
        role === 'sales' ? mainProtectedApi.getSalesArchivedActions(10, 0) : mainProtectedApi.getArchivedActions(10, 0),
        role === 'sales' ? mainProtectedApi.getSalesActions('future') : mainProtectedApi.getActionsByType('future'),
        role === 'sales' ? mainProtectedApi.getSalesActions('recurrent') : mainProtectedApi.getActionsByType('recurrent'),
      ]);
    dispatch(actionsActions.setCurrentActions(await currentActions));
    dispatch(actionsActions.addArchivedActions(await archivedActions));
    dispatch(actionsActions.setUpcomingActions(await upcomingActions));
    dispatch(actionsActions.setRecurrentAction(await recurrentActions));
    dispatch(actionsActions.setActionLoaderState(ActionLoaderState.IDLE));
  } catch (e) {
    dispatch(actionsActions.setActionLoaderState(ActionLoaderState.IDLE));
    console.log(e);
  }
};

export const getAction = (id: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const action = await mainProtectedApi.getAction(id);

    dispatch(actionsActions.setAction(action));
  } catch (e) {
    console.log(e);
  }
};

export const setAcrhivedActionsOffset = (value: number): AsyncAction => async (
  dispatch,
) => {
  dispatch(actionsActions.setArchivedActionsOffset(value));
};

export const toggleReminderStatus = (
  id: number,
  status: boolean,
  type: ActionType,
  pageType: 'current' | 'future' | 'archived' | 'recurrent',
  assignId?: number[],
): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    const store = getState();
    // eslint-disable-next-line no-nested-ternary
    const actionType = pageType === 'current' ? 'currentActions' : pageType === 'future' ? 'upcomingActions' : pageType === 'archived' ? 'archivedActions' : 'recurrentActions';
    const updatedActions = store.actionsReducer[actionType]!
      .map((item) => {
        if (item.type !== ActionType.VACATION
          && item.type !== ActionType.SICK_LEAVE
          && item._id === id) {
          const newItem = { ...item };
          newItem.isRead = !item.isRead;
          return newItem;
        }
        return item;
      });
    if (pageType === 'current') {
      dispatch(actionsActions.setCurrentActions(updatedActions));
    } else if (pageType === 'future') {
      dispatch(actionsActions.setUpcomingActions(updatedActions));
    } else if (pageType === 'archived') {
      dispatch(actionsActions.setArchivedActions(updatedActions));
    } else {
      dispatch(actionsActions.setRecurrentAction(updatedActions));
    }

    if (type === ActionType.TEAM) {
      await mainProtectedApi.editReminder({ isRead: !status, assignId }, id, type);
    } else {
      await mainProtectedApi.editReminder({ isRead: !status }, id, type);
    }
  } catch (e) {
    console.log(e);
  }
};

export const toggleStopStatus = (
  id: number,
  status: boolean,
  type: ActionType,
  pageType: 'current' | 'future' | 'archived' | 'recurrent',
  assignId?: number[],
): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    const store = getState();
    // eslint-disable-next-line no-nested-ternary
    const actionType = pageType === 'current' ? 'currentActions' : pageType === 'future' ? 'upcomingActions' : pageType === 'archived' ? 'archivedActions' : 'recurrentActions';
    const updatedActions = store.actionsReducer[actionType]!
      .map((item) => {
        if (item.type !== ActionType.VACATION
          && item.type !== ActionType.SICK_LEAVE
          && item._id === id) {
          const newItem = { ...item };
          newItem.isStopped = !item.isStopped;
          return newItem;
        }
        return item;
      });
    if (pageType === 'current') {
      dispatch(actionsActions.setCurrentActions(updatedActions));
    } else if (pageType === 'future') {
      dispatch(actionsActions.setUpcomingActions(updatedActions));
    } else if (pageType === 'archived') {
      dispatch(actionsActions.setArchivedActions(updatedActions));
    } else {
      dispatch(actionsActions.setRecurrentAction(updatedActions));
    }

    if (type === ActionType.TEAM) {
      await mainProtectedApi.editReminder({
        isStopped: !status,
        assignId,
      }, id, type);
    } else {
      await mainProtectedApi.editReminder({
        isStopped: !status,
      }, id, type);
    }
  } catch (e) {
    console.log(e);
  }
};

export const panic = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(actionsActions.setIsSaveLoading(true));

    dispatch(changeWorkload(5));

    await mainProtectedApi.panic();
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(actionsActions.setIsSaveLoading(false));
  }
};

export const money = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(actionsActions.setIsSaveLoading(true));

    await mainProtectedApi.money();
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(actionsActions.setIsSaveLoading(false));
  }
};

export const cleanActions = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(actionsActions.cleanActions());
  } catch (e) {
    console.log(e);
  }
};
