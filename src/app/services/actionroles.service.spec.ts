import { TestBed } from '@angular/core/testing';

import { ActionrolesService } from './actionroles.service';

describe('ActionrolesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionrolesService = TestBed.get(ActionrolesService);
    expect(service).toBeTruthy();
  });
});
