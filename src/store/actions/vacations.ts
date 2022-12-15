import { createActionCreators } from 'immer-reducer';
import { goBack } from 'connected-react-router';
import moment from 'moment';

import { CalendarVacation, Vacation, VacationsReducer } from '@/store/reducers/vacations';
import { AddOvertimeBody, RequestVacationBody } from '@/api/main-protected';
import { getActions } from '@/store/actions/actions';
import { combineDays } from '@/utils/combineDays';
import { AsyncAction } from './common';

export const vacationsActions = createActionCreators(VacationsReducer);

export type VacationsActions =
  | ReturnType<typeof vacationsActions.setVacations>
  | ReturnType<typeof vacationsActions.setIsSaveLoading>
  | ReturnType<typeof vacationsActions.setPendingVacations>
  | ReturnType<typeof vacationsActions.setPendingVacations>
  | ReturnType<typeof vacationsActions.setRecentVacations>
  | ReturnType<typeof vacationsActions.setCurrentVacations>
  | ReturnType<typeof vacationsActions.setFutureVacations>
  | ReturnType<typeof vacationsActions.cleanVacations>
  | ReturnType<typeof vacationsActions.setUserOvertimes>
  | ReturnType<typeof vacationsActions.setApprovedVacations>
  | ReturnType<typeof vacationsActions.setVacationInfo>
  | ReturnType<typeof vacationsActions.setHolidays>
  | ReturnType<typeof vacationsActions.cleanOvertimes>
  | ReturnType<typeof vacationsActions.cleanVacationInfo>;

export interface CombinedCalendarVacations {
  _id: number;
  startDate: string;
  endDate: string;
  vacations: CalendarVacation[];
  userId: number;
}

export interface CombinedVacations {
  _id: number;
  startDate: string;
  endDate: string;
  vacations: Vacation[];
  userId: number;
}

export const combineCalendarVacations = (vacationDays: CalendarVacation[]) => {
  if (!vacationDays.length) return [];
  const objectWithUsers: {
    [key: string]: {
      vacations: CalendarVacation[];
      combinedV: CalendarVacation[][];
    };
  } = {};

  vacationDays.forEach((vacation) => {
    if (!objectWithUsers[vacation.userId]) {
      objectWithUsers[vacation.userId] = {
        vacations: [vacation],
        combinedV: [],
      };
      return;
    }
    objectWithUsers[vacation.userId].vacations.push(vacation);
  });

  Object.keys(objectWithUsers).forEach((key) => {
    objectWithUsers[key].vacations = objectWithUsers[key].vacations.sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    );
    objectWithUsers[key].combinedV = combineDays(
      objectWithUsers[key].vacations,
      (data) => data.startDate,
      (data) => data.endDate,
    ).newDates;
  });

  const combinedVacations: CombinedCalendarVacations[] = [];
  Object.keys(objectWithUsers).forEach((key) => {
    objectWithUsers[key].combinedV.forEach((combinedArray) => {
      const length = combinedArray.length - 1;
      combinedVacations.push({
        _id: combinedArray[0]._id,
        startDate: combinedArray[0].startDate,
        endDate: combinedArray[length].endDate,
        vacations: [...combinedArray],
        userId: +key,
      });
    });
  });
  combinedVacations
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  return combinedVacations;
};

export const combineVacations = (vacations: Vacation[]) => {
  if (!vacations.length) return [];

  const combinedVacations: CombinedVacations[] = [
    {
      _id: vacations[0]._id,
      startDate: vacations[0].startDate,
      endDate: vacations[0].endDate,
      vacations: [vacations[0]],
      userId: vacations[0].userId,
    },
  ];
  vacations.slice(1).forEach((vacation) => {
    const lastCombinedVacation = combinedVacations[combinedVacations.length - 1];
    if (
      moment(lastCombinedVacation.startDate).isSame(moment(vacation.startDate), 'month')
      && vacation.userId === lastCombinedVacation.vacations[0].userId
    ) {
      lastCombinedVacation.vacations.push(vacation);
      lastCombinedVacation.endDate = vacation.endDate;
    } else {
      combinedVacations.push({
        _id: vacation._id,
        startDate: vacation.startDate,
        endDate: vacation.endDate,
        vacations: [vacation],
        userId: vacation.userId,
      });
    }
  });
  return combinedVacations;
};

export const getPendingVacations = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const pendingVacations = await mainProtectedApi.getPendingVacations();

    const combinedVacations = combineVacations(pendingVacations);

    dispatch(vacationsActions.setPendingVacations(pendingVacations, combinedVacations));
  } catch (e) {
    // console.log(e);
  }
};

export const getRecentVacations = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const recentVacations = await mainProtectedApi.getRecentVacations();

    const combinedVacations = combineVacations(recentVacations);

    dispatch(vacationsActions.setRecentVacations(recentVacations, combinedVacations));
  } catch (e) {
    // console.log(e);
  }
};

