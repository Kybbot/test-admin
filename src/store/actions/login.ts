import { createActionCreators } from 'immer-reducer';
import { push } from 'connected-react-router';

import TokensLocalStorage from '@/utils/local-storage/TokensLocalStorage';

import { LoginReducer } from '@/store/reducers/auth';
import { ChangePasswordBody } from '@/api/main-protected';

import { changeLanguageLocal } from '@/store/actions/language';
import { AsyncAction } from './common';
import { userActions } from './auth';

export const loginActions = createActionCreators(LoginReducer);

export type LoginActions =
  | ReturnType<typeof loginActions.setIsPending>
  | ReturnType<typeof loginActions.setIsResolved>
  | ReturnType<typeof loginActions.setIsSaveLoading>
  | ReturnType<typeof loginActions.setIsChangePasswordRejected>
  | ReturnType<typeof loginActions.setIsRejected>
  | ReturnType<typeof loginActions.setIsAvailable>;

export const login = (data: {email: string, password: string}, path?: string): AsyncAction => async (
  dispatch,
  _,
  { mainApi },
) => {
  try {
    dispatch(loginActions.setIsPending());

    const storage = TokensLocalStorage.getInstance();

    const response = await mainApi.login(data);
    const { accessToken, refreshToken } = response;

    storage.setAccessToken(accessToken);
    storage.setRefreshToken(refreshToken);

    dispatch(userActions.setIsLoggedIn(true));

    dispatch(getMe(false, path));
  } catch (e) {
    dispatch(loginActions.setIsRejected());
  }
};

export const getMe = (isGlobal: boolean = false, path = '/me'): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    const storage = TokensLocalStorage.getInstance();

    const accessToken = storage.getAccessToken();

    if (!accessToken) {
      dispatch(loginActions.setIsRejected());
      return;
    }

    const user = await mainProtectedApi.getMe();

    const { role } = user;

    if (user.language) dispatch(changeLanguageLocal(user.language));

    dispatch(userActions.setRole(role));
    dispatch(userActions.setMe(user));
    dispatch(loginActions.setIsResolved());
    dispatch(loginActions.setIsAvailable(true));
    if (!isGlobal) dispatch(push(path));
  } catch (e) {
    console.log(e);
    dispatch(loginActions.setIsRejected());
    dispatch(loginActions.setIsAvailable(false));
  }
};

export const changePassword = (body: ChangePasswordBody): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(loginActions.setIsSaveLoading(true));

    await mainProtectedApi.changePassword(body);

    dispatch(push('/me'));
  } catch (e) {
    dispatch(loginActions.setIsChangePasswordRejected());
  } finally {
    dispatch(loginActions.setIsSaveLoading(false));
  }
};

export const logout = (): AsyncAction => async (dispatch) => {
  dispatch(userActions.setIsLoggedIn(false));
  dispatch(loginActions.setIsRejected());
  const storage = TokensLocalStorage.getInstance();
  storage.clear();

  dispatch(push('/login'));
};
