import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './post.reducer';
import { Post } from './IPost';

const getPostFeatureState = createFeatureSelector<PostState>('post');

//Get Posts array
export const getPosts = createSelector(
  getPostFeatureState,
  (state: PostState): Post[] => {
    return state.posts;
  }
);
