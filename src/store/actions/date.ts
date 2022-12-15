import { createActionCreators } from 'immer-reducer';

import { DateReducer } from '@/store/reducers/date';
import { AsyncAction } from '@/store/actions/common';
import moment from 'moment';

export const dateActions = createActionCreators(DateReducer);

export type DateActions =
  | ReturnType<typeof dateActions.setDate>
  | ReturnType<typeof dateActions.setDateFrom>
  | ReturnType<typeof dateActions.setDateTill>
  | ReturnType<typeof dateActions.cleanDate>
  | ReturnType<typeof dateActions.setDateCalendar>
  | ReturnType<typeof dateActions.clearDateCalendar>;

export const DateCalendar = (date: moment.Moment | null): AsyncAction => async (
  dispatch,
  _,
) => {
  try {
    if (date) {
      dispatch(dateActions.setDateCalendar(date));
    }
  } catch (e) {
    console.log(e);
  }
};

export const clearDateCalendar = (): AsyncAction => async (
  dispatch,
  _,
) => {
  try {
    dispatch(dateActions.clearDateCalendar());
  } catch (e) {
    console.log(e);
  }
};
