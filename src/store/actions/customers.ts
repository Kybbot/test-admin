import { createActionCreators } from 'immer-reducer';
import { goBack, push } from 'connected-react-router';

import { CustomersReducer } from '@/store/reducers/customers';
import { AddCustomerBody } from '@/api/main-protected';

import { AsyncAction } from './common';
// import { useSelector } from 'react-redux';
// import { selectCustomers } from '../selectors/customers';

export const customersActions = createActionCreators(CustomersReducer);

export type CustomersActions =
  | ReturnType<typeof customersActions.setCustomers>
  | ReturnType<typeof customersActions.cleanCustomer>
  | ReturnType<typeof customersActions.cleanCustomers>
  | ReturnType<typeof customersActions.setIsSaveLoading>
  | ReturnType<typeof customersActions.setCustomer>;

export const addCustomer = (body: AddCustomerBody): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(customersActions.setIsSaveLoading(true));

    await mainProtectedApi.addCustomer(body);

    dispatch(push('/customers'));
  } catch (e) {
    // console.log(e);
  } finally {
    dispatch(customersActions.setIsSaveLoading(false));
  }
};

export const addCustomerFromProject = (body: any): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(customersActions.setIsSaveLoading(true));

    await mainProtectedApi.addCustomer(body);
    dispatch(getCustomers());
  } catch (e) {
    // console.log(e);
  } finally {
    dispatch(customersActions.setIsSaveLoading(false));
  }
};

export const editCustomer = (
  body: AddCustomerBody,
  formData: FormData,
  id: number,
): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(customersActions.setIsSaveLoading(true));

    if (formData.has('image')) await mainProtectedApi.editCustomerPhoto(formData, id);
    await mainProtectedApi.editCustomer(body, id);

    dispatch(goBack());
  } catch (e) {
    // console.log(e);
  } finally {
    dispatch(customersActions.setIsSaveLoading(false));
  }
};

export const getCustomers = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const customers = await mainProtectedApi.getCustomers();

    dispatch(customersActions.setCustomers(customers.reverse()));
  } catch (e) {
    // console.log(e);
  }
};

export const getCustomer = (id: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const customer = await mainProtectedApi.getCustomer(id);

    dispatch(customersActions.setCustomer(customer));
  } catch (e) {
    // console.log(e);
  }
};

export const cleanCustomer = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(customersActions.cleanCustomer());
  } catch (e) {
    // console.log(e);
  }
};

export const cleanCustomers = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(customersActions.cleanCustomers());
  } catch (e) {
    // console.log(e);
  }
};
