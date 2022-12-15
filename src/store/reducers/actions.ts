import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import { Vacation } from '@/store/reducers/vacations';
import { SickLeave } from '@/store/reducers/sick-leaves';

export type ReminderAction = {
  type: ActionType.ADMIN;
  customerIds: number[];
  projectIds: number[];
  userIds: number[];
  _id: number;
  isStopped: boolean;
  date: string;
  message: string;
  isRead: boolean;
  assign: number[];
  repeat: string;
};

export type SalesReminderAction = {
  type: ActionType.SALES;
  customerIds: number[];
  projectIds: number[];
  userIds: number[];
  _id: number;
  isStopped: boolean;
  date: string;
  message: string;
  isRead: boolean;
  assign: number[];
  repeat: string;
};

export type DeveloperReminderAction = {
  type: ActionType.TEAM;
  customerIds: number[];
  projectIds: number[];
  userIds: number[];
  _id: number;
  isStopped: boolean;
  date: string;
  message: string;
  isRead: boolean;
  assign: number[];
  repeat: string;
};

export type VacationRequestAction = {
  type: ActionType.VACATION;
  vacation: Vacation;
};

export type SickLeaveAction = {
  type: ActionType.SICK_LEAVE;
  sickLeave: SickLeave;
};

export type Action = ReminderAction
| VacationRequestAction
| SalesReminderAction
| DeveloperReminderAction
| SickLeaveAction;

export enum ActionLoaderState {
  LOADING = 'LOADING',
  IDLE = 'IDLE'
}

export interface ActionsState {
  currentActions: Action[] | null;
  recurrentActions: Action[] | null;
  upcomingActions: Action[] | null;
  archivedActions: Action[] | null;
  action: Action | null;
  isSaveLoading: boolean;
  archivedActionsOffset: number;
  loaderState: ActionLoaderState;
}

const initialState: ActionsState = {
  currentActions: null,
  recurrentActions: null,
  upcomingActions: null,
  archivedActions: null,
  action: null,
  isSaveLoading: false,
  archivedActionsOffset: 0,
  loaderState: ActionLoaderState.IDLE,
};

export enum RepeatValue {
  NEVER = 'never',
  EVERY_DAY = 'every day',
  EVERY_WEEK = 'every week',
  EVERY_TWO_WEEKS = 'every two weeks',
  EVERY_MONTH = 'every month'
}

export enum ActionType {
  VACATION = 'vacation',
  TEAM = 'team',
  SALES = 'sales',
  ADMIN = 'admin',
  SICK_LEAVE = 'sick-leave'
}

export class ActionsReducer extends ImmerReducer<ActionsState> {
  setRecurrentAction(action: Action[]) {
    this.draftState.recurrentActions = action;
  }

  setCurrentActions(actions: Action[]) {
    this.draftState.currentActions = actions;
  }

  setUpcomingActions(actions: Action[]) {
    this.draftState.upcomingActions = actions;
  }

  addArchivedActions(actions: Action[]) {
    if (this.draftState.archivedActions) {
      this.draftState.archivedActions = [...this.draftState.archivedActions, ...actions];
    } else {
      this.draftState.archivedActions = actions;
    }
  }

  setArchivedActions(actions: Action[]) {
    this.draftState.archivedActions = actions;
  }

  setArchivedActionsOffset(value: number) {
    this.draftState.archivedActionsOffset = value;
  }

  setAction(action: Action) {
    this.draftState.action = action;
  }

  setIsSaveLoading(value: boolean) {
    this.draftState.isSaveLoading = value;
  }

  setActionLoaderState(state: ActionLoaderState) {
    this.draftState.loaderState = state;
  }

  cleanActions() {
    this.draftState = initialState;
  }
}

export default createReducerFunction(ActionsReducer, initialState);
