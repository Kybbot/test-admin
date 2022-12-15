import { createActionCreators } from 'immer-reducer';
import { LanguageReducer, LANGUAGES } from '@/store/reducers/language';
import LanguageLocalStorage from '@/utils/local-storage/LanguageLocalStorage';
import { AsyncAction } from './common';

const storage = LanguageLocalStorage.getInstance();

export const languageActions = createActionCreators(LanguageReducer);

export type LanguageActions =
  | ReturnType<typeof languageActions.setLn>
  | ReturnType<typeof languageActions.setIsSaveLoading>;

export const detectLanguage = (): AsyncAction => async (dispatch, _) => {
  const localStorageLn = storage.getLn();

  if (localStorageLn) {
    dispatch(languageActions.setLn(localStorageLn));
  }
};

export const changeLanguage = (body:{ language: LANGUAGES }): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(languageActions.setIsSaveLoading(true));

    storage.setLn(body.language);

    await mainProtectedApi.editMe(body);

    dispatch(languageActions.setLn(body.language));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(languageActions.setIsSaveLoading(false));
  }
};

export const changeLanguageLocal = (language: LANGUAGES): AsyncAction => async (
  dispatch,
) => {
  try {
    storage.setLn(language);

    dispatch(languageActions.setLn(language));
  } catch (e) {
    console.log(e);
  }
};

export const resetLoadingStatus = (): AsyncAction => async (dispatch) => {
  dispatch(languageActions.setIsSaveLoading(false));
};
