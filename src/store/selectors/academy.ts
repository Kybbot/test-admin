import { createSelector, Selector } from 'reselect';

import { State } from '@/store';
import { Post } from '@/store/reducers/academy';

const AcademyState = (state: State) => state.academyReducer;

export const selectPosts: Selector<State, Post[] | null> = createSelector(
  AcademyState,
  ({ posts }) => posts,
);

export const selectPost: Selector<State, Post | null> = createSelector(
  AcademyState,
  ({ post }) => post,
);

export const selectFilters: Selector<State, string[]> = createSelector(
  AcademyState,
  ({ filters }) => filters,
);

export const selectTags: Selector<State, string[] | null> = createSelector(
  AcademyState,
  ({ tags }) => tags,
);

export const selectIsSaveLoading: Selector<State, boolean> = createSelector(
  AcademyState,
  ({ isSaveLoading }) => isSaveLoading,
);
