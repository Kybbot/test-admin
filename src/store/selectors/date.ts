import { createSelector, Selector } from 'reselect';

import { DateState } from '@/store/reducers/date';
import { State } from '@/store';
import moment from 'moment';

const selectDateState = (state: State) => state.dateReducer;

export const selectDate: Selector<State, DateState> = createSelector(
  selectDateState,
  (state) => state,
);

export const selectDateTill: Selector<State, number | null> = createSelector(
  selectDateState,
  ({ dateTill }) => dateTill,
);

export const selectDateCalendar: Selector<State, moment.Moment | null> = createSelector(
  selectDateState,
  ({ dateCalendar }) => dateCalendar,
);
