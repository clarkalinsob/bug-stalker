import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugModalComponent } from './bug-modal.component';

describe('BugModalComponent', () => {
  let component: BugModalComponent;
  let fixture: ComponentFixture<BugModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
