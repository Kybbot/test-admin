import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import { User } from '@/store/reducers/user';

export interface InventoryItem {
  items: Computer[],
  user: User,
}

export interface Computer {
  _id: number,
  model: string,
  photo: string,
  imei: string,
  ram: string,
  memory: string,
  display: string,
  diagonal: string,
  deleted: boolean,
  cpu: string,
  year: string,
  isPersonal: boolean;
  personal?: boolean,
  formerOwners?: User[];
}

export interface Parameters {
  diagonal: string[];
  ram: string[];
  memory: string[];
  processor: string[];
  display: string[];
  model: string[];
}

export interface InventoryState {
  itemHistoryUsers: Computer | null;
  items: InventoryItem[] | null;
  usersItems: Computer[] | null;
  parameters: Parameters | null;
  isSaveLoading: boolean;
  usersItem: Computer | null;
}

const initialState: InventoryState = {
  itemHistoryUsers: null,
  items: null,
  usersItems: null,
  parameters: null,
  isSaveLoading: false,
  usersItem: null,
};

export class InventoryReducer extends ImmerReducer<InventoryState> {
  setItems(items: InventoryItem[]) {
    this.draftState.items = items;
  }

  setUsersItems(usersItems: Computer[]) {
    this.draftState.usersItems = usersItems;
  }

  setUsersItem(usersItem: Computer) {
    this.draftState.usersItem = usersItem;
  }

  setItemHistoryUsers(itemHistoryUsers: Computer | null) {
    this.draftState.itemHistoryUsers = itemHistoryUsers;
  }

  setParameters(parameters: Parameters) {
    this.draftState.parameters = parameters;
  }

  cleanInventory() {
    this.draftState.items = null;
    this.draftState.usersItems = null;
  }

  setIsSaveLoading(value: boolean) {
    this.draftState.isSaveLoading = value;
  }
}

export default createReducerFunction(InventoryReducer, initialState);
