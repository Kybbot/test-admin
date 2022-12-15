import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import { LANGUAGES } from '@/store/reducers/language';
import { Project } from '@/store/reducers/projects';

export interface User {
  projects: any;
  _id: number;
  name: string;
  userName: string;
  photo: string;
  smallPhoto: string;
  email: string;
  password: string;
  telegramId?: number;
  role: string;
  english: string;
  grade: string;
  workload: number;
  tags?: string[];
  language: LANGUAGES;
  deleted: boolean;
  isOnVacation: boolean;
  hasPersonalInventory: boolean;
  hireDate: string;
  birthday?: string;
  isSick: boolean;
}

export interface UserExtended {
  _id: number;
  name: string;
  userName: string;
  photo: string;
  smallPhoto: string;
  email: string;
  password: string;
  telegramId?: number;
  role: string;
  hireDate: string;
  birthday?: string;
  english: string;
  grade: string;
  workload: number;
  tags?: string[];
  language: LANGUAGES;
  projects: Project[];
  deleted: boolean;
  isOnVacation: boolean;
  isSick: boolean;
  hasPersonalInventory: boolean;
}

export interface UserState {
  isLoggedIn: boolean;
  user: User | null;
  role: string | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  user: null,
  role: null,
};

export class UserReducer extends ImmerReducer<UserState> {
  setIsLoggedIn(isLoggedIn: boolean) {
    this.draftState.isLoggedIn = isLoggedIn;
  }

  setMe(user: User | null) {
    this.draftState.user = user;
  }

  setRole(role: string | null) {
    this.draftState.role = role;
  }
}

export default createReducerFunction(UserReducer, initialState);
