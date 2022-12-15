import { createActionCreators } from 'immer-reducer';

import { ErrorsReducer } from '@/store/reducers/errors';
import { AsyncAction } from '@/store/actions/common';

export const errorsActions = createActionCreators(ErrorsReducer);

export type ErrorsActions =
  | ReturnType<typeof errorsActions.setMessage>
  | ReturnType<typeof errorsActions.cleanErrors>;

export const setErrorMessage = (message: string): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(errorsActions.setMessage(message));
  } catch (e) {
    console.log(e);
  }
};

export const cleanErrors = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(errorsActions.cleanErrors());
  } catch (e) {
    console.log(e);
  }
};
