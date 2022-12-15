import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import moment from 'moment';

export interface DateState {
  date: number | null;
  dateTill: number | null;
  dateFrom: number | null;
  dateCalendar: moment.Moment | null
}

const initialState: DateState = {
  date: null,
  dateTill: null,
  dateFrom: null,
  dateCalendar: null,
};

export class DateReducer extends ImmerReducer<DateState> {
  setDate(date: number) {
    this.draftState.date = date;
  }

  setDateTill(dateTill: number) {
    this.draftState.dateTill = dateTill;
  }

  setDateFrom(dateFrom: number) {
    this.draftState.dateFrom = dateFrom;
  }

  setDateCalendar(dateCalendar: moment.Moment) {
    this.draftState.dateCalendar = dateCalendar;
  }

  clearDateCalendar() {
    this.draftState.dateCalendar = null;
  }

  cleanDate() {
    this.draftState = initialState;
  }
}

export default createReducerFunction(DateReducer, initialState);
