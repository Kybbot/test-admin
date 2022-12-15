import { createSelector, Selector } from 'reselect';

import { State } from '@/store';
import { SearchItem } from '@/store/reducers/search';

const SearchState = (state: State) => state.searchReducer;

export const selectSearchItems: Selector<State, SearchItem[]> = createSelector(
  SearchState,
  ({ items }) => items,
);

export const selectIsLoading: Selector<State, boolean> = createSelector(
  SearchState,
  ({ isLoading }) => isLoading,
);

export const selectIsSearchActive: Selector<State, boolean> = createSelector(
  SearchState,
  ({ isSearchActive }) => isSearchActive,
);
