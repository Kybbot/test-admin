import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import Main from '@/api/main';
import MainProtected from '@/api/main-protected';

import { LanguageActions } from './actions/language';
import { UsersActions } from './actions/users';
import { LoginActions } from './actions/login';
import { UserActions } from './actions/auth';
import { ProjectsActions } from './actions/projects';
import { CustomersActions } from './actions/customers';
import { VacationsActions } from './actions/vacations';
import { DateActions } from './actions/date';
import { RemindersActions } from './actions/reminders';
import { ActionsActions } from './actions/actions';
import { InventoryActions } from './actions/inventory';
import { SearchActions } from './actions/search';
import { ErrorsActions } from './actions/errors';
import { AcademyActions } from './actions/academy';
import { SickLeavesActions } from './actions/sick-leaves';
import { ProfileActions } from './actions/profile';

import languageReducer from './reducers/language';
import actionsReducer from './reducers/actions';
import loginReducer from './reducers/auth';
import userReducer from './reducers/user';
import usersReducer from './reducers/users';
import projectsReducer from './reducers/projects';
import customersReducer from './reducers/customers';
import vacationsReducer from './reducers/vacations';
import dateReducer from './reducers/date';
import remindersReducer from './reducers/reminders';
import inventoryReducer from './reducers/inventory';
import searchReducer from './reducers/search';
import errorsReducer from './reducers/errors';
import academyReducer from './reducers/academy';
import sickLeaveReducer from './reducers/sick-leaves';
import profileReducer from './reducers/profile';

export const history = createBrowserHistory();

export const api = {
  mainApi: Main.getInstance(),
  mainProtectedApi: MainProtected.getInstance(),
};

const rootReducer = combineReducers({
  router: connectRouter(history),
  loginReducer,
  userReducer,
  usersReducer,
  projectsReducer,
  customersReducer,
  vacationsReducer,
  dateReducer,
  remindersReducer,
  actionsReducer,
  inventoryReducer,
  languageReducer,
  searchReducer,
  errorsReducer,
  academyReducer,
  sickLeaveReducer,
  profileReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(routerMiddleware(history), thunk.withExtraArgument(api)),
);

export type State = ReturnType<typeof rootReducer>;
export type Actions =
  | LoginActions
  | UserActions
  | UsersActions
  | ProjectsActions
  | CustomersActions
  | VacationsActions
  | DateActions
  | RemindersActions
  | ActionsActions
  | InventoryActions
  | LanguageActions
  | SearchActions
  | ErrorsActions
  | AcademyActions
  | SickLeavesActions
  | ProfileActions;

export default createStore(rootReducer, enhancer);
