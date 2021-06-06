import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignRealizationComponent } from './campaign-realization.component';

describe('CampaignRealizationComponent', () => {
  let component: CampaignRealizationComponent;
  let fixture: ComponentFixture<CampaignRealizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignRealizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignRealizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
