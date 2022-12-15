import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import store from '@/store';

import { getMe } from '@/store/actions/login';
import { detectLanguage } from '@/store/actions/language';

import GlobalContainer from '@/components/GlobalContainer';
import ProtectedRouter from '@/components/ProtectedRouter';
import GlobalSearch from '@/components/GlobalSearch';
import GlobalToast from '@/components/GlobalToast';
import ProtectedRouterAdmin from '@/components/ProtectedRouterAdmin';

import Login from './Login';
import Users from './Users';
import UserDetails from './UserDetails';
import AddUser from './AddUser';
import EditUser from './EditUser';
import Projects from './Projects';
import ProjectsArchive from './ProjectsArchive';
import Me from './Me';
import AddProject from './AddProject';
import Vacations from './Vacations';
import CurrentVacations from './CurrentVacations';
import UserVacations from './UserVacations';
import AddOvertime from './AddOvertime';
import ProjectDetails from './ProjectDetails';
import EditProject from './EditProject';
import Customers from './Customers';
import AddCustomer from './AddCustomer';
import CustomerDetails from './CustomerDetails';
import EditCustomer from './EditCustomer';
import RequestVacation from './RequestVacation';
import EditMe from './EditMe';
import ChangePassword from './ChangePassword';
import Actions from './Actions';
import ActionsArchive from './ActionsArchive';
import ActionsUpcoming from './ActionsUpcoming';
import EditReminder from './EditReminder';
import Inventory from './Inventory';
import ChangeItemUser from './ChangeItemUser';
import ViewItemHistory from './ViewItemHistory';
import AddItemUser from './AddItemUser';
import AddManager from './AddManager';
import Managers from './Managers';
import ChangeLanguage from './ChangeLanguage';
import SalesActions from './SalesActions';
import SalesActionsArchive from './SalesActionsArchive';
import SalesActionsUpcoming from './SalesActionsUpcoming';
import TeamActions from './TeamActions';
import TeamActionsArchive from './TeamActionsArchive';
import TeamActionsUpcoming from './TeamActionsUpcoming';
import EditTeamReminder from './EditTeamReminder';
import Academy from './Academy';
import AcademyPost from './AcademyPost';
import EditPost from './EditPost';
import EditSalesReminder from './EditSalesReminder';
import TeamTags from './TeamTags';
import UsersArchive from './UsersArchive';
import TeamActionsRecurrent from './TeamActionsRecurrent';
import ActionsRepeating from './ActionsRepeating';
import UserSickLeaves from './UserSickLeaves';
import SickLeaves from './SickLeaves';
import Dashboard from './Dashboard';

