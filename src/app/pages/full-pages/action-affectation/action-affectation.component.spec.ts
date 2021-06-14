import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionAffectationComponent } from './action-affectation.component';

describe('ActionAffectationComponent', () => {
  let component: ActionAffectationComponent;
  let fixture: ComponentFixture<ActionAffectationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionAffectationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
