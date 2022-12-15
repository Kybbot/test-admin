import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface LoginState {
  isPending: boolean;
  isResolved: boolean;
  isRejected: boolean;
  isAvailable: boolean;
  isSaveLoading: boolean;
  isChangePasswordRejected: boolean
}

const initialState: LoginState = {
  isPending: true,
  isResolved: true,
  isRejected: false,
  isAvailable: true,
  isSaveLoading: false,
  isChangePasswordRejected: false,
};

export class LoginReducer extends ImmerReducer<LoginState> {
  setIsPending() {
    this.draftState.isPending = true;
    this.draftState.isResolved = false;
    this.draftState.isRejected = false;
  }

  setIsResolved() {
    this.draftState.isPending = false;
    this.draftState.isResolved = true;
  }

  setIsRejected() {
    this.draftState.isPending = false;
    this.draftState.isRejected = true;
    this.draftState.isResolved = false;
  }

  setIsAvailable(available: boolean) {
    this.draftState.isAvailable = available;
  }

  setIsSaveLoading(value: boolean) {
    this.draftState.isSaveLoading = value;
  }

  setIsChangePasswordRejected() {
    this.draftState.isSaveLoading = false;
    this.draftState.isChangePasswordRejected = true;
  }
}

export default createReducerFunction(LoginReducer, initialState);
