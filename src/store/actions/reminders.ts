import { createActionCreators } from 'immer-reducer';
import { push } from 'connected-react-router';

import { RemindersReducer } from '@/store/reducers/reminders';
import { CreateReminderBody, EditReminderBody } from '@/api/main-protected';
import { ActionType } from '@/store/reducers/actions';
import { getActions } from '@/store/actions/actions';
import { AsyncAction } from './common';

export const remindersActions = createActionCreators(RemindersReducer);

export type RemindersActions =
  | ReturnType<typeof remindersActions.setIsSaveLoading>;

export const createReminder = (body: CreateReminderBody): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(remindersActions.setIsSaveLoading(true));

    await mainProtectedApi.createReminder(body);

    dispatch(push('/actions/id'));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(remindersActions.setIsSaveLoading(false));
  }
};

export const createSalesReminder = (body: CreateReminderBody): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(remindersActions.setIsSaveLoading(true));

    await mainProtectedApi.createSalesReminder(body);

    dispatch(push('/sales-actions'));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(remindersActions.setIsSaveLoading(false));
  }
};

export const createTeamReminder = (body: CreateReminderBody): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(remindersActions.setIsSaveLoading(true));

    await mainProtectedApi.createTeamReminder(body);

    dispatch(push('/team-actions'));

    dispatch(getActions('developer'));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(remindersActions.setIsSaveLoading(false));
  }
};

export const editReminder = (
  body: EditReminderBody,
  id: number,
  type: ActionType,
): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(remindersActions.setIsSaveLoading(true));

    await mainProtectedApi.editReminder(body, id, type);
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(remindersActions.setIsSaveLoading(false));
  }
};
