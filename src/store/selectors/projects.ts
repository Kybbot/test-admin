import { createSelector, Selector } from 'reselect';
import {
  Project, ProjectLight, Projects, SlackChannels,
} from '@/store/reducers/projects';
import { State } from '@/store';

const ProjectsState = (state: State) => state.projectsReducer;

export const selectProjects: Selector<State, Projects | null> = createSelector(
  ProjectsState,
  ({ projects }) => projects,
);

export const selectProjectsLight: Selector<State, ProjectLight[] | null> = createSelector(
  ProjectsState,
  ({ projectsLight }) => projectsLight,
);

export const selectUsersProjects: Selector<State, Project[] | null> = createSelector(
  ProjectsState,
  ({ usersProjects }) => usersProjects,
);

export const selectProject: Selector<State, Project | null> = createSelector(
  ProjectsState,
  ({ project }) => project,
);

export const selectProjectsTags: Selector<State, string[] | null> = createSelector(
  ProjectsState,
  ({ tags }) => tags,
);

export const selectProjectsHours: Selector<State, string[] | null> = createSelector(
  ProjectsState,
  ({ hours }) => hours,
);

export const selectIsSaveLoading: Selector<State, boolean> = createSelector(
  ProjectsState,
  ({ isSaveLoading }) => isSaveLoading,
);

export const selectSlackChannels: Selector<State, SlackChannels[] | null> = createSelector(
  ProjectsState,
  ({ slackChannels }) => slackChannels,
);
