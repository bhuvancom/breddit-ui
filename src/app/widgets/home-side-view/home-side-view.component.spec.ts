import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSideViewComponent } from './home-side-view.component';

describe('HomeSideViewComponent', () => {
  let component: HomeSideViewComponent;
  let fixture: ComponentFixture<HomeSideViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSideViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSideViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
