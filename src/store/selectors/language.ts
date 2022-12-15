import { createSelector, Selector } from 'reselect';
import { State } from '@/store';
import { LANGUAGES } from '@/store/reducers/language';

type LanguagesEnumValues = keyof typeof LANGUAGES;

const LanguageState = (state: State) => state.languageReducer;

export const selectLn: Selector<State, LanguagesEnumValues> = createSelector(
  LanguageState,
  ({ ln }) => ln,
);

export const selectLnForQuery: Selector<State, string> = createSelector(
  LanguageState,
  ({ ln }) => ln.toLowerCase().trim(),
);

export const selectIsSaveLoading: Selector<State, boolean> = createSelector(
  LanguageState,
  ({ isSaveLoading }) => isSaveLoading,
);
