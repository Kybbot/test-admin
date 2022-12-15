import { User, UserExtended } from '@/store/reducers/user';
import {
  Project, ProjectLight, Projects, SlackChannels, TeammateStatus,
} from '@/store/reducers/projects';
import { Customer } from '@/store/reducers/customers';
import {
  Holiday,
  Overtime,
  Vacation,
  VacationInfo,
  VacationsCalendar,
} from '@/store/reducers/vacations';
import {
  Action,
  ActionType,
  DeveloperReminderAction,
  RepeatValue,
  SalesReminderAction,
} from '@/store/reducers/actions';
import { InventoryItem, Computer, Parameters } from '@/store/reducers/inventory';
import { LANGUAGES } from '@/store/reducers/language';
import { SearchItem } from '@/store/reducers/search';
import { Post } from '@/store/reducers/academy';
import { SickLeave } from '@/store/reducers/sick-leaves';
import HttpClientProtected from './http-client-protected';

export interface AddUserBody {
  name: string;
  email: string;
  password: string;
  telegramId?: number;
  birthday: string;
  role: string,
  english?: string | null,
  hireDate: string,
}

export interface ChangePasswordBody {
  oldPassword: string;
  newPassword: string;
}

export interface AddCustomerBody {
  name: string;
  email: string[] | undefined;
  photo?: string | null;
  smallPhoto?: string | null;
  birthday: string | undefined;
}

export interface EditUserBody {
  name?: string,
  photo?: string | null,
  smallPhoto?: string | null,
  email?: string,
  telegramId?: number,
  isOverloaded?: boolean;
  birthday?: string;
  role?: string | null;
  english?: string | null;
  workload?: number;
  tags?: string[];
  hireDate?: string;
  language?: LANGUAGES;
  deleted?: boolean;
  hasPersonalInventory?: boolean;
}

export interface AddProjectBody {
  customerId?: number;
  name: string;
  deadline?: string | null;
  startDate?: string | null;
  description?: string;
}

export interface EditProjectBody {
  name?: string;
  deadline?: string | null;
  startDate?: string | null;
  priority?: string;
  isSmoothly?: boolean;
  isActive?: boolean;
  slackChannelId?: string;
  slackChannelName?: string
}

export interface AddOvertimeBody {
  userId: number,
  date: string,
  comment: string
}

export interface RequestVacationBody {
  startDate: string,
  endDate: string,
  comment: string,
}

export interface CreateReminderBody {
  notificationDate: string,
  usersId: number[],
  customersId: number[],
  projectsId: number[],
  message: string,
  assignId: number[],
  repeat: RepeatValue,
  type: ActionType,
}

export interface EditReminderBody {
  notificationDate?: string,
  usersId?: number[],
  customersId?: number[],
  projectsId?: number[],
  message?: string,
  isStopped?: boolean,
  assignId?: number[],
  isRead?: boolean,
  repeat?: RepeatValue,
}

export interface EditTeammateBody {
  projectId: number,
  userId: number,
  status: TeammateStatus,
  tag: string,
  hours: string,
}

export interface CreateInventoryItemBody {
  model: string,
  imei: string,
  ram: string,
  memory: string,
  diagonal: string,
  cpu: string,
  year: string,
}

export interface CreatePersonalItemBody {
  userId: string;
}

export interface EditInventoryItemBody {
  owner?: number | null,
  hasPersonalInventory?: boolean,
}

export interface CreateCommentBody {
  postId: number;
  text: string;
}

export interface PostClapBody {
  postId: number;
}

export default class MainProtected extends HttpClientProtected {
  private static instanceCached: MainProtected;

  private constructor() {
    super(process.env.BASE_URL);
  }

  static getInstance = () => {
    if (!MainProtected.instanceCached) {
      MainProtected.instanceCached = new MainProtected();
    }

    return MainProtected.instanceCached;
  };

  public getMe() {
    return this.instance.get<User>('/users/profile');
  }

  public getUsers() {
    return this.instance.get<User[]>('/users');
  }

  public getUserGrade() {
    return this.instance.get<string[]>('/users/grade');
  }

  public getExtendedUsers() {
    return this.instance.get<UserExtended[]>('/users/extended');
  }

  public getManagers() {
    return this.instance.get<User[]>('/users/role/sales');
  }

  public getUser(id: number) {
    return this.instance.get<User>(`/users/${id}`);
  }

  public addUser(body: AddUserBody) {
    return this.instance.post('/users', body);
  }

  public editUser(body: EditUserBody, id: number) {
    return this.instance.patch(`/users/${id}`, body);
  }

  public editUserPhoto(formData: FormData, id: number) {
    return this.instance.post(`/users/photo/${id}`, formData);
  }

  public editCustomerPhoto(formData: FormData, id: number) {
    return this.instance.post(`/customers/photo/${id}`, formData);
  }