const GlobalStyle = createGlobalStyle`
  ${normalize};
  @font-face {
    font-family: 'HandOfSeanDemo';
    src: local('HandOfSeanDemo'), local('HandOfSeanDemo'),
    url('/assets/fonts/hand-of-sean-demo/HandOfSeanDemo.woff2') format('woff2'),
    url('/assets/fonts/hand-of-sean-demo/HandOfSeanDemo.woff') format('woff');
  }

  @font-face {
    font-family: 'Manrope3';
    src:
    url('/assets/fonts/manrope3/Manrope3-Thin-100.woff2') format('woff2'),
    url('/assets/fonts/manrope3/Manrope3-Thin-100.woff') format('woff');
    font-weight: 100;
  }
  
  @font-face {
    font-family: 'Manrope3';
    src:
    url('/assets/fonts/manrope3/Manrope3-Light-300.woff2') format('woff2'),
    url('/assets/fonts/manrope3/Manrope3-Light-300.woff') format('woff');
    font-weight: 300;
  }

  @font-face {
    font-family: 'Manrope3';
    src:
    url('/assets/fonts/manrope3/Manrope3-Regular-400.woff2') format('woff2'),
    url('/assets/fonts/manrope3/Manrope3-Regular-400.woff') format('woff');
    font-weight: 400;
  }

  @font-face {
    font-family: 'Manrope3';
    src:
    url('/assets/fonts/manrope3/Manrope3-Medium-500.woff2') format('woff2'),
    url('/assets/fonts/manrope3/Manrope3-Medium-500.woff') format('woff');
    font-weight: 500;
  }

  @font-face {
    font-family: 'Manrope3';
    src:
    url('/assets/fonts/manrope3/Manrope3-Semibold-600.woff2') format('woff2'),
    url('/assets/fonts/manrope3/Manrope3-Semibold-600.woff') format('woff');
    font-weight: 600;
  }

  @font-face {
    font-family: 'Manrope3';
    src:
    url('/assets/fonts/manrope3/Manrope3-Bold-700.woff2') format('woff2'),
    url('/assets/fonts/manrope3/Manrope3-Bold-700.woff') format('woff');
    font-weight: 700;
  }

  @font-face {
    font-family: 'Manrope3';
    src:
    url('/assets/fonts/manrope3/Manrope3-ExtraBold-800.woff2') format('woff2'),
    url('/assets/fonts/manrope3/Manrope3-ExtraBold-800.woff') format('woff');
    font-weight: 800;
  }

  @font-face {
    font-family: 'Thonburi';
    src:
    url('/assets/fonts/thonburi/Thonburi.woff2') format('woff2'),
    url('/assets/fonts/thonburi/Thonburi.woff') format('woff');
  }
  
  @font-face {
    font-family: 'Roboto';
    src:
            url('/assets/fonts/roboto/roboto-400.woff2') format('woff2'),
            url('/assets/fonts/roboto/roboto-400.woff') format('woff');
    font-weight: 400;
  }

  @font-face {
    font-family: 'Roboto';
    src:
            url('/assets/fonts/roboto/roboto-700.woff2') format('woff2'),
            url('/assets/fonts/roboto/roboto-700.woff') format('woff');
    font-weight: 700;
  }
  
  * {
    box-sizing: border-box;
    font-family: 'Manrope3', 'Thonburi', 'Noto Sans SC';
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    line-height: normal;
  }

  html,
  body {
    height: 100%;
    background-color: #f0f1f2;
  }

  #root {
    max-width: 552px;
    margin: 0px auto;
    caret-color: #fb7e14;
    background-color: white;
    position: relative;
    height: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }

  input, textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  input {
    :disabled {
      background-color: inherit;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
  
  html {
    height: 100%;
  }
  
  #root {
    height: 100%;
  }
  
  * {
    box-sizing: border-box;
    color: #333;
  }

  body {
    overflow: overlay;
    height: 100%;
    background-color: rgb(240, 241, 242);
  }

  .scrollbar {
    scrollbar-color: #d2d3d7 #ffffff;
    scrollbar-width: thin;
  }

  .scrollbar:hover {
    scrollbar-color: #a5a7af #ffffff;
  }

  .scrollbar::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }

  .scrollbar::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #ffffff;
  }

  .scrollbar::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #d2d3d7;
  }

  .scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #a5a7af;
  }
  
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }

  @media screen and (max-width: 1024px) {
    .scrollbar::-webkit-scrollbar {
      height: 4px;
      width: 4px;
    }
  }
`;

store.dispatch<any>(detectLanguage());
store.dispatch<any>(getMe(true));

