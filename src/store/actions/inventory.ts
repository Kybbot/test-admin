import { createActionCreators } from 'immer-reducer';

import { InventoryReducer } from '@/store/reducers/inventory';

import { CreateInventoryItemBody, CreatePersonalItemBody, EditInventoryItemBody } from '@/api/main-protected';
import { AsyncAction } from './common';

export const inventoryActions = createActionCreators(InventoryReducer);

export type InventoryActions =
  | ReturnType<typeof inventoryActions.setItems>
  | ReturnType<typeof inventoryActions.setUsersItems>
  | ReturnType<typeof inventoryActions.setItemHistoryUsers>
  | ReturnType<typeof inventoryActions.cleanInventory>
  | ReturnType<typeof inventoryActions.setParameters>
  | ReturnType<typeof inventoryActions.setIsSaveLoading>
  | ReturnType<typeof inventoryActions.setUsersItem>;

export const getInventoryItems = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const items = await mainProtectedApi.getInventoryItems();

    dispatch(inventoryActions.setItems(items.reverse()));
  } catch (e) {
    console.log(e);
  }
};

export const getUsersInventory = (id: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const items = await mainProtectedApi.getUsersInventory(id);

    dispatch(inventoryActions.setUsersItems(items));
  } catch (e) {
    console.log(e);
  }
};

export const getItemHistory = (id: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const response = await mainProtectedApi.getItemHistory(id);
    dispatch(inventoryActions.setItemHistoryUsers(response));
  } catch (e) {
    console.log(e);
  }
};

export const createInventoryItem = (body: CreateInventoryItemBody): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(inventoryActions.setIsSaveLoading(true));

    await mainProtectedApi.createInventoryItem(body);

    dispatch(getInventoryItems());
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(inventoryActions.setIsSaveLoading(false));
  }
};

export const createPersonalItem = (body: CreatePersonalItemBody): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(inventoryActions.setIsSaveLoading(true));

    await mainProtectedApi.createPersonalItem(body);
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(inventoryActions.setIsSaveLoading(false));
  }
};

export const editInventoryItem = (
  body: EditInventoryItemBody,
  itemId: number,
): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(inventoryActions.setIsSaveLoading(true));

    await mainProtectedApi.editInventoryItem(body, itemId);

    dispatch(getInventoryItems());
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(inventoryActions.setIsSaveLoading(false));
  }
};

export const deleteInventoryItemFromUser = (
  itemId: number,
): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    const state = getState();
    const { user } = state.usersReducer;

    const body = { owner: null };

    await mainProtectedApi.editInventoryItem(body, itemId);

    dispatch(getUsersInventory(user!._id));
  } catch (e) {
    console.log(e);
  }
};

export const getInventoryParams = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const parameters = await mainProtectedApi.getInventoryParams();

    dispatch(inventoryActions.setParameters(parameters));
  } catch (e) {
    console.log(e);
  }
};

export const cleanInventory = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(inventoryActions.cleanInventory());
  } catch (e) {
    console.log(e);
  }
};
