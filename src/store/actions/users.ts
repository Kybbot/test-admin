import { createActionCreators } from 'immer-reducer';
import { goBack, push } from 'connected-react-router';
import { Buffer } from 'buffer';

import { UsersReducer } from '@/store/reducers/users';
import { AddUserBody, EditUserBody } from '@/api/main-protected';

import { userActions } from '@/store/actions/auth';
import { AsyncAction } from './common';

export const usersActions = createActionCreators(UsersReducer);

export type UsersActions =
  | ReturnType<typeof usersActions.setUsers>
  | ReturnType<typeof usersActions.setDeletedUsers>
  | ReturnType<typeof usersActions.setExtendedUsers>
  | ReturnType<typeof usersActions.cleanUser>
  | ReturnType<typeof usersActions.cleanUsers>
  | ReturnType<typeof usersActions.cleanDeletedUsers>
  | ReturnType<typeof usersActions.cleanExtendedUsers>
  | ReturnType<typeof usersActions.setIsSaveLoading>
  | ReturnType<typeof usersActions.setUser>
  | ReturnType<typeof usersActions.setEnglishLevels>
  | ReturnType<typeof usersActions.setUsersTags>
  | ReturnType<typeof usersActions.setFilters>
  | ReturnType<typeof usersActions.setPeopleFilter>
  | ReturnType<typeof usersActions.setWorkloadFilter>
  | ReturnType<typeof usersActions.setIsExtended>
  | ReturnType<typeof usersActions.cleanFilters>
  | ReturnType<typeof usersActions.setRoles>;

export const getUsers = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(usersActions.setIsSaveLoading(true));
    const users = await mainProtectedApi.getUsers();

    dispatch(usersActions.setUsers(users.reverse()));
    dispatch(usersActions.setIsSaveLoading(false));
  } catch (e) {
    dispatch(usersActions.setIsSaveLoading(false));
    // console.log(e);
  }
};

export const getExtendedUsers = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(usersActions.setIsSaveLoading(true));

    const users = await mainProtectedApi.getExtendedUsers();

    dispatch(usersActions.setExtendedUsers(users.sort((a, b) => b.name.localeCompare(a.name))));
  } catch (e) {
    // console.log(e);
  } finally {
    dispatch(usersActions.setIsSaveLoading(false));
  }
};

export const getDeletedUsers = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const users = await mainProtectedApi.getDeletedUsers();

    dispatch(usersActions.setDeletedUsers(users.reverse()));
  } catch (e) {
    // console.log(e);
  }
};

export const getManagers = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const managers = await mainProtectedApi.getManagers();
    const users = await mainProtectedApi.getUsers();

    const res = managers.concat(users.filter(({ role }) => role === 'hr'));

    dispatch(usersActions.setUsers(res));
  } catch (e) {
    // console.log(e);
  }
};

export const getUsersWithManagers = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const [users, managers] = await Promise.all([
      mainProtectedApi.getUsers(),
      mainProtectedApi.getManagers(),
    ]);
    dispatch(usersActions.setUsers(users.concat(managers)));
  } catch (e) {
    // console.log(e);
  }
};

export const getUsersRoles = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const roles = await mainProtectedApi.getUsersRoles();

    dispatch(usersActions.setRoles(roles));
  } catch (e) {
    // console.log(e);
  }
};

export const getEnglishLevels = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const englishLevels = await mainProtectedApi.getEnglishLevels();

    dispatch(usersActions.setEnglishLevels(englishLevels));
  } catch (e) {
    // console.log(e);
  }
};

export const getUser = (id: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const user = await mainProtectedApi.getUser(id);

    dispatch(usersActions.setUser(user));
  } catch (e) {
    // console.log(e.message);
  }
};

export const addUser = (body: AddUserBody): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(usersActions.setIsSaveLoading(true));

    await mainProtectedApi.addUser(body);

    dispatch(goBack());
  } catch (e) {
    // console.log(e);
  } finally {
    dispatch(usersActions.setIsSaveLoading(false));
  }
};

export const editUser = (
  body: EditUserBody,
  id: number,
  isGoBack: boolean = true,
  formData?: FormData,
): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(usersActions.setIsSaveLoading(true));

    if (formData?.has('image')) await mainProtectedApi.editUserPhoto(formData, id);
    await mainProtectedApi.editUser(body, id);

    if (isGoBack) dispatch(goBack());
  } catch (e) {
    // console.log(e);
  } finally {
    dispatch(usersActions.setIsSaveLoading(false));
  }
};

export const changeUserWorkload = (id: number, workload: number): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    dispatch(usersActions.setIsSaveLoading(true));

    const store = getState();

    const updatedUser = { ...store.usersReducer.user! };

    updatedUser.workload = workload;

    dispatch(usersActions.setUser(updatedUser));

    await mainProtectedApi.editUser({ workload }, id);
  } catch (e) {
    // console.log(e);
  } finally {
    dispatch(usersActions.setIsSaveLoading(false));
  }
};