  public editMe(body: EditUserBody) {
    return this.instance.patch('/users/profile', body);
  }

  public editMeImage(formData: FormData) {
    return this.instance.post('/users/photo', formData);
  }

  public addCustomer(body: AddCustomerBody) {
    return this.instance.post('/customers', body);
  }

  public editCustomer(body: AddCustomerBody, id: number) {
    return this.instance.patch(`/customers/${id}`, body);
  }

  public getProjects() {
    return this.instance.get<Projects>('/projects');
  }

  public getProjectsLight() {
    return this.instance.get<ProjectLight[]>('/projects');
  }

  public getProjectsArchive() {
    return this.instance.get<ProjectLight[]>('/projects/archive');
  }

  public getProject(id: number) {
    return this.instance.get<Project>(`/projects/${id}`);
  }

  public addProject(body: AddProjectBody) {
    return this.instance.post('/projects/', body);
  }

  public editProject(body: EditProjectBody, id: number) {
    return this.instance.patch(`/projects/${id}`, body);
  }

  public disconnectSlack(id: number) {
    return this.instance.patch(`/projects/unlink-slack/${id}`);
  }

  public getCustomers() {
    return this.instance.get<Customer[]>('/customers');
  }

  public getCustomer(id: number) {
    return this.instance.get<Customer>(`/customers/${id}`);
  }

  public getAllVacations() {
    return this.instance.get<Vacation[]>('/vacations/');
  }

  public getVacationsCalendar() {
    return this.instance.get<VacationsCalendar>('/vacations/calendar');
  }

  public getPendingVacations() {
    return this.instance.get<Vacation[]>('/vacations/status/pending');
  }

  public getRecentVacations() {
    return this.instance.get<Vacation[]>('/vacations/recent');
  }

  public getCurrentVacations() {
    return this.instance.get<Vacation[]>('/vacations/current');
  }

  public getFutureVacations() {
    return this.instance.get<Vacation[]>('/vacations/future');
  }

  public getApprovedVacations() {
    return this.instance.get<Vacation[]>('/vacations/status/approved');
  }

  public getUserVacations(id: number) {
    return this.instance.get<Vacation[]>(`/vacations/${id}`);
  }

  public approveVacation(id: number) {
    return this.instance.patch(`/vacations/${id}/approve`);
  }

  public rejectVacation(id: number) {
    return this.instance.patch(`/vacations/${id}/reject`);
  }

  public getUsersRoles() {
    return this.instance.get<string[]>('/users/roles');
  }

  public getUserOvertimes(id: number) {
    return this.instance.get<Overtime[]>(`/overtimes/${id}`);
  }

  public addOvertime(body: AddOvertimeBody) {
    return this.instance.post('/overtimes', body);
  }

  public addTeammate(projectId: number, userId: number) {
    return this.instance.patch(`/projects/${projectId}/add-teammate/${userId}`);
  }

  public deleteTeammate(projectId: number, userId: number) {
    return this.instance.patch(`/projects/${projectId}/delete-teammate/${userId}`);
  }

  public addCustomerOnProject(projectId: number, customerId: number) {
    return this.instance.patch(`/projects/${projectId}/add-customer/${customerId}`);
  }

  public deleteCustomerFromProject(projectId: number, customerId: number) {
    return this.instance.patch(`/projects/${projectId}/delete-customer/${customerId}`);
  }

  public getUserProjects(id: number) {
    return this.instance.get<Project[]>(`/projects/user/${id}`);
  }

  public getCustomerProjects(id: number) {
    return this.instance.get<Projects>(`/projects/customer/${id}`);
  }

  public getUserVacationInfo(id: number) {
    return this.instance.get<VacationInfo>(`/vacations/info/${id}`);
  }

  public requestVacation(body: RequestVacationBody) {
    return this.instance.post('/vacations', body);
  }

  public deleteVacation(id: number) {
    return this.instance.delete(`/vacations/${id}`);
  }

  public getHolidays() {
    return this.instance.get<Holiday[]>('/vacations/holidays');
  }

  public changePassword(body: ChangePasswordBody) {
    return this.instance.post('/login/change-password', body);
  }

  public getEnglishLevels() {
    return this.instance.get<string[]>('/users/english-levels');
  }

  public createReminder(body: CreateReminderBody) {
    return this.instance.post('/actions/admin', body);
  }

  public createSalesReminder(body: CreateReminderBody) {
    return this.instance.post('/actions/sales', body);
  }

  public createTeamReminder(body: CreateReminderBody) {
    return this.instance.post('/actions/team', body);
  }

  public getActions() {
    return this.instance.get<Action[]>('/actions');
  }

  public getArchivedActions(limit: number, offset: number) {
    return this.instance.get<Action[]>(`/actions/by-type/archive?limit=${limit}&offset=${offset}`);
  }

