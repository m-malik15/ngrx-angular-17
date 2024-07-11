import { Component, OnInit } from '@angular/core';
import { PostListComponent } from '../post-list/post-list.component';
import { PostEditComponent } from '../post-edit/post-edit.component';

@Component({
  selector: 'app-post-shell',
  standalone: true,
  imports: [PostListComponent, PostEditComponent],
  templateUrl: './post-shell.component.html',
  styleUrls: ['./post-shell.component.css']
})
export class PostShellComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
