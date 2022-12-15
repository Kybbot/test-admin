import { createActionCreators } from 'immer-reducer';
import { goBack } from 'connected-react-router';

import { AcademyReducer } from '@/store/reducers/academy';
import { AsyncAction } from '@/store/actions/common';
import MainProtectedFormData from '@/api/main-protected-formdata';
import { CreateCommentBody } from '@/api/main-protected';

export const academyActions = createActionCreators(AcademyReducer);

export type AcademyActions =
  | ReturnType<typeof academyActions.setPosts>
  | ReturnType<typeof academyActions.setPost>
  | ReturnType<typeof academyActions.setIsSaveLoading>
  | ReturnType<typeof academyActions.cleanAcademy>
  | ReturnType<typeof academyActions.setFilters>
  | ReturnType<typeof academyActions.cleanPost>;

export const getPosts = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const posts = await mainProtectedApi.getPosts();

    dispatch(academyActions.setPosts(posts));
  } catch (e) {
    console.log(e);
  }
};

export const getPost = (id: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const post = await mainProtectedApi.getPost(id);

    dispatch(academyActions.setPost(post));
  } catch (e) {
    console.log(e);
  }
};

export const getAcademyTags = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const tags = await mainProtectedApi.getAcademyTags();

    dispatch(academyActions.setTags(tags));
  } catch (e) {
    console.log(e);
  }
};

export const createPost = (formData: FormData): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(academyActions.setIsSaveLoading(true));

    const api = MainProtectedFormData.getInstance();

    await api.createPost(formData);
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(academyActions.setIsSaveLoading(false));
    dispatch(getPosts());
  }
};

export const editPost = (id: number, formData: FormData): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(academyActions.setIsSaveLoading(true));

    const api = MainProtectedFormData.getInstance();

    await api.editPost(id, formData);
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(academyActions.setIsSaveLoading(false));
  }
};

export const deleteFile = (id: number, path: string): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    await mainProtectedApi.deleteFile(id, path);
  } catch (e) {
    console.log(e);
  }
};

export const deletePost = (id: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    await mainProtectedApi.deletePost(id);

    dispatch(goBack());
  } catch (e) {
    console.log(e);
  }
};

export const createComment = (body: CreateCommentBody): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    await mainProtectedApi.createComment(body);

    dispatch(getPost(body.postId));
  } catch (e) {
    console.log(e);
  }
};

export const editComment = (id: number, body: CreateCommentBody): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    await mainProtectedApi.editComment(id, body);
  } catch (e) {
    console.log(e);
  }
};

export const deleteComment = (id: number, postId: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    await mainProtectedApi.deleteComment(id);

    dispatch(getPost(postId));
  } catch (e) {
    console.log(e);
  }
};

export const setFilters = (filters: string[]): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(academyActions.setFilters(filters));
  } catch (e) {
    console.log(e);
  }
};

export const cleanAcademy = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(academyActions.cleanAcademy());
  } catch (e) {
    console.log(e);
  }
};

export const cleanAcademyPost = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(academyActions.cleanPost());
  } catch (e) {
    console.log(e);
  }
};

export const cleanFilters = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(academyActions.setFilters([]));
  } catch (e) {
    console.log(e);
  }
};
