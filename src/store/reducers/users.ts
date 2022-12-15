import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import { User, UserExtended } from '@/store/reducers/user';

export interface UsersState {
  users: User[] | null;
  deletedUsers: User[] | null;
  extendedUsers: UserExtended[] | null;
  user: User | null;
  isSaveLoading: boolean;
  roles: string[] | null;
  englishLevels: string[] | null;
  grades: string[] | null;
  tags: string[] | null;
  filters: string[];
  peopleFilter: string;
  workloadFilter: number | null;
  isExtended: boolean;
}

const initialState: UsersState = {
  users: null,
  deletedUsers: null,
  extendedUsers: null,
  user: null,
  isSaveLoading: false,
  roles: null,
  englishLevels: null,
  grades: null,
  tags: null,
  filters: [],
  peopleFilter: 'All',
  workloadFilter: null,
  isExtended: false,
};

export class UsersReducer extends ImmerReducer<UsersState> {
  setUsers(users: User[]) {
    this.draftState.users = users;
  }

  setExtendedUsers(extendedUsers: UserExtended[]) {
    this.draftState.extendedUsers = extendedUsers;
  }

  setUser(user: User) {
    this.draftState.user = user;
  }

  setDeletedUsers(users: User[]) {
    this.draftState.deletedUsers = users;
  }

  setRoles(roles: string[]) {
    this.draftState.roles = roles;
  }

  setEnglishLevels(englishLevels: string[]) {
    this.draftState.englishLevels = englishLevels;
  }

  setUsersTags(tags: string[]) {
    this.draftState.tags = tags;
  }

  setFilters(filters: string[]) {
    this.draftState.filters = filters;
  }

  setPeopleFilter(peopleFilter: string) {
    this.draftState.peopleFilter = peopleFilter;
  }

  setWorkloadFilter(filter: number) {
    this.draftState.workloadFilter = filter;
  }

  setIsExtended(isExtended: boolean) {
    this.draftState.isExtended = isExtended;
  }

  cleanFilters() {
    this.draftState.filters = [];
    this.draftState.workloadFilter = null;
  }

  cleanUser() {
    this.draftState.user = null;
  }

  cleanUsers() {
    this.draftState.users = null;
  }

  cleanDeletedUsers() {
    this.draftState.deletedUsers = null;
  }

  cleanExtendedUsers() {
    this.draftState.extendedUsers = null;
    this.draftState.isExtended = false;
    this.draftState.isSaveLoading = false;
  }

  setIsSaveLoading(value: boolean) {
    this.draftState.isSaveLoading = value;
  }
}

export default createReducerFunction(UsersReducer, initialState);
