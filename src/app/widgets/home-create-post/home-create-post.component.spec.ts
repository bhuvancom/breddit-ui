import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCreatePostComponent } from './home-create-post.component';

describe('HomeCreatePostComponent', () => {
  let component: HomeCreatePostComponent;
  let fixture: ComponentFixture<HomeCreatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCreatePostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
