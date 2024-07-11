import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { State } from '../post.reducer';
import { Store } from '@ngrx/store';
import { Post } from '../IPost';
import { Observable } from 'rxjs';

import { getPosts } from '../post.selector';
import { CommonModule } from '@angular/common';

import * as PostActions from '../post.action';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  pageTitle = 'Posts';

  posts$!: Observable<Post[]>;

  constructor(private store: Store<State>, private postService: PostService) {

  }

  ngOnInit() {
   this.store.dispatch(PostActions.loadPost());
     this.posts$ = this.store.select(getPosts);
  }

}
