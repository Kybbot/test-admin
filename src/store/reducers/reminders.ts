import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export enum EntityType {
  USER = 'user',
  PROJECT = 'project',
  CUSTOMER = 'customer'
}

export interface Reminder {
  _id: string,
  entityId: string,
  entityType: EntityType,
  isRead: boolean,
  message: string,
  deleted: boolean,
  notificationDate: number
}

interface RemindersState {
  isSaveLoading: boolean;
}

const initialState: RemindersState = {
  isSaveLoading: false,
};

export class RemindersReducer extends ImmerReducer<RemindersState> {
  setIsSaveLoading(value: boolean) {
    this.draftState.isSaveLoading = value;
  }
}

export default createReducerFunction(RemindersReducer, initialState);
