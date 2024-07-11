import { createReducer, on } from '@ngrx/store';
import * as PostReducer from './post.action';
import { Post } from './IPost';
import * as AppState from '../state/app.state';

export interface State extends AppState.State {
  post: PostState;
}

export interface PostState {
  posts: Post[];
  error: string;
}

const initialState: PostState = {
  posts: [],
  error: '',
};

export const postReducer = createReducer<PostState>(
  initialState as PostState,

  on(
    PostReducer.loadPostSuccess,
    (state: PostState, action): PostState => {
      return {
        ...state,
        posts: action.posts,
        error: '',
      };
    }
  ),

  on(
    PostReducer.loadPostFailure,
    (state: PostState, action): PostState => {
      return {
        ...state,
        error: action.error,
        posts: [],
      };
    }
  )



);
