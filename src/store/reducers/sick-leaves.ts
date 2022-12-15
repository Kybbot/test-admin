import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface SickLeave {
  userId: number,
  date: string,
  comment: string,
  deleted: boolean,
  isViewed: boolean,
  _id: number,
}

export interface CombinedSickLeaves {
  _id: number;
  startDate: string;
  endDate: string;
  sickLeaves: SickLeave[],
  userId: number,
}

export interface SickLeavesState {
  sickLeaves: SickLeave[] | null,
  combinedSickLeaves: CombinedSickLeaves[] | null;
  personalSickLeaves: SickLeave[] | null,
  combinedPersonalSickLeaves: CombinedSickLeaves[] | null;
}

const initialState: SickLeavesState = {
  sickLeaves: null,
  combinedSickLeaves: null,
  personalSickLeaves: null,
  combinedPersonalSickLeaves: null,
};

export class SickLeavesReducer extends ImmerReducer<SickLeavesState> {
  setSickLeaves(sickLeaves: SickLeave[], combinedSickLeaves: CombinedSickLeaves[]) {
    this.draftState.sickLeaves = sickLeaves;
    this.draftState.combinedSickLeaves = combinedSickLeaves;
  }

  setPersonalSickLeaves(sickLeaves: SickLeave[], combinedSickLeaves: CombinedSickLeaves[]) {
    this.draftState.personalSickLeaves = sickLeaves;
    this.draftState.combinedPersonalSickLeaves = combinedSickLeaves;
  }

  cleanSickLeaves() {
    this.draftState = initialState;
  }
}

export default createReducerFunction(SickLeavesReducer, initialState);