  public getActionsByType(type: string) {
    return this.instance.get<Action[]>(`/actions/by-type/${type}`);
  }

  public getAction(id: number) {
    return this.instance.get<Action>(`/actions/by-id/${id}`);
  }

  public editReminder(body: EditReminderBody, id: number, type: ActionType) {
    return this.instance.patch(`/actions/${id}/${type}`, body);
  }

  public getTags() {
    return this.instance.get<string[]>('/users/tags');
  }

  public getProjectsTags() {
    return this.instance.get<string[]>('/projects/tags');
  }

  public getProjectsHours() {
    return this.instance.get<string[]>('/projects/hours');
  }

  public editTeammate(body: EditTeammateBody, bondId: string) {
    return this.instance.patch(`/teammate/${bondId}`, body);
  }

  public getInventoryItems() {
    return this.instance.get<InventoryItem[]>('/inventory');
  }

  public getUsersInventory(id: number) {
    return this.instance.get<Computer[]>(`/inventory/user/${id}`);
  }

  public getItemHistory(id: number) {
    return this.instance.get<Computer>(`/inventory/${id}`);
  }

  public getInventoryParams() {
    return this.instance.get<Parameters>('/inventory/params');
  }

  public createInventoryItem(body: CreateInventoryItemBody) {
    return this.instance.post('/inventory', body);
  }

  public createPersonalItem(body: CreatePersonalItemBody) {
    return this.instance.post('/inventory/personal', body);
  }

  public deletePersonalItem(id: number) {
    return this.instance.delete(`/inventory/${id}`);
  }

  public editInventoryItem(body: EditInventoryItemBody, id: number) {
    return this.instance.patch(`/inventory/${id}`, body);
  }

  public panic() {
    return this.instance.get('/actions/panic');
  }

  public money() {
    return this.instance.get('/actions/money');
  }

  public needHelp() {
    return this.instance.get('/actions/help');
  }

  public search(body: { filter: string }) {
    return this.instance.post<SearchItem[]>('/search', body);
  }

  public searchTeam(body: { filter: string }) {
    return this.instance.post<SearchItem[]>('/search/team', body);
  }

  public getTeamArchivedActions(limit: number, offset: number) {
    return this.instance.get<DeveloperReminderAction[]>(`/actions/team/archive?limit=${limit}&offset=${offset}`);
  }

  public getTeamActions(type: string) {
    return this.instance.get<DeveloperReminderAction[]>(`/actions/team/${type}`);
  }

  public getSalesArchivedActions(limit: number, offset: number) {
    return this.instance.get<SalesReminderAction[]>(`/actions/sales/archive?limit=${limit}&offset=${offset}`);
  }

  public getSalesActions(type: string) {
    return this.instance.get<SalesReminderAction[]>(`/actions/sales/${type}`);
  }

  public createComment(body: CreateCommentBody) {
    return this.instance.post('/posts/comment', body);
  }

  public getPosts() {
    return this.instance.get<Post[]>('/posts');
  }

  public getAcademyTags() {
    return this.instance.get<string[]>('/posts/tags');
  }

  public getPost(id: number) {
    return this.instance.get<Post>(`/posts/${id}`);
  }

  public deleteFile(id: number, path: string) {
    return this.instance.delete(`/posts/${id}/${path}`);
  }

  public deletePost(id: number) {
    return this.instance.delete(`/posts/${id}`);
  }

  public editComment(id: number, body: CreateCommentBody) {
    return this.instance.patch(`/posts/comment/${id}`, body);
  }

  public deleteComment(id: number) {
    return this.instance.delete(`/posts/comment/${id}`);
  }

  public deleteUser(id: number) {
    return this.instance.delete(`/users/${id}`);
  }

  public connectSlack(projectId: number) {
    return this.instance.get(`/slack/connect-channel/${projectId}`);
  }

  public getDeletedUsers() {
    return this.instance.get<User[]>('/users/deleted');
  }

  public toArchiveProject(id: number) {
    return this.instance.get(`/projects/to-archive/${id}`);
  }

  public restoreProject(id: number) {
    return this.instance.get(`/projects/restore/${id}`);
  }

  public getAllSickLeaves = () => this.instance.get<SickLeave[]>('/sick-leave/all');

  public getUserSickLeaves = (id: number) => this.instance.get<SickLeave[]>(`/sick-leave/user/${id}`);

  public getPersonalSickLeaves = () => this.instance.get<SickLeave[]>('/sick-leave');

  public takeSickLeave = (body: { comment: string }) => this.instance.post('/sick-leave', body);

  public viewSickLeave = (id: number) => this.instance.patch(`/sick-leave/${id}`);

  public getSlackChannels = () => this.instance.get<SlackChannels[]>('/slack/channels');
}