const App: React.FC = () => {
  useEffect(() => {
    function handleResize() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <GlobalContainer>

      <GlobalSearch />

      <GlobalToast />

      <GlobalStyle />

      <Switch>
        <Route path="/login/:path" component={Login} />

        <ProtectedRouter path="/me" component={Me} exact />
        <ProtectedRouter path="/users" component={Users} exact />
        <ProtectedRouterAdmin path="/users-archive" component={UsersArchive} exact />
        <ProtectedRouter path="/users/:userId" component={UserDetails} exact />
        <ProtectedRouterAdmin path="/add-user/" component={AddUser} exact />
        <ProtectedRouterAdmin path="/edit-user/:userId" component={EditUser} exact />
        <ProtectedRouter path="/edit-me/:userId" component={EditMe} exact />
        <ProtectedRouter path="/change-password" component={ChangePassword} exact />
        <ProtectedRouter path="/change-language" component={ChangeLanguage} exact />
        <ProtectedRouterAdmin path="/team-tags" component={TeamTags} exact />

        <ProtectedRouterAdmin path="/managers" component={Managers} exact />
        <ProtectedRouterAdmin path="/add-manager/" component={AddManager} exact />

        <ProtectedRouterAdmin path="/dashboard" component={Dashboard} exact />
        <ProtectedRouterAdmin path="/inventory" component={Inventory} exact />
        <ProtectedRouterAdmin path="/change-item-user/:itemId" component={ChangeItemUser} exact />
        <ProtectedRouterAdmin path="/view-item-history/:itemId" component={ViewItemHistory} exact />
        <ProtectedRouterAdmin path="/add-item-user/:userId" component={AddItemUser} exact />

        <ProtectedRouter path="/users/vacations/:userId" component={UserVacations} exact />
        <ProtectedRouter path="/add-overtime/:userId" component={AddOvertime} exact />
        <ProtectedRouter path="/request-vacation/:userId" component={RequestVacation} exact />
        <ProtectedRouter path="/users/sick-leaves/:userId" component={UserSickLeaves} exact />
        <ProtectedRouter path="/sick-leaves" component={SickLeaves} exact />

        <ProtectedRouterAdmin path="/customers" component={Customers} exact />
        <ProtectedRouterAdmin path="/customers/:customerId" component={CustomerDetails} exact />
        <ProtectedRouterAdmin path="/add-customer/" component={AddCustomer} exact />
        <ProtectedRouterAdmin path="/edit-customer/:customerId" component={EditCustomer} exact />

        <ProtectedRouter path="/projects" component={Projects} exact />
        <ProtectedRouter path="/projects-archive" component={ProjectsArchive} exact />
        <ProtectedRouter path="/projects/:projectId" component={ProjectDetails} exact />
        <ProtectedRouterAdmin path="/edit-project/:projectId" component={EditProject} exact />
        <ProtectedRouterAdmin path="/add-project/" component={AddProject} exact />

        <ProtectedRouter path="/vacations/:vacationId" component={Vacations} exact />
        <ProtectedRouter path="/vacations" component={CurrentVacations} exact />

        <ProtectedRouterAdmin path="/actions/:vacationId" component={Actions} exact />
        <ProtectedRouterAdmin path="/actions-archive" component={ActionsArchive} exact />
        <ProtectedRouterAdmin path="/actions-upcoming" component={ActionsUpcoming} exact />
        <ProtectedRouterAdmin path="/actions-recurrent" component={ActionsRepeating} exact />
        <ProtectedRouterAdmin path="/sales-actions" component={SalesActions} exact />
        <ProtectedRouterAdmin path="/sales-actions/archive" component={SalesActionsArchive} exact />
        <ProtectedRouterAdmin path="/sales-actions/upcoming" component={SalesActionsUpcoming} exact />
        <ProtectedRouter path="/team-actions" component={TeamActions} exact />
        <ProtectedRouter path="/team-actions/archive" component={TeamActionsArchive} exact />
        <ProtectedRouter path="/team-actions/upcoming" component={TeamActionsUpcoming} exact />
        <ProtectedRouter path="/team-actions/recurrent" component={TeamActionsRecurrent} exact />
        <ProtectedRouterAdmin path="/edit-action/:reminderId" component={EditReminder} exact />
        <ProtectedRouter path="/edit-action/team/:reminderId" component={EditTeamReminder} exact />
        <ProtectedRouterAdmin path="/edit-action/sales/:reminderId" component={EditSalesReminder} exact />

        <ProtectedRouter path="/academy" component={Academy} exact />
        <ProtectedRouter path="/academy/:postId" component={AcademyPost} exact />
        <ProtectedRouter path="/edit-post/:postId" component={EditPost} exact />

        <Redirect to="/me" />
      </Switch>
    </GlobalContainer>
  );
};

export default App;
