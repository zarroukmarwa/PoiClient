import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionAffectationEditComponent } from './action-affectation-edit.component';

describe('ActionAffectationEditComponent', () => {
  let component: ActionAffectationEditComponent;
  let fixture: ComponentFixture<ActionAffectationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionAffectationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionAffectationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
