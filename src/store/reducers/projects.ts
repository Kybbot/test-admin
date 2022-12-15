import { createReducerFunction, ImmerReducer } from 'immer-reducer';

import { User } from '@/store/reducers/user';
import { Vacation } from '@/store/reducers/vacations';

export type Projects = {
  _id : number;
  name : string;
  customers: User[];
  team : Teammate[];
  priority : string,
  startDate : string,
  deadline : string,
  alert : boolean;
  description: string | null;
  isActive: boolean;
  slackChannelName: string;
  vacations: Vacation[];
  projectInfo: {
    deleted: boolean
    hours: string;
    isActive: boolean;
    projectId: number;
    tag: string;
    userId: number;
    _id: number;
    status: string;
  }
}[];

export interface ProjectLight {
  _id : number;
  name : string;
  customerIds : number[];
  team : number[];
  priority : string,
  startDate : string,
  deadline : string,
  alert : boolean;
  description: string | null;
  isActive: boolean;
  slackChannelName: string;
  vacations: Vacation[];
  projectInfo: {
    deleted: boolean
    hours: string;
    isActive: boolean;
    projectId: number;
    tag: string;
    userId: number;
    _id: number;
    status: string;
  }
}

export interface Project {
  _id : number;
  name : string;
  customers: User[];
  team : Teammate[];
  priority : string,
  startDate : string,
  deadline : string,
  alert : boolean;
  description: string | null;
  isActive: boolean;
  slackChannelName: string;
  vacations: Vacation[];
  projectInfo: {
    deleted: boolean
    hours: string;
    isActive: boolean;
    projectId: number;
    tag: string;
    userId: number;
    _id: number;
    status: string;
  }
}

export enum TeammateStatus {
  ACTIVE= 'active',
  INACTIVE = 'inactive',
  SUPPORT = 'support'
}

export interface Teammate {
  user: User;
  userInfo: {
    tag: string;
    _id: string;
    hours: string;
    status: TeammateStatus;
  }
}

export interface SlackChannels {
  id:number,
  name:string,
  is_private: boolean,
}

export interface ProjectsState {
  project: Project | null;
  projects: Projects | null;
  projectsLight: ProjectLight[] | null;
  usersProjects: Project[] | null;
  isSaveLoading: boolean;
  tags: string[] | null;
  hours: string[] | null;
  slackChannels: SlackChannels[] | null;
}

const initialState: ProjectsState = {
  project: null,
  projects: null,
  projectsLight: null,
  usersProjects: null,
  isSaveLoading: false,
  tags: null,
  hours: null,
  slackChannels: null,
};

export class ProjectsReducer extends ImmerReducer<ProjectsState> {
  setProject(project: Project) {
    this.draftState.project = project;
  }

  setProjects(projects: Projects) {
    this.draftState.projects = projects;
  }

  setProjectsLight(projects: ProjectLight[]) {
    this.draftState.projectsLight = projects;
  }

  setUsersProjects(projects: Project[]) {
    this.draftState.usersProjects = projects;
  }

  setTags(tags: string[]) {
    this.draftState.tags = tags;
  }

  setHours(hours: string[]) {
    this.draftState.hours = hours;
  }

  cleanProjects() {
    this.draftState.projects = null;
    this.draftState.usersProjects = null;
  }

  cleanProjectsLight() {
    this.draftState.projectsLight = null;
  }

  cleanProject() {
    this.draftState.project = null;
  }

  setIsSaveLoading(value: boolean) {
    this.draftState.isSaveLoading = value;
  }

  setSlackChannels(slackChannels:SlackChannels[]) {
    this.draftState.slackChannels = slackChannels;
  }
}

export default createReducerFunction(ProjectsReducer, initialState);
