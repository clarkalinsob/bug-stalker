import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgAppCardComponent } from './eg-app-card.component';

describe('EgAppCardComponent', () => {
  let component: EgAppCardComponent;
  let fixture: ComponentFixture<EgAppCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgAppCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgAppCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