export const getCurrentVacations = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const currentVacations = await mainProtectedApi.getCurrentVacations();

    dispatch(vacationsActions.setCurrentVacations(currentVacations));
  } catch (e) {
    // console.log(e);
  }
};

export const getFutureVacations = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const futureVacations = await mainProtectedApi.getFutureVacations();

    dispatch(vacationsActions.setFutureVacations(futureVacations));
  } catch (e) {
    // console.log(e);
  }
};

export const getHolidays = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const holidays = await mainProtectedApi.getHolidays();

    dispatch(vacationsActions.setHolidays(holidays));
  } catch (e) {
    // console.log(e);
  }
};

export const getVacationsAdmin = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const currentVacations = await mainProtectedApi.getCurrentVacations();
    const futureVacations = await mainProtectedApi.getFutureVacations();
    const recentVacations = await mainProtectedApi.getRecentVacations();

    const vacations = recentVacations.concat(currentVacations).concat(futureVacations);
    vacations.sort((a, b) => moment(a.startDate).valueOf() - moment(b.startDate).valueOf());
    dispatch(vacationsActions.setVacations(vacations));
  } catch (e) {
    console.log(e);
  }
};

export const getApprovedVacations = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const approvedVacations = await mainProtectedApi.getApprovedVacations();

    dispatch(vacationsActions.setApprovedVacations(approvedVacations));
  } catch (e) {
    // console.log(e);
  }
};

export const getUserVacations = (id: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const vacations = await mainProtectedApi.getUserVacations(id);

    dispatch(vacationsActions.setVacations(vacations));
  } catch (e) {
    // console.log(e);
  }
};

export const getUserVacationsInfo = (id: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const vacationInfo = await mainProtectedApi.getUserVacationInfo(id);

    dispatch(vacationsActions.setVacationInfo(vacationInfo));
  } catch (e) {
    // console.log(e);
  }
};

export const approveVacation = (id: number, isAction = false): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(vacationsActions.setIsSaveLoading(true));

    await mainProtectedApi.approveVacation(id);

    if (isAction) {
      dispatch(getActions());
    } else {
      dispatch(getPendingVacations());
      dispatch(getFutureVacations());
      dispatch(getCurrentVacations());
      dispatch(getRecentVacations());
    }
  } catch (e) {
    // console.log(e);
  } finally {
    dispatch(vacationsActions.setIsSaveLoading(false));
  }
};

export const requestVacation = (body: RequestVacationBody): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(vacationsActions.setIsSaveLoading(true));

    await mainProtectedApi.requestVacation(body);

    dispatch(goBack());
  } catch (e) {
    // console.log(e);
  } finally {
    dispatch(vacationsActions.setIsSaveLoading(false));
  }
};

export const rejectVacation = (id: number, isAction = false): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(vacationsActions.setIsSaveLoading(true));

    await mainProtectedApi.rejectVacation(id);

    if (isAction) {
      dispatch(getActions());
    } else {
      dispatch(getPendingVacations());
      dispatch(getFutureVacations());
      dispatch(getCurrentVacations());
      dispatch(getRecentVacations());
    }
  } catch (e) {
    // console.log(e);
  } finally {
    dispatch(vacationsActions.setIsSaveLoading(false));
  }
};

export const deleteVacation = (id: number, isAction = false): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(vacationsActions.setIsSaveLoading(true));
    await mainProtectedApi.deleteVacation(id);

    if (isAction) {
      dispatch(getActions());
    } else {
      dispatch(getPendingVacations());
      dispatch(getFutureVacations());
      dispatch(getCurrentVacations());
      dispatch(getRecentVacations());
    }
  } catch (e) {
    // console.log(e);
  } finally {
    dispatch(vacationsActions.setIsSaveLoading(false));
  }
};

export const cleanVacations = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(vacationsActions.cleanVacations());
  } catch (e) {
    // console.log(e);
  }
};

export const getUserOvertimes = (id: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const overtimes = await mainProtectedApi.getUserOvertimes(id);

    dispatch(vacationsActions.setUserOvertimes(overtimes));
  } catch (e) {
    // console.log(e);
  }
};

export const addUserOvertime = (body: AddOvertimeBody): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    dispatch(vacationsActions.setIsSaveLoading(true));
    await mainProtectedApi.addOvertime(body);

    dispatch(goBack());
  } catch (e) {
    // console.log(e);
  } finally {
    dispatch(vacationsActions.setIsSaveLoading(false));
  }
};

export const cleanOvertimes = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(vacationsActions.cleanOvertimes());
  } catch (e) {
    // console.log(e);
  }
};

export const cleanVacationInfo = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(vacationsActions.cleanVacationInfo());
  } catch (e) {
    // console.log(e);
  }
};
