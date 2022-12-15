import { createActionCreators } from 'immer-reducer';

import { SearchReducer } from '@/store/reducers/search';
import { AsyncAction } from '@/store/actions/common';

export const searchActions = createActionCreators(SearchReducer);

export type SearchActions =
  | ReturnType<typeof searchActions.setItems>
  | ReturnType<typeof searchActions.setIsLoading>
  | ReturnType<typeof searchActions.setIsSearchActive>
  | ReturnType<typeof searchActions.cleanSearch>;

export const search = (body: { filter: string }): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(searchActions.setIsLoading(true));

    const items = await mainProtectedApi.search(body);

    dispatch(searchActions.setItems(items));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(searchActions.setIsLoading(false));
  }
};

export const searchTeam = (body: { filter: string }): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(searchActions.setIsLoading(true));

    const items = await mainProtectedApi.searchTeam(body);

    dispatch(searchActions.setItems(items));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(searchActions.setIsLoading(false));
  }
};

export const setSearchStatus = (status: boolean): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(searchActions.setIsSearchActive(status));
  } catch (e) {
    console.log(e);
  }
};

export const cleanSearch = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(searchActions.cleanSearch());
  } catch (e) {
    console.log(e);
  }
};
