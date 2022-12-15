import { createActionCreators } from 'immer-reducer';

import { ProfileReducer } from '@/store/reducers/profile';
import { AsyncAction } from '@/store/actions/common';
import moment from 'moment';
import { combineSickLeaves, sickLeavesActions } from '@/store/actions/sick-leaves';
import { combineCalendarVacations, combineVacations, vacationsActions } from '@/store/actions/vacations';

export const profileActions = createActionCreators(ProfileReducer);

export type ProfileActions =
  | ReturnType<typeof profileActions.setProjects>
  | ReturnType<typeof profileActions.setVacations>
  | ReturnType<typeof profileActions.setInventory>
  | ReturnType<typeof profileActions.setSickLeaves>
  | ReturnType<typeof profileActions.setVacationsCalendar>
  | ReturnType<typeof profileActions.clearCalendarVacations>;

export const getMyProject = (): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    const { _id: userId } = getState().userReducer.user!;
    const projects = await mainProtectedApi.getUserProjects(userId);

    dispatch(profileActions.setProjects(projects));
  } catch (e) {
    console.log(e);
  }
};

export const getVacations = (): AsyncAction => async (
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

    const combinedVacations = combineVacations(vacations);
    dispatch(profileActions.setVacations(vacations, combinedVacations));
  } catch (e) {
    console.log(e);
  }
};

export const getVacationsCalendar = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const calendarInfo = await mainProtectedApi.getVacationsCalendar();
    const { vacations, holidays, sickLeaves } = calendarInfo;
    vacations.sort((a, b) => moment(a.startDate).valueOf() - moment(b.startDate).valueOf());
    const combinedVacations = combineCalendarVacations(vacations);
    const combinedSickLeave = combineSickLeaves(sickLeaves);
    dispatch(vacationsActions.setHolidays(holidays));
    dispatch(profileActions.setVacationsCalendar(vacations, combinedVacations));
    dispatch(sickLeavesActions.setSickLeaves(sickLeaves, combinedSickLeave));
  } catch (e) {
    console.log(e);
  }
};

export const getAllVacations = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const vacations = await mainProtectedApi.getAllVacations();
    vacations.sort((a, b) => moment(a.startDate).valueOf() - moment(b.startDate).valueOf());
    const combinedVacations = combineVacations(vacations);
    dispatch(profileActions.setVacations(vacations, combinedVacations));
  } catch (e) {
    console.log(e);
  }
};

export const getSickLeaves = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const sickLeaves = await mainProtectedApi.getAllSickLeaves();

    const combinedSickLeave = combineSickLeaves(sickLeaves);

    dispatch(profileActions.setSickLeaves(sickLeaves, combinedSickLeave));
  } catch (e) {
    console.log(e);
  }
};

export const getMyInventory = (): AsyncAction => async (
  dispatch,
  getState,
  { mainProtectedApi },
) => {
  try {
    const { _id: userId } = getState().userReducer.user!;
    const inventory = await mainProtectedApi.getUsersInventory(userId);

    dispatch(profileActions.setInventory(inventory));
  } catch (e) {
    console.log(e);
  }
};

export const clearCalendarVacations = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(profileActions.clearCalendarVacations());
  } catch (e) {
    console.log(e);
  }
};
