import { createAction, props } from '@ngrx/store';
import { Post } from './IPost';


//Asynchronously loading a Post from the Server.
export const loadPost = createAction('[Post] load Post');

export const loadPostSuccess = createAction(
  '[Post] load Post Success',
  props<{ posts: Post[] }>()
);

export const loadPostFailure = createAction(
  '[Post] load Post Failure',
  props<{ error: string }>()
);
