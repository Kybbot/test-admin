import { createActionCreators } from 'immer-reducer';
import { goBack, push } from 'connected-react-router';

import { ProjectsReducer } from '@/store/reducers/projects';

import { AddProjectBody, EditProjectBody, EditTeammateBody } from '@/api/main-protected';

import { AsyncAction } from './common';

export const projectsActions = createActionCreators(ProjectsReducer);

export type ProjectsActions =
  | ReturnType<typeof projectsActions.setProject>
  | ReturnType<typeof projectsActions.setProjects>
  | ReturnType<typeof projectsActions.setUsersProjects>
  | ReturnType<typeof projectsActions.cleanProject>
  | ReturnType<typeof projectsActions.cleanProjects>
  | ReturnType<typeof projectsActions.setTags>
  | ReturnType<typeof projectsActions.setHours>
  | ReturnType<typeof projectsActions.setIsSaveLoading>
  | ReturnType<typeof projectsActions.setSlackChannels>
  | ReturnType<typeof projectsActions.setProjectsLight>
  | ReturnType<typeof projectsActions.cleanProjectsLight>;

export const getProjects = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const projects = await mainProtectedApi.getProjects();

    dispatch(projectsActions.setProjects(projects));
  } catch (e) {
    console.log(e);
  }
};

export const getProjectsLight = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const projects = await mainProtectedApi.getProjectsLight();
    dispatch(projectsActions.setProjectsLight(projects));
  } catch (e) {
    console.log(e);
  }
};

export const getProjectsArchive = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const projects = await mainProtectedApi.getProjectsArchive();

    dispatch(projectsActions.setProjectsLight(projects));
  } catch (e) {
    console.log(e);
  }
};

export const getUserProjects = (id:number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const projects = await mainProtectedApi.getUserProjects(id);

    dispatch(projectsActions.setUsersProjects(projects));
  } catch (e) {
    console.log(e);
  }
};

export const getCustomerProjects = (id:number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const projects = await mainProtectedApi.getCustomerProjects(id);

    dispatch(projectsActions.setProjects(projects));
  } catch (e) {
    console.log(e);
  }
};

export const getProject = (id: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const project = await mainProtectedApi.getProject(id);

    dispatch(projectsActions.setProject(project));
  } catch (e) {
    console.log(e);
  }
};

export const getSlackChannels = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const response = await mainProtectedApi.getSlackChannels();
    dispatch(projectsActions.setSlackChannels(response));
  } catch (e) {
    console.log(e);
  }
};

export const cleanProject = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(projectsActions.cleanProject());
  } catch (e) {
    console.log(e);
  }
};

export const cleanProjects = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(projectsActions.cleanProjects());
  } catch (e) {
    console.log(e);
  }
};

export const cleanProjectsLight = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(projectsActions.cleanProjectsLight());
  } catch (e) {
    console.log(e);
  }
};

export const addProject = (body: AddProjectBody): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(projectsActions.setIsSaveLoading(true));

    await mainProtectedApi.addProject(body);

    dispatch(push('/projects'));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(projectsActions.setIsSaveLoading(false));
  }
};

export const editProject = (body: EditProjectBody, id: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(projectsActions.setIsSaveLoading(true));

    await mainProtectedApi.editProject(body, id);
    dispatch(getProject(id));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(projectsActions.setIsSaveLoading(false));
    dispatch(goBack());
  }
};

export const disconnectSlack = (id: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(projectsActions.setIsSaveLoading(true));

    await mainProtectedApi.disconnectSlack(id);
    dispatch(getProject(id));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(projectsActions.setIsSaveLoading(false));
  }
};

export const addTeammate = (projectId: number, userId: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(projectsActions.setIsSaveLoading(true));

    await mainProtectedApi.addTeammate(projectId, userId);

    dispatch(getProject(projectId));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(projectsActions.setIsSaveLoading(false));
  }
};

export const deleteTeammate = (projectId: number, userId: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(projectsActions.setIsSaveLoading(true));

    await mainProtectedApi.deleteTeammate(projectId, userId);

    dispatch(getProject(projectId));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(projectsActions.setIsSaveLoading(false));
  }
};

export const addCustomerOnProject = (projectId: number, customerId: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(projectsActions.setIsSaveLoading(true));

    await mainProtectedApi.addCustomerOnProject(projectId, customerId);

    dispatch(getProject(projectId));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(projectsActions.setIsSaveLoading(false));
  }
};

export const deleteCustomerFromProject = (
  projectId: number,
  customerId: number,
): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(projectsActions.setIsSaveLoading(true));

    await mainProtectedApi.deleteCustomerFromProject(projectId, customerId);

    dispatch(getProject(projectId));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(projectsActions.setIsSaveLoading(false));
  }
};

export const editTeammate = (body: EditTeammateBody, bondId: string): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(projectsActions.setIsSaveLoading(true));

    await mainProtectedApi.editTeammate(body, bondId);
    dispatch(getProject(body.projectId));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(projectsActions.setIsSaveLoading(false));
  }
};

export const getProjectsTags = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const tags = await mainProtectedApi.getProjectsTags();

    dispatch(projectsActions.setTags(tags));
  } catch (e) {
    console.log(e);
  }
};

export const getProjectsHours = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const hours = await mainProtectedApi.getProjectsHours();

    dispatch(projectsActions.setHours(hours));
  } catch (e) {
    console.log(e);
  }
};

export const toggleProjectStatus = (id: number, status: boolean): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    if (status) {
      await mainProtectedApi.toArchiveProject(id);
    } else {
      await mainProtectedApi.restoreProject(id);
    }

    dispatch(goBack());
  } catch (e) {
    console.log(e);
  }
};
