import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { productReducer, ProductState } from '../product/product.reducer';
import { postReducer, PostState } from '../Post/post.reducer';



export interface State {
  product: ProductState;
  post: PostState;
}

export const reducers: ActionReducerMap<State> = {
  product: productReducer,
  post: postReducer,

};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
