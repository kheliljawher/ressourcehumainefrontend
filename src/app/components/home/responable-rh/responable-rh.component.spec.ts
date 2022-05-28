import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponableRHComponent } from './responable-rh.component';

describe('ResponableRHComponent', () => {
  let component: ResponableRHComponent;
  let fixture: ComponentFixture<ResponableRHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponableRHComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponableRHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
