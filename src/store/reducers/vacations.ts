import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import { CombinedVacations } from '@/store/actions/vacations';
import { SickLeave } from './sick-leaves';

export interface Vacation {
  _id: number,
  userId: number,
  status: VacationStatus,
  startDate: string,
  endDate: string,
  comment: string,
  usedDays: number,
  availableDays: number,
  projects: number[],
  vacation: CombinedVacations[]
}

export interface VacationsCalendar {
  vacations: CalendarVacation[];
  sickLeaves: SickLeave[];
  holidays: Holiday[];
}

export interface CalendarVacation {
  _id: number;
  userId: number;
  status: VacationStatus;
  startDate: string;
  endDate: string;
  comment: string;
  projects: number[];
  usedDays: number
}

export interface VacationInfo {
  availableDays: number,
  usedDays: number,
  totalDays: number,
}

export interface Overtime {
  _id: number,
  userId: number,
  date: string,
  comment?: string
}

export interface Holiday {
  name: string,
  date: number,
}

export enum VacationStatus {
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PENDING = 'pending'
}

export interface VacationsState {
  vacations: Vacation[] | null;
  pendingVacations: Vacation[] | null;
  approvedVacations: Vacation[] | null;
  recentVacations: Vacation[] | null;
  currentVacations: Vacation[] | null;
  futureVacations: Vacation[] | null;
  isSaveLoading: boolean;
  userOvertimes: Overtime[] | null;
  endDate: number | null;
  startDate: number | null;
  vacationInfo: VacationInfo | null;
  holidays: Holiday[] | null;
  combinedPendingVacations: CombinedVacations[] | null;
  combinedRecentVacations: CombinedVacations[] | null;
}

const initialState: VacationsState = {
  vacations: null,
  pendingVacations: null,
  approvedVacations: null,
  recentVacations: null,
  currentVacations: null,
  futureVacations: null,
  isSaveLoading: false,
  userOvertimes: null,
  endDate: null,
  startDate: null,
  vacationInfo: null,
  holidays: null,
  combinedPendingVacations: null,
  combinedRecentVacations: null,
};

export class VacationsReducer extends ImmerReducer<VacationsState> {
  setVacations(vacations: Vacation[]) {
    this.draftState.vacations = vacations;
  }

  setVacationInfo(vacationInfo: VacationInfo) {
    this.draftState.vacationInfo = vacationInfo;
  }

  setPendingVacations(pendingVacations: Vacation[], combinedPendingVacations:CombinedVacations[]) {
    this.draftState.pendingVacations = pendingVacations;
    this.draftState.combinedPendingVacations = combinedPendingVacations;
  }

  setApprovedVacations(approvedVacations: Vacation[]) {
    this.draftState.approvedVacations = approvedVacations;
  }

  setRecentVacations(recentVacations: Vacation[], combinedRecentVacations:CombinedVacations[]) {
    this.draftState.recentVacations = recentVacations;
    this.draftState.combinedRecentVacations = combinedRecentVacations;
  }

  setCurrentVacations(currentVacations: Vacation[]) {
    this.draftState.currentVacations = currentVacations;
  }

  setFutureVacations(futureVacations: Vacation[]) {
    this.draftState.futureVacations = futureVacations;
  }

  setStartDate(startDate: number) {
    this.draftState.startDate = startDate;
  }

  setHolidays(holidays: Holiday[]) {
    this.draftState.holidays = holidays;
  }

  cleanVacations() {
    this.draftState.vacations = null;
    this.draftState.pendingVacations = null;
    this.draftState.approvedVacations = null;
    this.draftState.recentVacations = null;
    this.draftState.futureVacations = null;
    this.draftState.currentVacations = null;
  }

  setIsSaveLoading(value: boolean) {
    this.draftState.isSaveLoading = value;
  }

  setUserOvertimes(userOvertimes: Overtime[]) {
    this.draftState.userOvertimes = userOvertimes;
  }

  cleanOvertimes() {
    this.draftState.userOvertimes = null;
  }

  cleanVacationInfo() {
    this.draftState.vacationInfo = null;
  }
}

export default createReducerFunction(VacationsReducer, initialState);
