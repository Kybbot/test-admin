import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import { Customer } from '@/store/reducers/customers';
import { Project } from '@/store/reducers/projects';
import { User } from '@/store/reducers/user';

export type UserSearch = {
  type: 'user';
  content: User;
};

export type ProjectSearch = {
  type: 'project';
  content: Project;
};

export type CustomerSearch = {
  type: 'customer';
  content: Customer;
};

export type LinkSearch = {
  type: 'link';
  content: {
    name: string;
    link: string;
    _id: string;
  };
};

export type SearchItem = UserSearch
| ProjectSearch
| CustomerSearch
| LinkSearch;

export interface SearchState {
  items: SearchItem[];
  isSearchActive: boolean;
  isLoading: boolean;
}

const initialState: SearchState = {
  items: [],
  isLoading: false,
  isSearchActive: false,
};

export class SearchReducer extends ImmerReducer<SearchState> {
  setItems(items: SearchItem[]) {
    this.draftState.items = items;
  }

  setIsLoading(isLoading: boolean) {
    this.draftState.isLoading = isLoading;
  }

  setIsSearchActive(isSearchActive: boolean) {
    this.draftState.isSearchActive = isSearchActive;
  }

  cleanSearch() {
    this.draftState.items = [];
    this.draftState.isLoading = false;
  }
}

export default createReducerFunction(SearchReducer, initialState);
