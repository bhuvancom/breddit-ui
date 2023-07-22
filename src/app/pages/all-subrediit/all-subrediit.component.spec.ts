import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSubrediitComponent } from './all-subrediit.component';

describe('AllSubrediitComponent', () => {
  let component: AllSubrediitComponent;
  let fixture: ComponentFixture<AllSubrediitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSubrediitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSubrediitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
