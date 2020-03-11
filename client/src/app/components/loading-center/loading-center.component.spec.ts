import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingCenterComponent } from './loading-center.component';

describe('LoadingCenterComponent', () => {
  let component: LoadingCenterComponent;
  let fixture: ComponentFixture<LoadingCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
