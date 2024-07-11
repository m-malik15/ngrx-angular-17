/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostShellComponent } from './post-shell.component';

describe('PostShellComponent', () => {
  let component: PostShellComponent;
  let fixture: ComponentFixture<PostShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