export const changeWorkload = (workload: number): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    dispatch(usersActions.setIsSaveLoading(true));

    const store = getState();

    const updatedUser = { ...store.userReducer.user! };

    updatedUser.workload = workload;

    dispatch(userActions.setMe(updatedUser));

    await mainProtectedApi.editMe({ workload });
  } catch (e) {
    throw new Error('error in changeWorkload');
  } finally {
    dispatch(usersActions.setIsSaveLoading(false));
  }
};

export const editMe = (body: EditUserBody, formData: FormData): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(usersActions.setIsSaveLoading(true));
    if (formData.has('image')) { await mainProtectedApi.editMeImage(formData); }
    const updatedUser = await mainProtectedApi.editMe(body);

    dispatch(userActions.setMe(updatedUser));

    dispatch(push('/me'));
  } catch (e) {
    // console.log(e);
  } finally {
    dispatch(usersActions.setIsSaveLoading(false));
  }
};

export const cleanUser = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(usersActions.cleanUser());
  } catch (e) {
    throw new Error('error in cleanUser');
  }
};

export const cleanUsers = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(usersActions.cleanUsers());
  } catch (e) {
    throw new Error('error in cleanUsers');
  }
};

export const cleanDeletedUsers = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(usersActions.cleanDeletedUsers());
  } catch (e) {
    throw new Error('error in cleanDeletedUsers');
  }
};

export const cleanExtendedUsers = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(usersActions.cleanExtendedUsers());
  } catch (e) {
    throw new Error('error in cleanExtendedUsers');
  }
};

export const getUsersTags = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const tags = await mainProtectedApi.getTags();

    dispatch(usersActions.setUsersTags(tags));
  } catch (e) {
    throw new Error('error in getUsersTags');
  }
};

export const toggleUsersTag = (tag: string, id: number): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    dispatch(usersActions.setIsSaveLoading(true));

    const store = getState();

    const updatedUser = { ...store.usersReducer.user! };

    const tags = updatedUser.tags ? updatedUser.tags : [];

    const updatedTags = tags.includes(tag) ? tags.filter((i: string) => i !== tag) : [...tags, tag];

    updatedUser.tags = updatedTags;

    dispatch(usersActions.setUser(updatedUser));

    await mainProtectedApi.editUser({ tags: updatedTags }, id);
  } catch (e) {
    throw new Error('error in toggleUsersTag');
  } finally {
    dispatch(usersActions.setIsSaveLoading(false));
  }
};

export const toggleUsersTagFromList = (
  tag: string,
  id: number,
): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    dispatch(usersActions.setIsSaveLoading(true));

    const store = getState();

    const user = store.usersReducer.users!.find(({ _id }) => _id === id)!;

    const tags = user.tags || [];

    const updatedTags = tags.includes(tag) ? tags.filter((i: string) => i !== tag) : [...tags, tag];

    await mainProtectedApi.editUser({ tags: updatedTags }, id);

    dispatch(getUsers());
  } catch (e) {
    throw new Error('error in toggleUsersTagFromList');
  } finally {
    dispatch(usersActions.setIsSaveLoading(false));
  }
};

export const setFilters = (filters: string[]): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(usersActions.setFilters(filters));
  } catch (e) {
    throw new Error('error in setFilters');
  }
};

export const setPeopleFilter = (peopleFilters: string): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(usersActions.setPeopleFilter(peopleFilters));
  } catch (e) {
    throw new Error('error in setPeopleFilter');
  }
};

export const setWorkloadFilter = (filter: number): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(usersActions.setWorkloadFilter(filter));
  } catch (e) {
    throw new Error('error in setWorkloadFilter');
  }
};

export const setIsExtended = (isExtended: boolean): AsyncAction => async (
  dispatch,
) => {
  try {
    if (isExtended) {
      dispatch(getExtendedUsers());
    } else {
      dispatch(cleanExtendedUsers());
    }

    dispatch(usersActions.setIsExtended(isExtended));
  } catch (e) {
    throw new Error('error in setIsExtended');
  }
};

export const cleanFilters = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(usersActions.cleanFilters());
  } catch (e) {
    throw new Error('error in cleanFilters');
  }
};

export const goToTelegram = (): AsyncAction => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState();
    const { user } = state.userReducer;
    const hash = Buffer.from(user!._id.toString()).toString('base64');
    window.open(`https://telegram.me/lambda_admin_bot?start=${hash}`, '_blank')!.focus();
  } catch (e) {
    throw new Error('error in goToTelegram');
  }
};

export const goToSlack = (projectId:number): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    const { link } = await mainProtectedApi.connectSlack(projectId);
    window.open(link);
  } catch (e) {
    throw new Error('error in slack');
  }
};

export const deleteUser = (id: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    await mainProtectedApi.deleteUser(id);

    dispatch(goBack());
  } catch (e) {
    throw new Error('error in deleteUser');
  }
};

export const restoreUser = (id: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    await mainProtectedApi.editUser({ deleted: false }, id);

    dispatch(goBack());
  } catch (e) {
    throw new Error('error in restoreUser');
  }
};
