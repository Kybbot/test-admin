import { createReducerFunction, ImmerReducer } from 'immer-reducer';

import { CombinedSickLeaves, SickLeave } from '@/store/reducers/sick-leaves';
import { CalendarVacation, Vacation } from '@/store/reducers/vacations';
import { Computer } from '@/store/reducers/inventory';
import { Project } from '@/store/reducers/projects';
import { CombinedCalendarVacations, CombinedVacations } from '@/store/actions/vacations';

interface ProfileState {
  vacations: Vacation[] | null,
  vacationsCalendar: CalendarVacation[] | null,
  sickLeaves: SickLeave[] | null,
  combinedSickLeaves: CombinedSickLeaves[] | null,
  combinedVacations: CombinedVacations[] | null,
  combinedVacationsCalendar: CombinedCalendarVacations[] | null,
  projects: Project[] | null,
  inventory: Computer[] | null,
}

const initialState: ProfileState = {
  vacations: null,
  vacationsCalendar: null,
  sickLeaves: null,
  combinedSickLeaves: null,
  combinedVacations: null,
  combinedVacationsCalendar: null,
  projects: null,
  inventory: null,
};

export class ProfileReducer extends ImmerReducer<ProfileState> {
  setVacations(vacations: Vacation[], combinedVacations:CombinedVacations[]) {
    this.draftState.vacations = vacations;
    this.draftState.combinedVacations = combinedVacations;
  }

  setVacationsCalendar(vacationsCalendar: CalendarVacation[],
    combinedVacations:CombinedCalendarVacations[]) {
    this.draftState.vacationsCalendar = vacationsCalendar;
    this.draftState.combinedVacationsCalendar = combinedVacations;
  }

  setSickLeaves(sickLeaves: SickLeave[], combinedSickLeaves: CombinedSickLeaves[]) {
    this.draftState.sickLeaves = sickLeaves;
    this.draftState.combinedSickLeaves = combinedSickLeaves;
  }

  setProjects(projects: Project[]) {
    this.draftState.projects = projects;
  }

  setInventory(inventory: Computer[]) {
    this.draftState.inventory = inventory;
  }

  clearCalendarVacations() {
    this.draftState.vacationsCalendar = null;
    this.draftState.combinedVacationsCalendar = null;
  }
}

export default createReducerFunction(ProfileReducer, initialState);
