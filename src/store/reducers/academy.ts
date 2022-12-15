import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import { User } from '@/store/reducers/user';

export interface Post {
  id: number;
  title: string;
  status: PostStatus;
  tags: string[];
  description: string;
  links: string[];
  claps: number;
  date: number;
  author: number;
  filePaths: string[];
  difficulty: PostDifficulty;
  isDeleted: boolean;
}

export interface Comment {
  _id: string;
  date: number;
  author: User;
  text: string;
  isEdited: boolean;
}

export interface AcademyState {
  posts: Post[] | null;
  post: Post | null;
  isSaveLoading: boolean;
  filters: string[];
  tags: string[] | null;
}

export enum PostDifficulty {
  EASY = 'easy',
  NORMAL = 'normal',
  HARD = 'hard'
}

export enum PostStatus {
  NEW = 'new',
  READ = 'read',
  NOT_INTERESTED= 'not-interested'
}

const initialState: AcademyState = {
  posts: null,
  post: null,
  filters: [],
  tags: null,
  isSaveLoading: false,
};

export class AcademyReducer extends ImmerReducer<AcademyState> {
  setPosts(posts: Post[]) {
    this.draftState.posts = posts;
  }

  setPost(post: Post) {
    this.draftState.post = post;
  }

  setFilters(filters: string[]) {
    this.draftState.filters = filters;
  }

  setTags(tags: string[]) {
    this.draftState.tags = tags;
  }

  setIsSaveLoading(isSaveLoading: boolean) {
    this.draftState.isSaveLoading = isSaveLoading;
  }

  cleanPost() {
    this.draftState.post = null;
  }

  cleanAcademy() {
    this.draftState.posts = null;
    this.draftState.post = null;
  }
}

export default createReducerFunction(AcademyReducer, initialState);
