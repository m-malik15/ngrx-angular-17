import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PostAction from './Post/post.action';

import {
  catchError,
  map,
  mergeMap,
  of, tap
} from 'rxjs';
import { PostService } from './Post/post.service';
import { MsalService } from '@azure/msal-angular';


@Injectable()
export class PostEffects {
  constructor(
    private actions$: Actions,
    private postService: PostService,
    private authService: MsalService
  ) { }

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostAction.loadPost),
      mergeMap(() => {
        return this.postService.getPosts().pipe(
          map((data) => PostAction.loadPostSuccess({ posts: data })),
          catchError((error: string) => {
            console.log('error', error);
            return of(PostAction.loadPostFailure({ error }))
          }
          )
        );
      })
    )
  );

}
