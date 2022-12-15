import { createActionCreators } from 'immer-reducer';

import { CombinedSickLeaves, SickLeave, SickLeavesReducer } from '@/store/reducers/sick-leaves';
import { getActions } from '@/store/actions/actions';
import { getSickLeaves } from '@/store/actions/profile';
import { combineDays } from '@/utils/combineDays';
import { AsyncAction } from './common';

export const sickLeavesActions = createActionCreators(SickLeavesReducer);

export type SickLeavesActions =
  | ReturnType<typeof sickLeavesActions.setSickLeaves>
  | ReturnType<typeof sickLeavesActions.setPersonalSickLeaves>
  | ReturnType<typeof sickLeavesActions.cleanSickLeaves>;

export const combineSickLeaves = (sickLeaves: SickLeave[]) => {
  if (!sickLeaves.length) return [];
  const objectWithUsers: {
    [key: string]: {
      sickleaves: SickLeave[];
      combinedSL: SickLeave[][];
    };
  } = {};

  sickLeaves.forEach((sickLeave) => {
    if (!objectWithUsers[sickLeave.userId]) {
      objectWithUsers[sickLeave.userId] = {
        sickleaves: [sickLeave],
        combinedSL: [],
      };
      return;
    }
    objectWithUsers[sickLeave.userId].sickleaves.push(sickLeave);
  });

  Object.keys(objectWithUsers).forEach((key) => {
    objectWithUsers[key].sickleaves = objectWithUsers[key].sickleaves.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    objectWithUsers[key].combinedSL = combineDays(
      objectWithUsers[key].sickleaves,
      (data) => data.date,
    ).newDates;
  });

  const combinedSickLeaves: CombinedSickLeaves[] = [];
  Object.keys(objectWithUsers).forEach((key) => {
    objectWithUsers[key].combinedSL.forEach((combinedArray) => {
      const length = combinedArray.length - 1;
      combinedSickLeaves.push({
        _id: combinedArray[0]._id,
        startDate: combinedArray[0].date,
        endDate: combinedArray[length].date,
        sickLeaves: [...combinedArray],
        userId: +key,
      });
    });
  });
  combinedSickLeaves
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  return combinedSickLeaves;
};

export const getAllSickLeaves = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const sickLeaves = await mainProtectedApi.getAllSickLeaves();

    const combinedSickLeaves = combineSickLeaves(sickLeaves);

    dispatch(sickLeavesActions.setSickLeaves(sickLeaves, combinedSickLeaves));
  } catch (e) {
    console.log(e);
  }
};

export const getUserSickLeaves = (userId: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const sickLeaves = await mainProtectedApi.getUserSickLeaves(userId);

    const combinedSickLeaves = combineSickLeaves(sickLeaves);

    dispatch(sickLeavesActions.setSickLeaves(sickLeaves, combinedSickLeaves));
  } catch (e) {
    console.log(e);
  }
};

export const getPersonalSickLeaves = (): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    const sickLeaves = await mainProtectedApi.getPersonalSickLeaves();

    const combinedSickLeaves = combineSickLeaves(sickLeaves);

    dispatch(sickLeavesActions.setPersonalSickLeaves(sickLeaves, combinedSickLeaves));
  } catch (e) {
    console.log(e);
  }
};

export const viewSickLeave = (sickLeaveId: number): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    await mainProtectedApi.viewSickLeave(sickLeaveId);
    dispatch(getActions());
  } catch (e) {
    console.log(e);
  }
};

export const takeSickLeave = (comment: string): AsyncAction => async (
  dispatch,
  _,
  { mainProtectedApi },
) => {
  try {
    await mainProtectedApi.takeSickLeave({ comment });

    dispatch(getSickLeaves());
  } catch (e) {
    console.log(e);
  }
};

export const cleanSickLeaves = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(sickLeavesActions.cleanSickLeaves());
  } catch (e) {
    console.log(e);
  }
};
