import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface Customer {
  name: string;
  email: string[],
  photo: string,
  smallPhoto: string,
  birthday: string,
  _id: number;
  linkedInProfile: string;
}

export interface CustomersState {
  customers: Customer[] | null;
  customer: Customer | null;
  isSaveLoading: boolean;
}

const initialState: CustomersState = {
  customers: null,
  customer: null,
  isSaveLoading: false,
};

export class CustomersReducer extends ImmerReducer<CustomersState> {
  setCustomers(customers: Customer[]) {
    this.draftState.customers = customers;
  }

  setCustomer(customer: Customer) {
    this.draftState.customer = customer;
  }

  cleanCustomer() {
    this.draftState.customer = null;
  }

  cleanCustomers() {
    this.draftState.customers = null;
  }

  setIsSaveLoading(value: boolean) {
    this.draftState.isSaveLoading = value;
  }
}

export default createReducerFunction(CustomersReducer, initialState);
