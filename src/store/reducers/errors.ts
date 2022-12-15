import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface ErrorsState {
  message: string | null;
}

const initialState: ErrorsState = {
  message: null,
};

export class ErrorsReducer extends ImmerReducer<ErrorsState> {
  setMessage(message: string) {
    this.draftState.message = message;
  }

  cleanErrors() {
    this.draftState = initialState;
  }
}

export default createReducerFunction(ErrorsReducer, initialState);
