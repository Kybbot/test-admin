import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface LanguageState {
  ln: LANGUAGES;
  isSaveLoading: boolean;
}

export enum LANGUAGES {
  EN = 'EN',
  RU = 'RU',
  UA = 'UA'
}

const initialState: LanguageState = {
  isSaveLoading: false,
  ln: LANGUAGES.EN,
};

export class LanguageReducer extends ImmerReducer<LanguageState> {
  setLn(ln: LANGUAGES) {
    const lnToSet = Object.values(LANGUAGES).includes(ln) ? ln : LANGUAGES.EN;

    this.draftState.ln = lnToSet;
  }

  setIsSaveLoading(value: boolean) {
    this.draftState.isSaveLoading = value;
  }
}

export default createReducerFunction(LanguageReducer, initialState);
